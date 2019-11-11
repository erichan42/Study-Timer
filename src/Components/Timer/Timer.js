import React from 'react';
import './Timer.css';

/**
 * Timer component
 * @author Eric Han
 */
class Timer extends React.Component {

    state = {
        /** Indicates if timer is running */
        toggle: false,
        /** Changes name of button depending on toggle state */
        buttonName: ["Start","Pause"],
        /** Initializes the start time since pressing the button */
        startTime: 50000,
        /** Initializes the start time in Date.now() since pressing the button */
        dateTime: Date.now(),
        /** Tracks time passed */
        timer: 50000,
        /** Differentiates pause from reset */
        reset: true
    }

    /** Binds functions */
    constructor () {
        super();
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 

    /** Mounts the startTimer function */
    componentDidMount() {

        /** Runs every 1 ms */
        this.startTimer = setInterval((e) => {

            /* Checks if timer should be on */
            if (this.state.toggle) {
                this.setState((state) => {
                    if (state.timer >= 0) return {timer: state.startTime - (Date.now() - state.dateTime)}
                    else return {timer: 0,
                                toggle:false}
                });
            }
        }, 1);
    }

    /** Unmounts the startTime */
    componentWillUnmount() {
        clearInterval(this.startTimer);
    }
    
    // onSubmit(e) {
    //     e.preventDefault();
    // }

    /** Activates when start/pause is clicked */
    handleStartClick(e) {
        e.preventDefault();

        /* Runs the startTime function */
        this.setState((state) => {
            return {toggle: !state.toggle,
                    startTime: state.reset ? Date.now() : state.startTime,
                    reset: false}
        });
    }

    /** Activates when reset is clicked */
    handleResetClick(e) {
        e.preventDefault();

        /* Resets the timer back to 0 */
        this.setState(() => {
            return {reset: true,
                    timer: 0}
        });
    }

    addTime(e) {
        e.preventDefault();
    }

    // handleKeyPress(e,field) {
    //     if (field.name.value.length() === 2) {
    //         let next = this.refs[field.name].nextSibling;
    //         if (next && next.tagName === "INPUT") {
    //             this.refs[field.name].nextSibling.focus();
    //         }
    //     }
    // }

    render() {
        /* WOW! Look at how nice and pretty the timer display is because of the following four lines */
        let centiseconds = ("0" + (Math.floor(this.state.timer / 10))).slice(-2);
        let seconds = ("0" + (Math.floor(this.state.timer / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.state.timer / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.state.timer / 36000000)).slice(-2);

        return(
            <div className="timer">
                <h1 className="stopwatch-display">
                    {hours}:{minutes}:{seconds}:{centiseconds}
                </h1>
                <form>
                    <input className="timer-input"
                        type="timer"
                        onClick={(e) => this.handleClick(e)}/>
                        <button className="timer-add-time"
                                onClick={(e) => this.addTime(e)}>
                                    Add Time
                        </button>
                </form>
                <div className="timer-button-container">
                    <button className="timer-button start"
                            onClick={(e) => this.handleStartClick(e)}>
                                {this.state.buttonName[this.state.toggle ? 1 : 0]}
                    </button>
                    <button className="timer-button reset"
                            onClick={(e) => this.handleResetClick(e)}>
                                Reset
                    </button>
                </div>
            </div>
        );
    }
}

export default Timer;