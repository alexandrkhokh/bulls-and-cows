const evaluateGuess = (secret: string, guess: string) => {
  const secretArr = secret.toLowerCase().split("");
  const guessArr = guess.toLowerCase().split("");

  const bulls = secretArr.reduce(
    (acc, cur, index) => (cur === guessArr[index] ? acc + 1 : acc),
    0,
  );

  const cows =
    secretArr.reduce(
      (acc, cur) => (guessArr.includes(cur) ? acc + 1 : acc),
      0,
    ) - bulls;

  return {
    bulls,
    cows,
  };
};
export default evaluateGuess;
