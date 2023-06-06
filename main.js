
document.getElementById('form').addEventListener('submit', validateForm);
const messageElement = document.getElementById('validationMessageElement');

function isValidSinPattern(sinNumber) {
  // Convert string to an integer array
  const sinNumberArray = sinNumber.split('').map((i) => Number.parseInt(i));

  // Get sum of all numbers in sin
  const sinNumberSum = sinNumberArray.reduce((acc, curr, idx) => {
    let newValue = curr;

    // Every Second index we double the number
    if (idx % 2 !== 0) {
      newValue = curr * 2;

      // Number greater than 9, break it into its individual values
      if (newValue > 9) {
        acc += newValue % 10;
        acc += Math.floor(newValue / 10);
      } else {
        acc += newValue;
      }
      return acc;
    }
    acc += newValue;
    return acc;
  }, 0);

  // Valid only if sum is a factor of 10
  const isValidSinPattern = sinNumberSum % 10 === 0;

  return isValidSinPattern;
}

function isValidSin(value) {
  if (value.length !== 9) {
    return false;
  }

  // Validate if sin only contains numbers
  if (!value.match('[0-9]+')) {
    return false;
  }
  if (!isValidSinPattern(value)) {
    return false;
  }

  return true;
}

function validateForm(e) {
  // Stop reloading of the app
  e.preventDefault();

  const sinNumber = document.getElementById('sinNumber');
  if (sinNumber) {
    const value = sinNumber.value.trim();
    if (isValidSin(value)) {
      messageElement.innerHTML = 'SIN is Valid';
    } else {
      messageElement.innerHTML = 'SIN is Not Valid';
    }
  }
}
