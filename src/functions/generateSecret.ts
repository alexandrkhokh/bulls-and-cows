enum Radix {
  bin = 2,
  oct = 8,
  dec = 10,
  hex = 16,
}
const generateSecret = (length: number, base: Radix, random = Math.random) => {
  if (length < 1) {
    throw new RangeError("Длина последовательности указана неверно");
  }

  if (length > base) {
    throw new RangeError(
      "Невозможно сгенерировать уникальную последовательность при такой длине",
    );
  }

  let result = "";

  while (result.length < length) {
    const item = Math.trunc(random() * base)
      .toString(base)
      .toUpperCase();
    if (!result.includes(item)) {
      result += item;
    }
  }

  return result;
};

export default generateSecret;
