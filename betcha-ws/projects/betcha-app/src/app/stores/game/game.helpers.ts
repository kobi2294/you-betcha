import { DbModel, groupBy, toRecord } from '@tscommon';
import { FutureMatchVm, GameVm, GroupMatchesVm, GroupTableVm, InProgressMatchVm, PastMatchVm, ScheduledMatch, PastMatch, UserGuess, UserScore, UserTableRowVm, FilledMatch } from './game.vm';


export function buildVm(
  allMatches: DbModel.Match[],
  globalStatistics: Record<string, DbModel.MatchStatistics>,
  stages: DbModel.Stage[],
  calcedGroup: DbModel.CalculatedGroup | null,
  calcedScores: DbModel.CalculatedGroupMatchScore[]
): GameVm {
  const split = splitMatches(allMatches, globalStatistics, stages);

  const grpMatchVm = groupMatchesVm(
    split,
    globalStatistics,
    calcedGroup,
    calcedScores
  );

    const table = buildTable(calcedGroup, grpMatchVm.pastMatches);

    return {
        ...grpMatchVm,
        table
    }
}


//#region Match Splitting


type MatchSplit = {
    pastMatches: PastMatch[];
    recentMatches: PastMatch[];
    inProgressMatches: FilledMatch[];
    futureMatches: FilledMatch[];
    nextMacthes: FilledMatch[];
  };
  
  export function splitMatches(
    allMatches: DbModel.Match[],
    statistics: Record<string, DbModel.MatchStatistics>,
    stages: DbModel.Stage[]
  ): MatchSplit {
    const stageMap = toRecord(stages, (stage) => stage.id);
    const matches = allMatches.filter(isMatchScheduled).map(fill);
  
    // match is past if it has a score
    const pastMatches = matches.filter(isPastMatch);
  
    const latestPastDate = Math.max(...pastMatches.map((m) => m.dateValue));
    const recentMatches = pastMatches.filter(
      (m) => m.dateValue === latestPastDate
    );
  
    // match is future if it doesn't have a statistics
    const futureMatches = matches
      .filter((match) => !isPastMatch(match))
      .filter((match) => !statistics[match.id]);
  
    const earliestFutureDate = Math.min(...futureMatches.map((m) => m.dateValue));
    const nextMacthes = futureMatches.filter(
      (m) => m.dateValue === earliestFutureDate
    );
  
    // in progress matches are those that have statistics but no score
    const inProgressMatches = matches
      .filter((match) => !isPastMatch(match))
      .filter((match) => statistics[match.id]);
  
    return {
      pastMatches,
      recentMatches,
      inProgressMatches,
      futureMatches,
      nextMacthes,
    };
  
    function fill(m: ScheduledMatch): FilledMatch {
      const stage = stageMap[m.stage];
      return {
        ...m,
        stageName: stage.displayName,
        points: stage.points,
        dateValue: Date.parse(m.date),
      };
    }
  }
  

function isMatchScheduled(match: DbModel.Match): match is ScheduledMatch {
  return (
    match.home !== null &&
    match.away !== null &&
    match.date.trim().length > 0 &&
    match.stage.trim().length > 0
  );
}

function isPastMatch(match: FilledMatch): match is PastMatch {
  return match.homeScore !== null && match.awayScore !== null;
}
//#endregion

//#region Match Enriching
  
  function groupMatchesVm(
    split: MatchSplit,
    globalStatistics: Record<string, DbModel.MatchStatistics>,
    calcedGroup: DbModel.CalculatedGroup | null,
    calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[]
  ): GroupMatchesVm {
    const users = toRecord(calcedGroup?.users || [], (user) => user.id);
    const calcedMatches = toRecord(calculatedGroupMatchScores, (m) => m.matchId);
  
    return {
      pastMatches: split.pastMatches.map((match) =>
        pastMatchVm(match, globalStatistics, users, calcedMatches[match.id])
      ),
      recentMatches: split.recentMatches.map((match) =>
        pastMatchVm(match, globalStatistics, users, calcedMatches[match.id])
      ),
      inProgressMatches: split.inProgressMatches.map((match) =>
        inProgressMatchVm(match, users, calcedMatches[match.id] || null, globalStatistics)
      ),
      futureMatches: split.futureMatches.map(futureMatchVm),
      nextMacthes: split.nextMacthes.map(futureMatchVm),
    };
  }
  
export function futureMatchVm(match: FilledMatch): FutureMatchVm {
  return match;
}

function userGuess(
  users: Record<string, DbModel.GroupUserRecord>,
  model: DbModel.CalculatedUserScore
): UserGuess {
  const user = users[model.id];
  return {
    id: model.id,
    displayName: user.displayName,
    photoUrl: user.photoUrl,
    guess: model.guess ?? '---',
  };
}

function inProgressMatchVm(
  match: FilledMatch,
  users: Record<string, DbModel.GroupUserRecord>,
  groupScores: DbModel.CalculatedGroupMatchScore | null,
  stats: Record<string, DbModel.MatchStatistics>
): InProgressMatchVm {
  const userScores = groupScores?.userScores ?? [];

  const userGuesses = userScores.map((model) =>
    userGuess(users, model)
  );

  const groupStatistics: DbModel.MatchStatistics = {
    home: 0,
    away: 0,
    tie: 0,
  };

  userScores.forEach((model) => {
    if (model.guess) {
      groupStatistics[model.guess]++;
    }
  });

  return {
    ...match,
    globalStatistics: stats[match.id],
    groupStatistics,
    userGuesses,
  };
}

function userScore(
  users: Record<string, DbModel.GroupUserRecord>,
  model: DbModel.CalculatedUserScore,
  correctGuess: DbModel.GuessValue,
  pointsPerCorrect: number, 
  correctCount: number
): UserScore {
  const uGuess = userGuess(users, model);
  const isCorrect = model.guess === correctGuess;
  const points = isCorrect ? pointsPerCorrect : 0;
  const isSolo = correctCount === 1 && isCorrect;

  return {
    ...uGuess,
    points,
    isCorrect,
    isSolo
  };
}

function pastMatchVm(
  match: PastMatch,
  globalStatistics: Record<string, DbModel.MatchStatistics>,
  users: Record<string, DbModel.GroupUserRecord>,
  calculatedGroupMatchScore: DbModel.CalculatedGroupMatchScore | null
): PastMatchVm {
  const inprg = inProgressMatchVm(
    match,
    users,
    calculatedGroupMatchScore,
    globalStatistics
  );
  const currectGuess = calcCorrectGuess(match);
  const correctCount = inprg.groupStatistics[currectGuess];
  const pointsEach = correctCount > 0 ? match.points / correctCount : 0;
  const userScores = (calculatedGroupMatchScore?.userScores ?? []).map((model) =>
    userScore(users, model, currectGuess, pointsEach, correctCount)
  );

  return {
    ...match,
    globalStatistics: globalStatistics[match.id],
    groupStatistics: inprg.groupStatistics,
    correctCount,
    pointsEach,
    correctGuess: currectGuess,
    userScores,
  };
}

function calcCorrectGuess(match: PastMatch): DbModel.GuessValue {
  if (match.homeScore === match.awayScore) {
    return 'tie';
  }
  return match.homeScore > match.awayScore ? 'home' : 'away';
}

//#endregion

//#region table building

export function buildTable(group: DbModel.CalculatedGroup | null, pastMatches: PastMatchVm[]): GroupTableVm {
  if (!group) { return [];}
    const scores = pastMatches.flatMap(m => m.userScores);    
    const userScores = groupBy(scores, s => s.id);

    const rows = group.users.map(user => buildRow(user, userScores[user.id] ?? []));
    return rows;

    function buildRow(user: DbModel.GroupUserRecord, userScores: UserScore[]): UserTableRowVm {
        let totalPoints = 0;
        let correctCount = 0;
        let soloCount = 0;

        for (const score of userScores) {
            totalPoints += score.points;
            if (score.isCorrect) {
                correctCount++;
            }
            if (score.isSolo) {
                soloCount++;
            }    
        }

        return {
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            totalPoints,
            correctCount,
            soloCount
        };
        }

    }

//#endregion

