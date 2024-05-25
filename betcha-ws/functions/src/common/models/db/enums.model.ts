export const COLOR_THEMES = ['blue', 'green', 'red', 'yellow', 'gray'] as const;
export type ColorTheme = typeof COLOR_THEMES[number];


export const GUESS_VALUES = ['home', 'away', 'tie'] as const;
export type GuessValue = typeof GUESS_VALUES[number];


export const USER_ROLES = ['user', 'admin','super'] as const;
export type UserRole = typeof USER_ROLES[number];
