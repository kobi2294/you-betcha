import { DbModel } from '@tscommon';

export type GameVm = GroupMatchesVm & { table: GroupTableVm };

export type GroupTableVm = UserTableRowVm[];

export type UserTableRowVm = {
  readonly id: string;
  readonly displayName: string;
  readonly photoUrl: string;
  readonly totalPoints: number;
  readonly correctCount: number;
  readonly soloCount: number;
};

export type GroupMatchesVm = {
  readonly pastMatches: PastMatchVm[];
  readonly recentMatches: PastMatchVm[];
  readonly inProgressMatches: InProgressMatchVm[];
  readonly futureMatches: FutureMatchVm[];
  readonly nextMacthes: FutureMatchVm[];
  readonly unscheduledMatches: UnscheduledMatch[];
  readonly pointsLeft: number;
  readonly isKnockout: boolean;
};

export type UnscheduledMatch = DbModel.Match & {
  stageName: string;
  points: number;
}

// match with known dates and teams
export type ScheduledMatch = DbModel.Match & {
  home: string;
  away: string;
  date: string;
  stage: string;
};

export type FilledMatch = ScheduledMatch & { 
  stageName: string;
  dateValue: number;
  points: number;
};

// past match, is a scheduled match with scores becuase the game is over
export type PastMatch = FilledMatch & {
  homeScore: number;
  awayScore: number;
};


// scheduled match that occurs in the future
export type FutureMatchVm = FilledMatch & {};


// scheduled match that is currently being played
// therefore its guesses and statistics have been exposed
export type InProgressMatchVm = FilledMatch & {
  globalStatistics: DbModel.MatchStatistics;
  groupStatistics: DbModel.MatchStatistics;
  userGuesses: UserGuess[];
};

export type PastMatchVm = PastMatch & {
  homeScore: number;
  awayScore: number;
  globalStatistics: DbModel.MatchStatistics;
  groupStatistics: DbModel.MatchStatistics;
  correctCount: number;
  pointsEach: number;
  correctGuess: DbModel.GuessValue;
  userScores: UserScore[];
};

export type UserGuess = {
  readonly id: string;
  readonly displayName: string;
  readonly photoUrl: string;
  readonly guess: DbModel.GuessValue | '---';
};

export type UserScore = UserGuess & {
  readonly points: number;
  readonly isCorrect: boolean;
  readonly isSolo: boolean;
};
