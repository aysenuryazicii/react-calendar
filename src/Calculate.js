import React from "react";

var db = openDatabase("mydb.db", "1.0", "description", 1);

const Calculate = ({ date }) => {
  let prevLastDay;
  let everyDay = "";
  let counterForPrevDays = 0;

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
    counterForPrevDays++;
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

  const readSQL = function () {
    db.transaction(function (tx) {
      let clickedMonthNum = date.getMonth() + 1;

      let dateBox = document.querySelectorAll(".date");
      let dayOfEvent;

      tx.executeSql(
        `SELECT * FROM Events_Table WHERE month=${clickedMonthNum}`,
        [],
        function (tx, results) {
          var len = results.rows.length;

          for (let i = 0; i < len; i++) {
            dayOfEvent =
              Number(dateBox[results.rows[i].day].childNodes[0]?.textContent) -
              1 +
              counterForPrevDays;

            if (dayOfEvent > prevLastDay) dayOfEvent -= prevLastDay;

            if (
              Number(
                document.querySelector(
                  `#root > div > div.container > div > div.days-container > div > div:nth-child(${
                    dayOfEvent + counterForPrevDays
                  })`
                )?.textContent
              ) === dayOfEvent
            ) {
              const eventDivTag = document.createElement("p");
              eventDivTag.classList.add("event-name");
              eventDivTag.textContent = results.rows[i].event;

              document
                .querySelector(
                  `#root > div> div.container > div > div.days-container > div > div:nth-child(${
                    dayOfEvent + counterForPrevDays
                  })`
                )
                ?.prepend(eventDivTag);
            }
          }
        },
        null
      );
    });
  };

  readSQL();

  return (
    <div className="days" dangerouslySetInnerHTML={{ __html: everyDay }}></div>
  );
};

export default Calculate;
