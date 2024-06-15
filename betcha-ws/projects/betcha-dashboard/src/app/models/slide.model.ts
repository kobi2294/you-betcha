import { DbModel } from '@tscommon';

type SlideGen<T> = () => T;
type MatchSlideGen<T> = (matchId: string) => T;

export const finalCountdounSlide: SlideGen<FinalCountdownSlide> = () => ({
  type: 'final-countdown',
  id: 'final-countdown',
  topLeft: false,
  topRight: false,
  message: false,
  image: '1',
});
export interface FinalCountdownSlide {
  readonly type: 'final-countdown';
  readonly id: 'final-countdown';
  readonly topLeft: false;
  readonly topRight: false;
  readonly message: false;
  readonly image: string;
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
};

export const surpriseHuntersSlide: (s: Surprise) => SurpriseHuntersSlide = (
  surprise
) => ({
  type: 'surprise-hunters',
  id: `surprise-hunters-${surprise.matchId}-${surprise.playerId}`,
  topLeft: true,
  topRight: true,
  message: false,
  surprise,
  image: '1',
});
export interface SurpriseHuntersSlide {
  readonly type: 'surprise-hunters';
  readonly id: string;
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: false;
  readonly surprise: Surprise;
  readonly image: string;
}

export const soloSummarySlide: SlideGen<SoloSummarySlide> = () => ({
  type: 'solo-summary',
  id: 'solo-summary',
  topLeft: true,
  topRight: true,
  message: true,
  image: '1',
});
export interface SoloSummarySlide {
  readonly type: 'solo-summary';
  readonly id: 'solo-summary';
  readonly topLeft: true;
  readonly topRight: true;
  readonly message: true;
  readonly image: string;
}

export type Slide =
  | FinalCountdownSlide
  | Top3Slide
  | ComingUpSlide
  | NowPlayingSlide
  | MatchSummarySlide
  | RecentHighestScorersSlide
  | SurpriseHuntersSlide
  | SoloSummarySlide;

export type SlideType = Slide['type'];
export const slideGens = {
  finalCountdounSlide,
  top3Slide,
  comingUpSlide,
  nowPlayingSlide,
  matchSummarySlide,
  recentHighestScorersSlide,
  surpriseHuntersSlide,
  soloSummarySlide,
} as const;
