const countPossibleSecretsCreator = () => {
  const cache = new Map<string, number>();
  return function countPossibles(length: number, base: number): number {
    if (length > base) {
      return 0;
    }
    if (length === 0) {
      return 1;
    }

    const key = `${base}:${length}`;
    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const result = countPossibles(length - 1, base) * (base - length + 1);
    cache.set(key, result);
    return result;
  };
};

const countPossibleSecrets = countPossibleSecretsCreator();

export default countPossibleSecrets;
