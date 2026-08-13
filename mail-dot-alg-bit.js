// Задача: зробити алгоритм, на вход якого приходить пошта
// і на виході має бути масив можливих варіантів куди можна поставити точку
// Також має бути тестова функція

function getPossibleDots(email) {
  const possibleDots = [email];

  const username = email.split("@")[0];
  const numberOfGaps = username.split("").length - 1;

  for (let i = 1; i <= 2 ** numberOfGaps - 1; i++) {
    let res = email.split("");
    let dotsAdded = 0;
    for (let j = 0; j <= username.length - 1; j++) {
      if ((1 << j) & i) {
        res.splice(j + dotsAdded + 1, 0, ".");
        dotsAdded++;
      }
    }
    res = res.join("");
    possibleDots.push(res);
  }

  return possibleDots;
}

const TEST_CASES = [
  {
    input: "test@gmail.com",
    expected: [
      "test@gmail.com",
      "t.est@gmail.com",
      "te.st@gmail.com",
      "t.e.st@gmail.com",
      "tes.t@gmail.com",
      "t.es.t@gmail.com",
      "te.s.t@gmail.com",
      "t.e.s.t@gmail.com",
    ],
  },
];

test(
  "gives all possible variants",
  TEST_CASES[0].expected.sort(),
  getPossibleDots(TEST_CASES[0].input).sort(),
);

const longEmail = "somelongemail@example.com";
const numberOfVariants = 2 ** (longEmail.split("@")[0].split("").length - 1);
test(
  "number of variants on long usernames matches",
  numberOfVariants,
  getPossibleDots(longEmail).length,
);

// ---
function test(name, expected, actual) {
  const expectedString = JSON.stringify(expected, null, 2);
  const actualString = JSON.stringify(actual, null, 2);
  if (expectedString === actualString) {
    console.log(`✅ "${name}" test passes!`);
    return;
  }

  console.log(`Expected: ${expectedString}, got: ${actualString}`);
}
