import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* Component to adjust the times */
class AdjustTimeContainer extends React.Component {
  render() {
    return (
      <div className="sessionAndBreakContainers">
        <h3>{this.props.name}</h3>
        <h2>{this.props.sessionLength}</h2>
        <div>
          <button onClick={this.props.changeSessionLength}>+</button>
          <button>-</button>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div className="timerContainer">
        <h1>This is a timer</h1>
        <h2>{this.props.sessionLength}</h2>
        <div className="timerButtonsContainer">
          <button className="playPauseButton">Play/Pause</button>
          <button className="resetButton" onClick={this.props.resetAction}>
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
    };
    this.changeSessionLength = this.changeSessionLength.bind(this);
  }
  changeSessionLength = (e) => {
    console.log(e.target.dataset);
  };

  render() {
    let sessionLength = this.state.sessionLength;
    let breakLength = this.state.breakLength;
    return (
      <div className="base">
        <div className="configureSections">
          <AdjustTimeContainer
            name="Session Length"
            sessionLength={sessionLength}
            dataLabel="session"
            changeSessionLength={this.changeSessionLength}
          />
          <AdjustTimeContainer
            name="Break Length"
            sessionLength={breakLength}
            changeSessionLength={this.changeSessionLength}
          />
        </div>
        <Timer sessionLength={this.state.sessionLength} />
      </div>
    );
  }
}

/* Render */

ReactDOM.render(<App />, document.querySelector("#root"));
