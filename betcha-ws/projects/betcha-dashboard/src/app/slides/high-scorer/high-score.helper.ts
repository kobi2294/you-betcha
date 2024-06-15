import { GameVm, buildTable } from "@lib";
import { DbModel, toRecord } from "@tscommon";

export function calcHighScorers(calcedGroup: DbModel.CalculatedGroup, game: GameVm): HighScoreRecord[] {
    const date24HoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    const matchesToday = game.pastMatches.filter((m) => m.dateValue > date24HoursAgo);

    // collect the users and sum up their points in the matches today
    const userScores: Record<string, number> = {};
    for (const match of matchesToday) {
        for (const score of match.userScores) {
            userScores[score.id] = (userScores[score.id] || 0) + score.points;
        }
    }

    const usersMap = toRecord(calcedGroup.users, (u) => u.id);

    // sort the users by score and take only the top 3
    // and create HighScoreRecord objects
    const sortedUserScores = Object
        .entries(userScores).sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([userId, score]) => {
            const user = usersMap[userId];
            return {
                userId,
                displayName: user?.displayName || '',
                photoUrl: user?.photoUrl || '',
                scoreDelta: score
            };
        });

    return sortedUserScores;
}

export type HighScoreRecord = {
    readonly userId: string;
    readonly displayName: string;
    readonly photoUrl: string;
    readonly scoreDelta: number;
}