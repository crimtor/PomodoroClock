//imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { Component } from "react";
import Timer from "../components/timer";

var interID;

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMinutes: this.props.sessionTime,
      currentSeconds: 0,
      isBreak: false,
      breakLeft: this.props.breakTime
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.sessionTime != prevProps.sessionTime){
      this.setState({ currentMinutes: this.props.sessionTime });
    }
    if(this.props.breakTime != prevProps.breakTime){
      this.setState({ breakLeft: this.props.breakTime });
  }
}

  clearTimer() {
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      currentMinutes: this.props.sessionTime,
      currentSeconds: 0,
      isBreak: false,
      breakTime: this.props.breakTime
    });
    clearInterval(interID);
  }

  stopTimer(){
    clearInterval(interID);
  }

  startTimer() {
    interID = setInterval(() => {
      let { currentSeconds, currentMinutes, breakLeft } = this.state;
      if( currentMinutes === 0 && currentSeconds === 0) {
        if( this.state.isBreak ) {
          document.getElementById('beep').play();
          clearInterval(interID);
          this.setState({
            currentMinutes: this.props.sessionTime,
            currentSeconds: 0,
            isBreak: false
          });
          return;
        }
        document.getElementById('beep').play();
        this.setState({
          currentMinutes: breakLeft,
          currentSeconds: 0
        });
        this.setState({ isBreak: true});
        return;
      }
      if( currentSeconds === 0 ) {
        this.setState((prevState) => ({
          currentMinutes: prevState.currentMinutes - 1,
          currentSeconds: 59
        }))
      } else {
        this.setState((prevState) => ({ currentSeconds: prevState.currentSeconds - 1 }));
      }
    }, 1000);
  }

  render() {
    const { sessionTime, breakTime, running } = this.props;
      return (
        <div className="col-md-3">
          <span id="timer-label">{(this.state.isBreak) ? 'Break' : 'Session'}</span>
          <div id="time-left" className={'clock ' + ((this.state.isBreak) ? 'break' : 'session')}>
          {
            ('0' + this.state.currentMinutes).slice(-2) +
            ':' +
            ('0' + this.state.currentSeconds).slice(-2)
          }
          </div>
          <audio id="beep" src="https://shawntfox.com/elijah/snake/audio/dead.mp3" />
        </div>
      );
    }
  }
