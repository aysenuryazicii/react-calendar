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
class NextPrev extends React.Component {
  state = { dateOf: date };

  today = () => {
    date.setMonth(new Date().getMonth());
    date.setFullYear(new Date().getFullYear());
    this.setState({ dateOf: date });
  };

  leftBtn = () => {
    date.setMonth(date.getMonth() - 1);
    this.setState({ dateOf: date });
  };

  rightBtn = () => {
    date.setMonth(date.getMonth() + 1);
    this.setState({ dateOf: date });
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
              <Calculate dates={date} />
            </div>
          </div>
        </div>
        <Modal dates={date} months={months} />

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
