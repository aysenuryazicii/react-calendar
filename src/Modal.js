import React from "react";
import Modal from "react-modal";
/*
const eventBox = document.querySelector("#event");
let eventName;
let clickedMonthNum, clickedDate, clickedYear;
let dateBox;
*/
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Modals(props) {
  const months = props.months;
  const clickedMonth = months[props.dates.getMonth()];

  const [modalIsOpen, setIsOpen] = React.useState(false);
  /*
  dateBox = document.querySelectorAll(".date");

  dateBox.forEach((dateBox) =>
    dateBox.addEventListener("click", function () {
      dateBox.classList.add("clicked-date");
      clickedDate = dateBox.textContent;
      clickedMonth = months[props.dates.getMonth()];
      clickedYear = props.dates.getFullYear();
    })
  );
  function dateBox() {}
  */

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function btnEkleme(e) {
    e.preventDefault();
    console.log("ekle");
    closeModal();
  }

  function btnSilme(e) {
    e.preventDefault();
    console.log("sil");
    closeModal();
  }

  function btnGuncelleme(e) {
    e.preventDefault();
    /*
    //clickedMonthNum = months.findIndex((month) => month === clickedMonth);
    if (eventBox.value) eventName = eventBox.value;
    else return;
    eventBox.value = "";

    const eventDiv = document.createElement("p");
    eventDiv.classList.add("event-name");
    eventDiv.textContent = eventName;
    document.querySelector(".clicked-date")?.prepend(eventDiv);

    //document.querySelector(".clicked-date")?.classList.remove("clicked-date");
*/
    closeModal();
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
        <form>
          <label htmlFor="event">Olay:</label>
          <input
            type="text"
            id="event"
            name="event"
            placeholder="Olayı giriniz"
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
      </Modal>
    </div>
  );
}

export default Modals;
