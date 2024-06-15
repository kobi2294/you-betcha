import { GameVm } from '@lib';
import { Slide, Surprise, slideGens } from './slide.model';

export type SlideState = {
  slides: Slide[], 
  index: number
}

export function slidesForState(gameVm: GameVm): SlideState {
  if (gameVm.table.length === 0) return {slides: [], index: -1};

  // during countdown time - 20 seconds before match start, until 10 seconds after - show only one slide - "final countdown"
  if (shouldShowCountDown(gameVm)) return {slides: [slideGens.finalCountdounSlide()], index: 0};


  
  // otherwise:
  // any other time
  // - "top 3" slide
  const res: Slide[] = [];

  // res.push(slideGens.top3Slide());

  // // if the group has solos in the history - show the last 3 solos in the "solo - summary" slide
  // const anySolos = gameVm.table.some((g) => g.soloCount > 0);
  // if (anySolos) res.push(slideGens.soloSummarySlide());

  // // if the group has any surprise catcher - show the last 3 surprise catchers in the "surprise hunters" slide
  // // suprise hunter is a case where somebody guessed correctly a score, that had less than 10% statistical chance of happening
  // const surprises = getSurprises(gameVm);
  // surprises.forEach((s) => res.push(slideGens.surpriseHuntersSlide(s)));


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
    // matchesInPast24Hours
    //   .sort((m1, m2) => m1.dateValue - m2.dateValue) 
    //   .slice(0, 4)
    //   .forEach((m) =>
    //   res.push(slideGens.matchSummarySlide(m.id))
    // );
    res.push(slideGens.recentHighestScorersSlide());
  }

  }

  // randomize a number in the range of the slides
  const index = Math.floor(Math.random() * res.length);

  return {slides: res, index};
}

// what data do we need:
// 1. Next matches
// 2. Matches ended in the past 24 hours
// 3. All historical matches
// 4. Table of now
// 5. Table of 24 hours ago

function getSurprises(gameVm: GameVm): Surprise[] {
    const res: Surprise[] = [];
    const pastMatches = gameVm.pastMatches;

    console.log('Checking for surprises');

    for (const match of pastMatches) {
      const totalCount = match.globalStatistics.away + match.globalStatistics.home + match.globalStatistics.tie;
      console.log('total count', totalCount);
        if (totalCount < 12) continue;

        const correctCount = match.globalStatistics[match.correctGuess];
        const correctChance = correctCount / totalCount;
        if (correctChance >= 0.1) continue; // its not considered surprise if the chance is 10% or more

        // now add all the correct guessers
        for (const userScore of match.userScores) {
            if (userScore.guess === match.correctGuess) {
                res.push({matchId: match.id, playerId: userScore.id, guess: userScore.guess, correctCount, totalCount});
            }
        }
    }

    console.log('Found surprises:', res);
    return res;
}

function shouldShowCountDown(gameVm: GameVm) {
  // we should show the countdown in one of two cases:
  // if the matches in progress are less than 10 seconds old
  // if the matches next matches are less than 20 seconds away
  const now = Date.now();
  const nextMatches = gameVm.nextMacthes;
  const inProgressMatches = gameVm.inProgressMatches;

  if (inProgressMatches.length > 0) {
    const inProgressMatch = inProgressMatches[0];
    if (now - inProgressMatch.dateValue < 10000) {
      return true;
    }
  }

  if (nextMatches.length > 0) {
    const nextMatch = nextMatches[0];
    const offset = nextMatch.dateValue - now;
    if (offset < 20000 && offset > 0) {
      return true;
    }
  }

  return false;
}
