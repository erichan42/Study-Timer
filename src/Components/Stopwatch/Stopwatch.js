import React from 'react';
import './Stopwatch.css';

/**
 * Stopwatch component
 * @author Eric Han
 */
class Stopwatch extends React.Component {

    state = {
        /** Indicates if timer is running */
        toggle: false,
        /** Changes name of button depending on toggle state */
        buttonName: ["Start","Pause"],
        /** Initializes the start time since pressing the button */
        startTime: 0,
        dateTime: Date.now(),
        /** Tracks time passed */
        timer: 0,
        /** Differentiates pause from reset */
        reset: true
    }

    /** Binds functions */
    constructor () {
        super();
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    /** Mounts the startTimer function */
    componentDidMount() {

        /** Runs every 1 ms */
        this.startTimer = setInterval((e) => {

            /* Checks if timer should be on */
            if (this.state.toggle) {
                this.setState((state) => {
                    return {timer: state.startTime + (Date.now() - state.dateTime)}
                });
            }
        }, 1);
    }

    /** Unmounts the startTime */
    componentWillUnmount() {
        clearInterval(this.startTimer);
    }

    /** Activates when start/pause is clicked */
    handleStartClick(e) {
        e.preventDefault();

        /* Runs the startTime function */
        this.setState((state) => {
                return{toggle: !state.toggle,
                    dateTime: Date.now(),
                    startTime: state.reset ? 0 : state.timer,
                    reset: false}
        });
    }

    /** Activates when reset is clicked */
    handleResetClick(e) {
        e.preventDefault();

        /* Resets the timer back to 0 */
        this.setState(() => {
            return {reset: true,
                    startTime: Date.now(),
                    toggle: false,
                    timer: 0}
        });
    }

    render() {
        /* Makes the timer display all nice and pretty */
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
                            onClick={(e) => this.handleStartClick(e)}>
                                {this.state.buttonName[this.state.toggle ? 1 : 0]}
                    </button>
                    <button className="stopwatch-button reset"
                            onClick={(e) => this.handleResetClick(e)}>
                                Reset
                    </button>
                </div>
            </div>
        );
    }
}

export default Stopwatch;