export const COLOR_THEMES = ['blue', 'teal', 'green', 'red', 'purple', 'orange', 'brown'] as const;
export type ColorTheme = typeof COLOR_THEMES[number];


export const GUESS_VALUES = ['home', 'away', 'tie'] as const;
export type GuessValue = typeof GUESS_VALUES[number];


