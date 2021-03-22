import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createStore, combineReducers, bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";

/* Start Redux */
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//Timer Reducer & Action
const timerInitialState = {
  sessionTime: 25,
  breakTime: 5,
};

const timerReducer = (state = timerInitialState, action) => {
  var stateCopy;
  switch (action.type) {
    case INCREMENT:
      return { ...state, sessionTime: ++state.sessionTime };
    case DECREMENT:
      return { ...state, sessionTime: --state.sessionTime };
    default:
      return state;
  }
};

const addSessionTime = () => ({
  type: INCREMENT,
});

const subtractSessionTime = () => ({
  type: DECREMENT,
});

// Create Store & Root Reducer

const rootReducer = combineReducers({
  timerReducer,
});

const store = createStore(rootReducer);

/* Start React */
class App extends React.Component {
  render() {
    return (
      <div className="base">
        <div className="configureSections">
          <h1>{this.props.sessionTime}</h1>
          <h1>Break</h1>
        </div>
        <div className="timerContainer">
          <h1>This is a timer</h1>
          <h2>{this.props.sessionTime}</h2>
          <div>
            <button onClick={this.props.addSessionTime}>+</button>
            <button onClick={this.props.subtractSessionTime}>-</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPropsApp = (state) => ({
  sessionTime: state.timerReducer.sessionTime,
});

const mapDispatchToPropsApp = (dispatch) =>
  bindActionCreators({ addSessionTime, subtractSessionTime }, dispatch);

const ConnectedApp = connect(mapStateToPropsApp, mapDispatchToPropsApp)(App);

/* Render */

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector("#root")
);
