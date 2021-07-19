export const trimStringHelper = (value: unknown): string | null =>
  typeof value === 'string' ? value.trim() : null;

export const toLowerCaseStringHelper = (value: unknown): string | null =>
  typeof value === 'string' ? value.toLowerCase() : null;

export const capitalizeEveryWordStringHelper = (
  value: unknown,
): string | null => {
  if (typeof value !== 'string') return null;

  const words = value.split(' ');
  const wordsCapitalized = words.map(
    (word) => word[0].toUpperCase() + word.substring(1),
  );

  return wordsCapitalized.join(' ');
};
