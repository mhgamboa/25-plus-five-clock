import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// Start Redux
const reducer1 = (state = "hello", action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  reducer1,
});

const store = createStore(rootReducer);

//Start React
class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="base">
        <div className="configureSections">
          <h1>{this.props.propName}</h1>
          <h1>hi</h1>
        </div>
        <h1>Timer</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  propName: state.reducer1,
});

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector("#root")
);
