import { DbModel } from "../common/models/db/db.alias";
import { getDal } from "../common/logic/dal/dal";
import { MaybeAuthData, authorize, notFound } from "../common/api/authorize";
import { toRecord } from "../common/utils/records";

export function getTrusteeApi(data: MaybeAuthData) {
    authorize(data, 'trustee');
    const dal = getDal();

    async function _setMatches(matches: DbModel.Match[]) {
        await dal.metadata.set({ matches });
    }

    async function _calculateForMatches() {
        const idOf = (matchId: string, groupId: string) => `${groupId}__${matchId}`;
        let md = await dal.metadata.get();
        if (!md) throw notFound('Metadata not found');

        const metadata = {
          ...DbModel.defaultMetadata,
          ...md
        }
    
        // find all matches that have already started
        // that do not have statistics yet
        const matches = metadata.matches
          .filter((m) => new Date(m.date) < new Date())
          .filter((m) => !metadata.statistics[m.id]);
    
        // if there are no matches to calculate, return
        if (matches.length === 0) return;

        console.log('Publishing scores for', matches.map(m => m.id));
    
        const [users, groups] = await Promise.all([
          dal.users.getAll(),
          dal.groups.getAll(),
        ]);
    
        const stagesMap = toRecord(metadata.stages, (s) => s.id);
    
        const calcGroupMatchScores: DbModel.CalculatedGroupMatchScore[] =
          groups.flatMap((group) =>
            matches.map((match) => ({
              id: idOf(match.id, group.id),
              matchId: match.id,
              groupId: group.id,
              points: stagesMap[match.stage].points,
              stage: match.stage,
              away: match.away!,
              home: match.home!,
              date: match.date,
              userScores: [],
            }))
          );
    
        const resRecords = toRecord(calcGroupMatchScores, (c) => c.id);
        const statistics: DbModel.MatchStatistics[] = matches.map((m) => ({
          away: 0,
          home: 0,
          tie: 0,
        }));
    
        for (const user of users) {
          for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
            const match = matches[matchIndex];
            const guess = user.guesses[match.id] ?? null;
    
            if (guess !== null) statistics[matchIndex][guess]++;
    
            for (const group of user.groups) {
              const id = idOf(match.id, group);
              const record = resRecords[id];
              record.userScores.push({
                id: user.id,
                guess,
              });
            }
          }
        }
    
        const mappedStatistics = Object.fromEntries(
          statistics.map((s, i) => [matches[i].id, s])
        );
        const newStatistics = {
          ...metadata.statistics,
          ...mappedStatistics,
        };
    
        await dal.metadata.set({ statistics: newStatistics });
        const batch = dal.batch();
        batch.setMany('calculated-group-match-scores', Object.values(resRecords));
        await batch.commit();
    }

    async function _resetAllMatchCalculations() {
      // empty the metadata statistics, and delete the calculated-group-matches collection
      await dal.metadata.set({ statistics: {} });
      await dal.calculatedGroupMatchScores.deleteAll();

      await _calculateForMatches();
    }
    


    return {
        setMatches: _setMatches, 
        calculateForMatches: _calculateForMatches, 
        resetAllMatchCalculations: _resetAllMatchCalculations
    }


}