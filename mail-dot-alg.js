// Задача: зробити алгоритм, на вход якого приходить пошта
// і на виході має бути масив можливих варіантів куди можна поставити точку
// Також має бути тестова функція

function getPossibleDots(email) {
  const possibleDots = [email];

  const username = email.split("@")[0];
  const numberOfGaps = username.split("").length - 1;

  const binaryPositions = [];
  for (let i = 1; i <= 2 ** numberOfGaps - 1; i++) {
    binaryPositions.push(i.toString(2).padStart(numberOfGaps, 0));
  }
  // binaryPositions;

  binaryPositions.forEach((position) => {
    const dotIndexes = position.split("").reduce((acc, current, index) => {
      if (current === "1") {
        acc.push(index);
      }
      return acc;
    }, []);
    // dotIndexes;

    let res = email.split("");
    dotIndexes.forEach((dotIndex, index) => {
      res.splice(dotIndex + index + 1, 0, ".");
    });
    res = res.join("");

    // console.log(res);
    possibleDots.push(res);
  });

  return possibleDots;
}

const TEST_CASES = [
  [
    "test@gmail.com",
    [
      "test@gmail.com",
      "t.est@gmail.com",
      "te.st@gmail.com",
      "t.e.st@gmail.com",
      "tes.t@gmail.com",
      "t.es.t@gmail.com",
      "te.s.t@gmail.com",
      "t.e.s.t@gmail.com",
    ],
  ],
];

test(TEST_CASES[0][1].sort(), getPossibleDots(TEST_CASES[0][0]).sort());

const longEmail = "somelongemail@example.com";
const numberOfVariants = 2 ** (longEmail.split("@")[0].split("").length - 1);
test(numberOfVariants, getPossibleDots(longEmail).length);

// ------------------------------
function test(expected, actual) {
  const expectedString = JSON.stringify(expected, null, 2);
  const actualString = JSON.stringify(actual, null, 2);
  if (expectedString === actualString) {
    console.log("✅ Pass!");
  }

  console.log(`Expected: ${expectedString}, got: ${actualString}`);
}
