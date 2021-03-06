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
        <h1 id="timer-label">{this.props.currentTimerType} Time</h1>
        <h2 id="time-left">
          <span className="currentMinute">
            {this.props.currentMinute < 10
              ? `0${this.props.currentMinute}`
              : this.props.currentMinute}
          </span>
          <span>:</span>
          <span className="currentSeccond">
            {this.props.currentSecond < 10
              ? `0${this.props.currentSecond}`
              : this.props.currentSecond}
          </span>
        </h2>
        <div className="timerButtonsContainer">
          <button
            id="start_stop"
            onClick={
              this.props.isPlaying
                ? this.props.pauseFunction
                : this.props.playFunction
            }
          >
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
      initialSessionLength: 25,
      initialBreakLength: 5,
      currentTimerType: "Session",
      isPlaying: false,
      currentMinute: 25,
      currentSecond: 0,
    };
  }

  pauseFunction = () => {
    clearInterval(this.runTimer);

    this.setState((state) => ({
      isPlaying: !state.isPlaying,
    }));
  };

  playFunction = () => {
    this.runTimer = setInterval(() => {
      // When Timer Ends
      if ((this.state.currentSecond === 0) & (this.state.currentMinute === 0)) {
        // Play the Audio
        this.audioBeep.play();
        // If we are in a Session switch to Break when the timer ends
        if (this.state.currentTimerType === "Session") {
          this.setState({
            currentTimerType: "Break",
            currentMinute: this.state.initialBreakLength,
          });
          // If we are in a Break switch to Session when the timer ends
        } else {
          this.setState({
            currentTimerType: "Session",
            currentMinute: this.state.initialSessionLength,
          });
        }
      } else if (this.state.currentSecond === 0) {
        this.setState((state) => ({
          currentSecond: 59,
          currentMinute: state.currentMinute - 1,
        }));
      } else {
        this.setState((state) => ({ currentSecond: state.currentSecond - 1 }));
      }
    }, 1000);

    this.setState((state) => ({
      isPlaying: !state.isPlaying,
    }));
  };

  //Initializes all state
  resetFunction = () => {
    clearInterval(this.runTimer);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      initialSessionLength: 25,
      initialBreakLength: 5,
      currentTimerType: "Session",
      isPlaying: false,
      currentMinute: 25,
      currentSecond: 0,
    });
  };
  // Function to increase Session/Breaktime
  increaseSessionLength = (e) => {
    let sessionType = e.target.dataset.session;
    if (!this.state.isPlaying) {
      if (sessionType === "session") {
        if (this.state.initialSessionLength <= 59) {
          this.setState((state) => ({
            initialSessionLength: state.initialSessionLength + 1,
            currentMinute: state.initialSessionLength + 1,
            currentSecond: 0,
          }));
        }
      } else if (sessionType === "break") {
        if (this.state.initialBreakLength <= 59) {
          this.setState((state) => ({
            initialBreakLength: state.initialBreakLength + 1,
          }));
        }
      }
    }
  };
  // Function to decrease Session/Breaktime
  decreaseSessionLength = (e) => {
    let sessionType = e.target.dataset.session;
    if (!this.state.isPlaying) {
      if (sessionType === "session") {
        if (this.state.initialSessionLength > 1) {
          this.setState((state) => ({
            initialSessionLength: state.initialSessionLength - 1,
            currentMinute: state.initialSessionLength - 1,
            currentSecond: 0,
          }));
        }
      } else if (sessionType === "break") {
        if (this.state.initialBreakLength > 1) {
          this.setState((state) => ({
            initialBreakLength: state.initialBreakLength - 1,
          }));
        }
      }
    }
  };
  render() {
    return (
      <div className="base">
        <div className="configureSections">
          <AdjustTimeContainer
            sessionLength={this.state.initialSessionLength}
            increaseSessionLength={this.increaseSessionLength}
            decreaseSessionLength={this.decreaseSessionLength}
          />
          <AdjustBreakContainer
            sessionLength={this.state.initialBreakLength}
            increaseSessionLength={this.increaseSessionLength}
            decreaseSessionLength={this.decreaseSessionLength}
          />
        </div>
        <Timer
          currentMinute={this.state.currentMinute}
          currentSecond={this.state.currentSecond}
          currentTimerType={this.state.currentTimerType}
          resetFunction={this.resetFunction}
          playFunction={this.playFunction}
          pauseFunction={this.pauseFunction}
          isPlaying={this.state.isPlaying}
        />
        <audio
          id="beep"
          src="https://freesound.org/data/previews/202/202029_2605156-lq.mp3"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        ></audio>
      </div>
    );
  }
}

/* Render */
ReactDOM.render(<App />, document.querySelector("#root"));
