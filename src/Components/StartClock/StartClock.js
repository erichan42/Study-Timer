import React from 'react';
import './StartClock.css';

class StartClock extends React.Component {
    
    state = {
        toggle: false,
        timer: 0
    }

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    startTimer = setInterval((e) => {
        if (this.state.toggle) {
            this.setState((state) => {
                return {timer: (state.timer + 1)}
            });
        }
    }, 10);

    handleClick(e) {
        e.preventDefault();
        
        this.setState((state) => {
            return {toggle: !state.toggle}
        });
        console.log(this.state.toggle);
    }

    render() {
        let seconds = ("0" + (Math.floor(this.state.timer / 100) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.state.timer / 6000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.state.timer / 360000)).slice(-2);

        return(
            <div className="timer">
                <h1 className="timer-display">
                    {hours}:{minutes}:{seconds}
                </h1>
                <button className="timer-button"
                        onClick={(e) => this.handleClick(e)}>
                            Start
                </button>
            </div>
        );
    }
}

export default StartClock;