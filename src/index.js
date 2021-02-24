const lengthFromRange = document.getElementById("lengthRange");
const lengthFromNumber = document.getElementById("lengthNumber");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const displayPassword = document.getElementById("displayPassword");
const passwordConditions = document.getElementById("passwordConditions");

function syncLength(e) {
  const val = e.target.value;
  lengthFromNumber.value = val;
  lengthFromRange.value = val;
}

lengthFromNumber.addEventListener("input", syncLength);
lengthFromRange.addEventListener("input", syncLength);

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

function randomElementFromArray(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function generatePass(length, isNumber, isUppercase, isSymbol) {
  const numberAscii = range(48, 57);
  const uppercaseAscii = range(65, 90);
  const symbolAscii = range(35, 38).concat(range(58, 64));
  let completeAscii = range(97, 122),
    resPass = [];
  if (isUppercase) {
    completeAscii = completeAscii.concat(uppercaseAscii);
    resPass.push(randomElementFromArray(uppercaseAscii));
    length--;
  }
  if (isNumber) {
    completeAscii = completeAscii.concat(numberAscii);
    resPass.push(randomElementFromArray(numberAscii));
    length--;
  }
  if (isSymbol) {
    completeAscii = completeAscii.concat(symbolAscii);
    resPass.push(randomElementFromArray(symbolAscii));
    length--;
  }

  if (length < 0) {
    alert("Enter Valid Password Length");
    return null;
  }
  for (let i = 0; i < length; i++) {
    resPass.push(randomElementFromArray(completeAscii));
  }
  return resPass;
}

passwordConditions.addEventListener("submit", (e) => {
  e.preventDefault();
  const length = lengthFromNumber.value;
  const isNumber = includeNumbers.checked;
  const isUppercase = includeUppercase.checked;
  const isSymbol = includeSymbols.checked;

  const newPassAscii = generatePass(length, isNumber, isUppercase, isSymbol);
  if (!newPassAscii) return;
  let newPass = "";
  for (let i = 0; i < length; i++) {
    newPass += String.fromCharCode(newPassAscii[i]);
  }
  displayPassword.innerHTML = newPass;
});
