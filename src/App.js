import React from "react";
import Calculate from "./Calculate";
import Header from "./Header";
import Modal from "./Modal";

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

var date = new Date();
var eventDate = new Date();

class NextPrev extends React.Component {
  state = {
    date: date,
    eventDate: eventDate,
  };

  today = (e) => {
    e.preventDefault();

    date.setMonth(new Date().getMonth());
    date.setFullYear(new Date().getFullYear());
    this.setState({ date: date });
  };

  leftBtn = (e) => {
    e.preventDefault();

    date.setMonth(date.getMonth() - 1);
    this.setState({ date: date });
  };

  rightBtn = (e) => {
    e.preventDefault();

    date.setMonth(date.getMonth() + 1);
    this.setState({ date: date });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="calendar">
            <div className="month">
              <Header dates={date} months={months} />
              <div className="next-prev-container">
                <i
                  onClick={this.leftBtn}
                  className="fas fa-angle-left before"
                ></i>
                <button onClick={this.today} className="btn btn-today">
                  Bugün
                </button>
                <i
                  onClick={this.rightBtn}
                  className="fas fa-angle-right after"
                ></i>
              </div>
            </div>
            <div className="weekdays">
              <div>Pzt</div>
              <div>Sal</div>
              <div>Çar</div>
              <div>Per</div>
              <div>Cum</div>
              <div className="weekends">Cmt</div>
              <div className="weekends">Paz</div>
            </div>
            <div className="days-container">
              <Calculate date={date} />
            </div>
          </div>
        </div>
        <Modal eventDate={date} newDate={date} />

        <footer>
          <div>
            Designed by:
            <a href="https://github.com/aysenuryazicii"> Ayşenur</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default NextPrev;
