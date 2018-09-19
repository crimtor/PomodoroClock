//imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { Component } from "react";
import { updateDisplay } from "../actions/index";
import { bindActionCreators } from "redux";
import Pomodoro from "../containers/pomodoro";
import Timer from "../components/timer";
import Header from "../components/header";
import Footer from "../components/footer";


const DISPLAY = 'Display';

export default class App extends Component{
  constructor() {
    super();
    this.state = {
      sessionTime: 25,
      breakTime: 5,
      running: false
    }
    this.updateSessionPlus = this.updateSessionPlus.bind(this);
    this.updateSessionMinus = this.updateSessionMinus.bind(this);
    this.updateBreakPlus = this.updateBreakPlus.bind(this);
    this.updateBreakMinus = this.updateBreakMinus.bind(this);
    this.toggleRunning = this.toggleRunning.bind(this);
    this.toggleReset = this.toggleReset.bind(this);
  }

  updateSessionPlus() {
    if(this.state.sessionTime < 60){
        this.setState((prevState) => ({ sessionTime: prevState.sessionTime + 1 }));
    }
  }

  updateSessionMinus() {
    if(this.state.sessionTime > 1){
    this.setState((prevState) => ({ sessionTime: prevState.sessionTime - 1 }));
  }
}

  updateBreakPlus() {
    if(this.state.breakTime < 60 ){
    this.setState((prevState) => ({ breakTime: prevState.breakTime + 1 }));
  }
}
  updateBreakMinus() {
    if(this.state.breakTime > 1 ){
    this.setState((prevState) => ({ breakTime: prevState.breakTime - 1 }));
  }
}

toggleReset () {
  this.clock.stopTimer();
  this.clock.clearTimer();
  this.setState({
    sessionTime: 25,
    breakTime: 5,
    running: false
  });
}

  toggleRunning() {
    if( this.state.running ) {
      this.clock.stopTimer();
    } else {
      this.clock.startTimer();
    }
    this.setState((prevState) => ({ running: !prevState.running }));
  }

  render() {
    const { sessionTime, breakTime, running } = this.state;
    return (
      <div className='main-container'>
        <Header />
        <div className="row">
          <div className="col-md-3" />
          <Timer
          updateSessionPlus={this.updateSessionPlus}
          updateSessionMinus={this.updateSessionMinus}
          updateBreakPlus={this.updateBreakPlus}
          updateBreakMinus={this.updateBreakMinus}
          toggleRunning={this.toggleRunning}
          toggleReset={this.toggleReset}
          running={running}
          sessionTime={sessionTime}
          breakTime={breakTime}
           />
           <Pomodoro
          ref={(el) => this.clock = el}
          running={running}
          sessionTime={sessionTime}
          breakTime={breakTime} />
          <div className="col-md-3" />
        </div>
        <Footer />
      </div>
    );
  }
}
