import React from "react";
import Timer from "./Timer";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerRef: null,
    };

    this.setRef = this.setRef.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  setRef = (ref) => {
    this.setState({
      timerRef: ref,
    });
  };

  start = () => {
    this.state.timerRef.startTimer();
  };

  stop = () => {
    this.state.timerRef.stopTimer();
  };

  render() {
    return (
      <>
        <div>
          <button onClick={this.start}>start</button>
        </div>
        <div>
          <Timer refer={this.setRef} />
        </div>
        <div>
          <button onClick={this.stop}>start</button>
        </div>
      </>
    );
  }
}

export default Clock;
