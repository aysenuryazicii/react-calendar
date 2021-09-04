import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-date-picker";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "5px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
var db = openDatabase("mydb.db", "1.0", "description", 1);

function Modals({ eventDate, newDate }) {
  eventDate.setDate(1);
  let firstDayStart = eventDate.getDay();

  const [event, setEvent] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = useState(newDate);

  if (firstDayStart <= 0) {
    firstDayStart = 7;
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function btnEkleme(e) {
    e.preventDefault();

    const eventDiv = document.createElement("p");
    eventDiv.classList.add("event-name");
    eventDiv.textContent = event;

    if (date.getMonth() === newDate.getMonth()) {
      const a = document.querySelector(
        `#root > div > div.container > div > div.days-container > div > div:nth-child(${
          date.getDate() + firstDayStart - 1
        })`
      );
      a.prepend(eventDiv);
    }

    InsertSQL(date.getDate(), date.getMonth() + 1, date.getFullYear(), event);
    closeModal();
  }

  function btnSilme(e) {
    e.preventDefault();

    const b = document.querySelector(
      `#root > div > div.container > div > div.days-container > div > div:nth-child(${
        date.getDate() + firstDayStart - 1
      })`
    );

    if (
      b &&
      b.firstElementChild &&
      b.firstElementChild !== document.querySelector(".badge")
    )
      b.firstElementChild.textContent = "";

    deleteSQL(date.getDate(), date.getMonth() + 1, date.getFullYear());
    closeModal();
  }

  function btnGuncelleme(e) {
    e.preventDefault();

    const c = document.querySelector(
      `#root > div > div.container > div > div.days-container > div > div:nth-child(${
        date.getDate() + firstDayStart - 1
      })`
    );

    if (
      c &&
      c.firstElementChild &&
      c.firstElementChild !== document.querySelector(".badge")
    )
      c.firstElementChild.textContent = event;

    updateSQL(date.getDate(), date.getMonth() + 1, date.getFullYear(), event);
    closeModal();
  }

  function InsertSQL(clickedDate, clickedMonth, clickedYear, eventName) {
    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Events_Table(day, month, year, event)"
      );
      tx.executeSql(
        "INSERT INTO Events_Table(day,month,year,event) VALUES (" +
          clickedDate +
          "," +
          clickedMonth +
          "," +
          clickedYear +
          "," +
          `"${eventName}"` +
          ")"
      );
    });
  }

  function deleteSQL(clickedDate, clickedMonth, clickedYear) {
    db.transaction(function (tx) {
      tx.executeSql(
        "DELETE FROM Events_Table WHERE day=" +
          clickedDate +
          " AND month=" +
          clickedMonth +
          " AND year=" +
          clickedYear
      );
    });
  }

  function updateSQL(clickedDate, clickedMonth, clickedYear, eventName) {
    db.transaction(function (tx) {
      tx.executeSql(
        "UPDATE Events_Table SET event=" +
          `"${eventName}"` +
          " WHERE day=" +
          clickedDate +
          " AND month=" +
          clickedMonth +
          " AND year=" +
          clickedYear
      );
    });
  }

  return (
    <div className="btn-container">
      <button className="btn" onClick={openModal}>
        Etkinlik eklemek için tıklayınız
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DatePicker
          className="datepicker"
          onChange={setDate}
          value={date}
        ></DatePicker>
        <div className="formButton">
          <form>
            <label htmlFor="event">Etkinlik: </label>
            <input
              type="text"
              id="event"
              name="event"
              placeholder="Etkinlik giriniz"
              onChange={(e) => setEvent(e.target.value)}
            />
            <br />
            <button onClick={btnEkleme} className="btn btn-ekleme">
              EKLE
            </button>
            <button onClick={btnSilme} className="btn btn-silme">
              SİL
            </button>
            <button onClick={btnGuncelleme} className="btn btn-guncelleme">
              GÜNCELLE
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Modals;
