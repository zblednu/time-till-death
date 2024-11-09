"use strict"
export default function createDatepicker() {
  const displayedDate = new Date();
  displayedDate.setDate(1);
  displayedDate.setYear(2005);

  const datepicker = document.createElement("div");
  datepicker.setAttribute("class", "datepicker");
  const datepickerStyle = {
    outline: "1px solid black",
  }
  datepicker.appendChild(createBreadcrumbs());
  datepicker.appendChild(createCalendar());

  return datepicker;

  function createBreadcrumbs() {
    const breadcrumbs = document.createElement("div");
    const btnPrev = document.createElement("button");
    btnPrev.textContent = "◀";
    const btnNext = document.createElement("button");
    btnNext.textContent = "▶";

    const months = Array(12).fill(null).map((_, i) =>
      new Date(0, i).toLocaleString("en", { month: "short" })
    );
    const curDate = document.createElement("SPAN");
    curDate.textContent = months[displayedDate.getMonth()] + " " +
      displayedDate.getFullYear();

    btnPrev.addEventListener("click", () => {
      displayedDate.setMonth(displayedDate.getMonth() - 1);
      curDate.textContent = months[displayedDate.getMonth()] + " " +
        displayedDate.getFullYear();
      datepicker.replaceChild(
        createCalendar(),
        datepicker.lastElementChild,
      );
    });
    btnNext.addEventListener("click", () => {
      displayedDate.setMonth(displayedDate.getMonth() + 1);
      curDate.textContent = months[displayedDate.getMonth()] + " " +
        displayedDate.getFullYear();
      datepicker.replaceChild(
        createCalendar(),
        datepicker.lastElementChild,
      );
    });

    breadcrumbs.appendChild(btnPrev);
    breadcrumbs.appendChild(curDate);
    breadcrumbs.appendChild(btnNext);

    breadcrumbs.style.display = "flex";
    breadcrumbs.style.justifyContent = "space-between";

    breadcrumbs.firstElementChild.style.flexBasis = "15%";
    breadcrumbs.firstElementChild.style.border = "none";
    breadcrumbs.lastElementChild.style.flexBasis = "15%";
    breadcrumbs.lastElementChild.style.border = "none";

    breadcrumbs.style.fontSize = "2em";
    breadcrumbs.style.outline = "1px solid black";

    return breadcrumbs;
  }

  function createCalendar() {
    const calendar = document.createElement("DIV");
    displayedDate.setDate(1);
    const dayOffset = (displayedDate.getDay() + 6) % 7;
    for (let i = 0; i < dayOffset; ++i) {
      const blankTile = document.createElement("DIV");
      calendar.appendChild(blankTile);
    }

    const tempDate = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth(),
    );
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(0);
    const daysInCurMonth = tempDate.getDate();


    const styleForDayTile = {
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
      outline : "1px solid black",
      aspectRatio : "1 / 1",
    };

    for (let i = 0; i < daysInCurMonth; ++i) {
      const dayTile = document.createElement("DIV");
      dayTile.textContent = i + 1;
      dayTile.setAttribute("class", "day-tile");
      Object.assign(dayTile.style, styleForDayTile);
      calendar.appendChild(dayTile);
    }
    calendar.style.padding = "5px";
    calendar.style.display = "grid";
    calendar.style.gridTemplateColumns = "repeat(7, 1fr)";
    calendar.style.gap = "5px";

    calendar.addEventListener("click", (e) => {
      if (e.target.getAttribute("class") === "day-tile") {
        displayedDate.setDate(e.target.textContent);
        dispatchDate(displayedDate);
      }
    }, { capture: true });

    function dispatchDate(date) {
      const event = new CustomEvent("dateUpdate", { detail: date });
      calendar.dispatchEvent(event);
    }

    return calendar;
  }
}
