import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* Component to adjust the times */
class AdjustTimeContainer extends React.Component {
  render() {
    return (
      <div className="sessionAndBreakContainers">
        <h3 id="session-label">Session Length</h3>
        <h2 id="session-length">{this.props.sessionLength}</h2>
        <div>
          <button
            id="session-decrement"
            onClick={this.props.decreaseSessionLength}
            data-session="session"
          >
            -
          </button>
          <button
            id="session-increment"
            onClick={this.props.increaseSessionLength}
            data-session="session"
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

class AdjustBreakContainer extends React.Component {
  render() {
    return (
      <div className="sessionAndBreakContainers">
        <h3 id="break-label">Break Length</h3>
        <h2 id="break-length">{this.props.sessionLength}</h2>
        <div>
          <button
            id="break-decrement"
            onClick={this.props.decreaseSessionLength}
            data-session="break"
          >
            -
          </button>
          <button
            id="break-increment"
            onClick={this.props.increaseSessionLength}
            data-session="break"
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div className="timerContainer">
        <h1 id="timer-label">{this.props.currentTimer}</h1>
        <h2>{this.props.sessionLength}</h2>
        <div className="timerButtonsContainer">
          <button id="start_stop" onClick={this.props.playPauseFunction}>
            Play/Pause
          </button>
          <button
            id="reset"
            className="resetButton"
            onClick={this.props.resetFunction}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

/* Base App */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      runningClock: 25,
      breakLength: 5,
      currentTimer: "Session",
    };
    this.increaseSessionLength = this.increaseSessionLength.bind(this);
    this.decreaseSessionLength = this.decreaseSessionLength.bind(this);
    this.resetFunction = this.resetFunction.bind(this);
    this.playPauseFunction = this.playPauseFunction.bind(this);
  }
  // Function to increase Session/Breaktime
  increaseSessionLength = (e) => {
    let sessionType = e.target.dataset.session;
    if (sessionType === "session") {
      if (this.state.sessionLength <= 59) {
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
        }));
      }
    } else if (sessionType === "break") {
      if (this.state.breakLength <= 59) {
        this.setState((state) => ({
          breakLength: state.breakLength + 1,
        }));
      }
    }
  };
  // Function to decrease Session/Breaktime
  decreaseSessionLength = (e) => {
    let sessionType = e.target.dataset.session;
    if (sessionType === "session") {
      if (this.state.sessionLength > 1) {
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
        }));
      }
    } else if (sessionType === "break") {
      if (this.state.breakLength > 1) {
        this.setState((state) => ({
          breakLength: state.breakLength - 1,
        }));
      }
    }
  };
  // Function to reset Session time to 25 minutes and break time to 5 minutes
  resetFunction = () => {
    this.setState({
      sessionLength: 25,
      runningClock: 25,
      breakLength: 5,
    });
  };
  //Toggles Play/Pause
  playPauseFunction = () => {
    setInterval(
      () =>
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
        })),
      1000
    );
  };

  render() {
    let sessionLength = this.state.sessionLength;
    let breakLength = this.state.breakLength;
    return (
      <div className="base">
        <div className="configureSections">
          <AdjustTimeContainer
            sessionLength={sessionLength}
            increaseSessionLength={this.increaseSessionLength}
            decreaseSessionLength={this.decreaseSessionLength}
          />
          <AdjustBreakContainer
            sessionLength={breakLength}
            increaseSessionLength={this.increaseSessionLength}
            decreaseSessionLength={this.decreaseSessionLength}
          />
        </div>
        <Timer
          sessionLength={this.state.sessionLength}
          resetFunction={this.resetFunction}
          playPauseFunction={this.playPauseFunction}
          currentTimer={this.state.currentTimer}
        />
      </div>
    );
  }
}

/* Render */

ReactDOM.render(<App />, document.querySelector("#root"));
