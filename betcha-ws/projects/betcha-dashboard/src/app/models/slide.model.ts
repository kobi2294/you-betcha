import { DbModel } from '@tscommon';
import { FutureMatchVm } from '../../../../bt-lib/src/stores';

type SlideGen<T> = () => T;
type MatchSlideGen<T> = (matchId: string) => T;

export const finalCountdounSlide: (matches: FutureMatchVm[]) => FinalCountdownSlide = (matches: FutureMatchVm[]) => ({
  type: 'final-countdown',
  id: 'final-countdown',
  topLeft: false,
  topRight: false,
  message: false,
  image: '4',
  matches: matches
});

export interface FinalCountdownSlide {
  readonly type: 'final-countdown';
  readonly id: 'final-countdown';
  readonly topLeft: false;
  readonly topRight: false;
  readonly message: false;
  readonly image: string;
  readonly matches: FutureMatchVm[];
}

export const top3Slide: SlideGen<Top3Slide> = () => ({
  type: 'top-3',
  id: 'top-3',
  topLeft: true,
  topRight: true,
  message: false,
  image: '2',
});
export interface Top3Slide {
  readonly type: 'top-3';
  readonly id: 'top-3';
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: false;
  readonly image: string;
}

export const comingUpSlide: MatchSlideGen<ComingUpSlide> = (
  matchId: string
) => ({
  type: 'coming-up',
  id: `coming-up-${matchId}`,
  topLeft: true,
  topRight: true,
  message: true,
  matchId,
  image: '2',
});
export interface ComingUpSlide {
  readonly type: 'coming-up';
  readonly id: string;
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: true;
  readonly matchId: string;
  readonly image: string;
}

export const nowPlayingSlide: MatchSlideGen<NowPlayingSlide> = (
  matchId: string
) => ({
  type: 'now-playing',
  id: `now-playing-${matchId}`,
  topLeft: true,
  topRight: true,
  message: true,
  matchId,
  image: '2',

});
export interface NowPlayingSlide {
  readonly type: 'now-playing';
  readonly id: string;
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: true;
  readonly matchId: string;
  readonly image: string;
}

export const matchSummarySlide: MatchSlideGen<MatchSummarySlide> = (
  matchId: string
) => ({
  type: 'match-summary',
  id: `match-summary-${matchId}`,
  topLeft: true,
  topRight: true,
  message: true,
  matchId,
  image: '3',
});
export interface MatchSummarySlide {
  readonly type: 'match-summary';
  readonly id: string;
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: true;
  readonly matchId: string;
  readonly image: string;
}

export const recentHighestScorersSlide: SlideGen<
  RecentHighestScorersSlide
> = () => ({
  type: 'recent-highest-scorers',
  id: 'recent-highest-scorers',
  topLeft: false,
  topRight: false,
  message: false,
  image: '1',
});
export interface RecentHighestScorersSlide {
  readonly type: 'recent-highest-scorers';
  readonly id: 'recent-highest-scorers';
  readonly topLeft: false;
  readonly topRight: false;
  readonly message: false;
  readonly image: string;
}

export type Surprise = {
  matchId: string;
  playerId: string;
  guess: DbModel.GuessValue;
  correctCount: number;
  totalCount: number;
  displayName: string;
  photoUrl: string;
  chance: number;
};

export const surpriseSlide: (s: Surprise) => SurpriseSlide = (
  surprise
) => ({
  type: 'surprise',
  id: `surprise-${surprise.matchId}-${surprise.playerId}`,
  topLeft: false,
  topRight: false,
  message: false,
  surprise,
  image: '6',
});
export interface SurpriseSlide {
  readonly type: 'surprise';
  readonly id: string;
  readonly topLeft: false;
  readonly topRight: false;
  readonly message: false;
  readonly surprise: Surprise;
  readonly image: string;
}

export type Solo = {
  matchId: string;
  playerId: string;
  photoUrl: string;
  displayName: string;
  guess: DbModel.GuessValue;
  points: number;
};

export const soloSlide: (s: Solo) => SoloSlide = (solo) => ({
  type: 'solo',
  id: `solo-${solo.matchId}-${solo.playerId}`,
  topLeft: true,
  topRight: true,
  message: true,
  image: '5',
  solo
});
export interface SoloSlide {
  readonly type: 'solo';
  readonly id: string;
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: true;
  readonly image: string;
  readonly solo: Solo;

}

export type Slide =
  | FinalCountdownSlide
  | Top3Slide
  | ComingUpSlide
  | NowPlayingSlide
  | MatchSummarySlide
  | RecentHighestScorersSlide
  | SurpriseSlide
  | SoloSlide;

export type SlideType = Slide['type'];
export const slideGens = {
  finalCountdounSlide,
  top3Slide,
  comingUpSlide,
  nowPlayingSlide,
  matchSummarySlide,
  recentHighestScorersSlide,
  surpriseSlide,
  soloSlide,
} as const;
