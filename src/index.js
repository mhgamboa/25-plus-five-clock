import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createStore, combineReducers, bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";

/* Start Redux */
const TIMER = "TIMER";

//Timer Reducer & Action
const timerInitialState = {
  count: 0,
};

const timerReducer = (state = timerInitialState, action) => {
  switch (action.type) {
    case TIMER:
      console.log("boop");
    default:
      return timerInitialState;
  }
};

const timerAction = () => ({
  type: TIMER,
});

// Create Store & Root Reducer

const rootReducer = combineReducers({
  timerReducer,
});
const store = createStore(rootReducer);

/* Start React */

// Timer Component
class Timer extends React.Component {
  render() {
    return (
      <div className="timerContainer">
        <h1>This is a timer</h1>
        <h2>{this.props.count}</h2>
        <button onClick={this.props.timerAction}>start</button>
      </div>
    );
  }
}

const mapStateToPropsTimer = (state) => ({
  count: state.timerReducer.count,
});

const mapDispatchToPropsTimer = (dispatch) =>
  bindActionCreators({ timerAction: timerAction }, dispatch);

const ConnectedTimer = connect(
  mapStateToPropsTimer,
  mapDispatchToPropsTimer
)(Timer);

//Base App
class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="base">
        <div className="configureSections">
          <h1>Session Length</h1>
          <h1>Break</h1>
        </div>
        <ConnectedTimer />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
