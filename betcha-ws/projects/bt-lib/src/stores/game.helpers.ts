import { DbModel, groupBy, toRecord } from '@tscommon';

//#region Match Splitting


type MatchSplit = {
    pastMatches: ScoredMatch[];
    recentMatches: ScoredMatch[];
    inProgressMatches: ScheduledMatch[];
    futureMatches: ScheduledMatch[];
    nextMacthes: ScheduledMatch[];
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
  
type ScheduledMatch = DbModel.Match & {
  home: string;
  away: string;
  date: string;
  stage: string;
};

type FilledMatch = ScheduledMatch & {
  dateValue: number;
  points: number;
  stageName: string;
};

type ScoredMatch = FilledMatch & { homeScore: number; awayScore: number };

function isMatchScheduled(match: DbModel.Match): match is ScheduledMatch {
  return (
    match.home !== null &&
    match.away !== null &&
    match.date.trim().length > 0 &&
    match.stage.trim().length > 0
  );
}

function isPastMatch(match: ScheduledMatch): match is ScoredMatch {
  return match.homeScore !== null && match.awayScore !== null;
}
//#endregion

//#region Match Enriching
export type GroupMatchesVm = {
    readonly pastMatches: PastMatchVm[];
    readonly recentMatches: PastMatchVm[];
    readonly inProgressMatches: InProgressMatchVm[];
    readonly futureMatches: FutureMatchVm[];
    readonly nextMacthes: FutureMatchVm[];
  };
  
  function groupMatchesVm(
    split: MatchSplit,
    globalStatistics: Record<string, DbModel.MatchStatistics>,
    calcedGroup: DbModel.CalculatedGroup,
    calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[]
  ): GroupMatchesVm {
    const users = toRecord(calcedGroup.users, (user) => user.id);
    const calcedMatches = toRecord(calculatedGroupMatchScores, (m) => m.matchId);
  
    return {
      pastMatches: split.pastMatches.map((match) =>
        pastMatchVm(match, globalStatistics, users, calcedMatches[match.id])
      ),
      recentMatches: split.recentMatches.map((match) =>
        pastMatchVm(match, globalStatistics, users, calcedMatches[match.id])
      ),
      inProgressMatches: split.inProgressMatches.map((match) =>
        inProgressMatchVm(match, users, calcedMatches[match.id], globalStatistics)
      ),
      futureMatches: split.futureMatches.map(futureMatchVm),
      nextMacthes: split.nextMacthes.map(futureMatchVm),
    };
  }
  
export type FutureMatchVm = ScheduledMatch & {};
export function futureMatchVm(match: ScheduledMatch): FutureMatchVm {
  return match;
}

export type UserGuess = {
    readonly id: string;
  readonly displayName: string;
  readonly photoUrl: string;
  readonly guess: DbModel.GuessValue | '---';
};
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

export type InProgressMatchVm = ScheduledMatch & {
  globalStatistics: DbModel.MatchStatistics;
  groupStatistics: DbModel.MatchStatistics;
  userGuesses: UserGuess[];
};
function inProgressMatchVm(
  match: ScheduledMatch,
  users: Record<string, DbModel.GroupUserRecord>,
  groupScores: DbModel.CalculatedGroupMatchScore,
  stats: Record<string, DbModel.MatchStatistics>
): InProgressMatchVm {
  const userGuesses = groupScores.userScores.map((model) =>
    userGuess(users, model)
  );

  const groupStatistics: DbModel.MatchStatistics = {
    home: 0,
    away: 0,
    tie: 0,
  };

  groupScores.userScores.forEach((model) => {
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

export type UserScore = UserGuess & {
  readonly points: number;
  readonly isCorrect: boolean;
  readonly isSolo: boolean;
};
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

export type PastMatchVm = ScoredMatch & {
  globalStatistics: DbModel.MatchStatistics;
  groupStatistics: DbModel.MatchStatistics;
  correctCount: number;
  pointsEach: number;
  correctGuess: DbModel.GuessValue;
  userScores: UserScore[];
};
function pastMatchVm(
  match: ScoredMatch,
  globalStatistics: Record<string, DbModel.MatchStatistics>,
  users: Record<string, DbModel.GroupUserRecord>,
  calculatedGroupMatchScore: DbModel.CalculatedGroupMatchScore
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
  const userScores = calculatedGroupMatchScore.userScores.map((model) =>
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

function calcCorrectGuess(match: ScoredMatch): DbModel.GuessValue {
  if (match.homeScore === match.awayScore) {
    return 'tie';
  }
  return match.homeScore > match.awayScore ? 'home' : 'away';
}

//#endregion

//#region table building
export type GroupTableVm = UserTableRowVm[];

export type UserTableRowVm = {
  readonly displayName: string;
  readonly photoUrl: string;
  readonly totalPoints: number;
  readonly correctCount: number;
  readonly soloCount: number;
};

export function buildTable(group: DbModel.CalculatedGroup, pastMatches: PastMatchVm[]): GroupTableVm {
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

export type GameVm = GroupMatchesVm & {table: GroupTableVm}

export function buildVm(
  allMatches: DbModel.Match[],
  globalStatistics: Record<string, DbModel.MatchStatistics>,
  stages: DbModel.Stage[],
  calcedGroup: DbModel.CalculatedGroup,
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
