import React from 'react';
import './Stopwatch.css';

class Stopwatch extends React.Component {

    state = {
        toggle: false,
        buttonName: ["Start","Pause"],
        startTime: Date.now(),
        timer: 0,
        reset: true
    }

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.startTimer = setInterval((e) => {
            if (this.state.toggle) {
                this.setState((state) => {
                    return {timer: (Date.now() - state.startTime)}
                });
            }
        }, 1);
    }

    componentWillUnmount() {
        clearInterval(this.startTimer);
    }

    handleClick(e) {
        e.preventDefault();

        switch (e.target.className) {
            case ("stopwatch-button start"):
                this.setState((state) => {
                    return {toggle: !state.toggle,
                            startTime: state.reset ? Date.now() : state.startTime,
                            reset: false}
                });
                break;
            case ("stopwatch-button reset"):
                this.setState((state) => {
                    return {reset: true,
                            timer: 0}
                });
                break;
            default:
        }
    }

    render() {
        let centiseconds = ("0" + (Math.floor(this.state.timer / 10))).slice(-2);
        let seconds = ("0" + (Math.floor(this.state.timer / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.state.timer / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.state.timer / 36000000)).slice(-2);

        return(
            <div className="stopwatch">
                <h1 className="stopwatch-display">
                    {hours}:{minutes}:{seconds}:{centiseconds}
                </h1>
                <div className="stopwatch-button-container">
                    <button className="stopwatch-button start"
                            onClick={(e) => this.handleClick(e)}>
                                {this.state.buttonName[this.state.toggle ? 1 : 0]}
                    </button>
                    <button className="stopwatch-button reset"
                            onClick={(e) => this.handleClick(e)}>
                                Reset
                    </button>
                </div>
            </div>
        );
    }
}

export default Stopwatch;