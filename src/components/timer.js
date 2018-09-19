import React, { Component } from "react";

// <div className='input-box'>
//   Session duration:&nbsp;
//   <input className='input' type='number' min='1' max='30' defaultValue='25'
//     onChange={({target}) => this.props.updateSession(target.value)}
//     disabled={(this.props.running) ? true : false}></input>
// </div>
// <div className='input-box'>
//   Break duration:&nbsp;
//   <input className='input' type='number' min='1' max='15' defaultValue='5'
//     onChange={({target}) => this.props.updateBreak(target.value)}
//     disabled={(this.props.running) ? true : false}></input>
// </div>


export default class Timer extends React.Component {
  render() {
    return (
      <div className='input-panel'>
          <div id="break">
          <span id="break-label">Break Length</span>
          <br />
            <div className="timerContents">
              <button className="btn" id="break-decrement" onClick={this.props.updateBreakMinus}> - </button>
              <span id="break-length">{this.props.breakTime}</span>
              <button className="btn" id="break-increment" onClick={this.props.updateBreakPlus}> + </button>
            </div>
          </div>

        <div id="session">
          <span id="session-label">Session Length</span>
          <br />
          <div className="timerContents">
            <button className="btn" id="session-decrement" onClick={this.props.updateSessionMinus}> - </button>
            <span id="session-length">{this.props.sessionTime}</span>
            <button className="btn" id="session-increment" onClick={this.props.updateSessionPlus}> + </button>
          </div>
        </div>
        <div className='input-box'>
          <button id="start_stop" className='btn' type='button' onClick={this.props.toggleRunning}>
            {this.props.running ? 'Stop' : 'Start'}
          </button>
          <button id="reset" className='btn' type='button' onClick={this.props.toggleReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
