import { FutureMatchVm, GameVm } from '@lib';
import { Slide, Solo, Surprise, slideGens } from './slide.model';
import { DbModel } from '@tscommon';

export type SlideState = {
  slides: Slide[];
  index: number;
};

export function slidesForState(gameVm: GameVm): SlideState {
  if (gameVm.table.length === 0) return { slides: [], index: -1 };

  // during countdown time - 20 seconds before match start, until 10 seconds after - show only one slide - "final countdown"
  const inCountDown = matchesInCountdown(gameVm);
  if (inCountDown.length > 0)
    return { slides: [slideGens.finalCountdounSlide(inCountDown)], index: 0 };

  // otherwise:
  // any other time
  // - "top 3" slide
  const res: Slide[] = [];

  // res.push(slideGens.top3Slide());

  const surprises = findSurprise(gameVm);
  surprises.forEach((s) => res.push(slideGens.surpriseSlide(s)));

  const solos = findSolos(gameVm);
  solos.forEach((s) => res.push(slideGens.soloSlide(s)));

  // during matches
  // - for each match in progress - show now playing slide
  const inProgressMatches = gameVm.inProgressMatches;
  if (inProgressMatches.length > 0) {
    inProgressMatches.forEach((m) => res.push(slideGens.nowPlayingSlide(m.id)));
  } else {
    // between matches:
    // - for each match coming up - show coming up slide
    const nextMatches = gameVm.nextMacthes;
    if (nextMatches.length > 0) {
      nextMatches.forEach((m) => res.push(slideGens.comingUpSlide(m.id)));
    }

    // if there were matches in the past 24 hours
    // - for each match show "match summary" slide
    // - construct table of 24 hours ago and of now, and show the "recent highest scorers" slide
    const matchesInPast24Hours = gameVm.pastMatches.filter(
      (m) => m.dateValue > Date.now() - 24 * 60 * 60 * 1000
    );

    if (matchesInPast24Hours.length > 0) {
      matchesInPast24Hours
        .sort((m1, m2) => m1.dateValue - m2.dateValue)
        .slice(0, 4)
        .forEach((m) => res.push(slideGens.matchSummarySlide(m.id)));
      res.push(slideGens.recentHighestScorersSlide());
    }
  }
  // randomize a number in the range of the slides
  const index = Math.floor(Math.random() * res.length);

  return { slides: res, index };
}

export function matchesInCountdown(gameVm: GameVm): FutureMatchVm[] {
  // we should show the countdown in one of two cases:
  // if the matches in progress are less than 10 seconds old
  // if the matches next matches are less than 150 seconds away
  const now = Date.now();
  const nextMatches = gameVm.nextMacthes;
  const inProgressMatches = gameVm.inProgressMatches;

  if (inProgressMatches.length > 0) {
    const inCountDown = inProgressMatches.filter(
      (m) => now - m.dateValue < 10000
    );
    if (inCountDown.length > 0) {
      return inCountDown;
    }
  }

  if (nextMatches.length > 0) {
    const inCountDown = nextMatches.filter(
      (m) => m.dateValue - now < 150000 && m.dateValue - now > 0
    );
    if (inCountDown.length > 0) {
      return inCountDown;
    }
  }

  return [];
}

export function findSolos(gameVm: GameVm): Solo[] {
  const res: Solo[] = [];
  for (const match of gameVm.pastMatches) {
    for (const userScore of match.userScores) {
      if (userScore.isSolo) {
        res.push({
          matchId: match.id,
          playerId: userScore.id,
          guess: userScore.guess as DbModel.GuessValue,
          points: userScore.points,
          photoUrl: userScore.photoUrl,
          displayName: userScore.displayName,
        });
      }
    }
  }

  return res;
}

export function findSurprise(gameVm: GameVm): Surprise[] {
  const res: Surprise[] = [];
  for (const match of gameVm.pastMatches) {
    const totalCount =
      match.globalStatistics.away +
      match.globalStatistics.home +
      match.globalStatistics.tie;
    if (totalCount < 10) continue;

    const correctCount = match.globalStatistics[match.correctGuess];
    const correctChance = correctCount / totalCount;
    if (correctChance >= 0.1) continue; // its not considered surprise if the chance is 10% or more

    // now add all the correct guessers
    for (const userScore of match.userScores) {
      if (userScore.guess === match.correctGuess) {
        res.push({
          matchId: match.id,
          playerId: userScore.id,
          guess: userScore.guess,
          correctCount,
          totalCount,
          displayName: userScore.displayName,
          photoUrl: userScore.photoUrl,
          chance: correctCount / totalCount
        });
      }
    }
  }

  return res;
}
