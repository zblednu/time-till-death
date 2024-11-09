const input = document.querySelector("#date-input"); 
const output = document.body.querySelector("#output");

input.addEventListener("change", printMessage);

function printMessage() {
  curDate = new Date();
  dateOfBirth = new Date(input.value);

  diff = curDate.getTime() - dateOfBirth.getTime();
  const curAge = parseInt(diff / 1000 / 60 / 60 / 24 / 365);
  const lifeExpectancy = 73;

  output.innerHTML = `You are ${curAge}, median life expectancy is ${lifeExpectancy}
                      <br>
                      ${lifeExpectancy - curAge} more years left for you`;
}
