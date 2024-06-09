import { DbModel } from '@tscommon';

function isString(value: any): value is string {
  return typeof value === 'string';
}

function isStringOrNull(value: any): value is string | null {
  return typeof value === 'string' || value === null;
}

function isNumberOrNull(value: any): value is number | null {
  return typeof value === 'number' || value === null;
}

function isMatch(obj: any): obj is DbModel.Match {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isString(obj.id) &&
    isString(obj.stage) &&
    isStringOrNull(obj.away) &&
    isStringOrNull(obj.home) &&
    isNumberOrNull(obj.awayScore) &&
    isNumberOrNull(obj.homeScore) &&
    isString(obj.date)
  );
}

function isStage(obj: any): obj is DbModel.Stage {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isString(obj.id) &&
    isString(obj.displayName) &&
    typeof obj.points === 'number'
  );
}

function isArrayOf<T>(
  arr: any,
  validator: (value: any) => value is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(validator);
}

export function validatePartialMetadata(obj: any): obj is Partial<DbModel.Metadata> {
  if (typeof obj !== 'object' || obj === null) return false;

  const { matches, stages, countries } = obj as Partial<DbModel.Metadata>;

  if (matches !== undefined && !isArrayOf(matches, isMatch)) return false;
  if (stages !== undefined && !isArrayOf(stages, isStage)) return false;
  if (countries !== undefined && !isArrayOf(countries, isString)) return false;

  return true;
}
