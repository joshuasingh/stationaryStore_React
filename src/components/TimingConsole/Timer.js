import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: 0,
      min: 1,
      sec: 44,
      property: false,
      timerRef: null,
    };

    this.props.refer(this);
    this.changeVal = this.changeVal.bind(this);
    this.toggleValue = this.toggleValue.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  changeVal = () => {
    this.setState((prev) => ({
      property: !prev.property,
    }));
  };

  startTimer = () => {
    var timerRef = setInterval(this.toggleValue, 100);
    this.setState({
      timerRef: timerRef,
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timerRef);
  };

  toggleValue = () => {
    var { hour, min, sec } = this.state;

    if (hour === 0 && min === 0 && sec === 1) {
      alert("time is done");
      clearInterval(this.state.timerRef);
    }

    var newMin;
    var newHour;
    var newSec;

    sec = sec === 0 ? 60 : sec - 1;
    min = sec === 60 ? (min === 0 ? 60 : min - 1) : min;
    hour = min === 60 ? (hour === 0 ? 0 : hour - 1) : hour;

    console.log(hour, min, sec);

    this.setState({
      hour,
      min,
      sec,
    });
  };

  render() {
    console.log("render of timer");
    return (
      <>
        <div>
          {this.state.hour < 10 ? "0" + this.state.hour : this.state.hour}:
          {this.state.min < 10 ? "0" + this.state.min : this.state.min}:
          {this.state.sec < 10 ? "0" + this.state.sec : this.state.sec}
        </div>
      </>
    );
  }
}

export default Timer;
