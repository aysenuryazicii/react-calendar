import React from "react";

const Calculate = (props) => {
  let date = props.dates;

  let prevLastDay;
  let everyDay = "";

  date.setDate(1);

  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  let firstDayStart = date.getDay();
  let nextDays = 7 - lastDayIndex;

  everyDay = "";
  if (firstDayStart <= 0) {
    firstDayStart = 7;
  }
  if (nextDays === 7) {
    nextDays = 0;
  }

  for (let j = firstDayStart - 1; j > 0; j--) {
    everyDay += `<div class="prev-date date">${prevLastDay - j + 1}</div>`;
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      everyDay += `<div class="today-date date"><span class="badge">${i}</span></div> `;
    } else {
      everyDay += `<div class="date">${i}</div> `;
    }
  }

  for (let x = 1; x <= nextDays; x++) {
    everyDay += `<div class="next-date date">${x}</div>`;
  }

  return (
    <div className="days" dangerouslySetInnerHTML={{ __html: everyDay }}></div>
  );
};

export default Calculate;
