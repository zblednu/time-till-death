import createDP from "./datepicker-module.js";
const input = document.querySelector("#date-input"); 
const output = document.body.querySelector("#output");

input.addEventListener("change", printMessage);

function printMessage() {
  const curDate = new Date();
  const dateOfBirth = new Date(input.value);

  const diff = curDate.getTime() - dateOfBirth.getTime();
  const curAge = parseInt(diff / 1000 / 60 / 60 / 24 / 365);
  const lifeExpectancy = 73;

  output.innerHTML = `You are ${curAge}, median life expectancy is ${lifeExpectancy}
                      <br>
                      You have ${lifeExpectancy - curAge} years left`;
}

const datepicker = createDP();
datepicker.style.position = "fixed";

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const coords = {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
  };

  Object.assign(datepicker.style, coords);
  
  document.body.appendChild(datepicker);
}, { capture: true});




window.addEventListener("dateUpdate", (e) => {
  let date = e.detail.getDate();
  date = date < 10 ? "0" + date : date;
  let month = e.detail.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const year = e.detail.getFullYear();
  const formatted = `${year}-${month}-${date}`;
  input.value = formatted;
  input.dispatchEvent(new Event("change"));
}, { capture: true });
