import React from 'react';
import './Timer.css';
import Cards from './../Cards/Cards';

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
        startTime: 0,
        /** Queue of times */
        timeQueue: [],
        /** Time value */
        value: "",
        /** Index of timer */
        index: 0,
        /** Initializes the start time in Date.now() since pressing the button */
        dateTime: Date.now(),
        /** Tracks time passed */
        timer: 0,
        /** Differentiates pause from reset */
        reset: true
    }

    /** Binds functions */
    constructor (props) {
        super(props);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                    else {
                        if (Notification.permission === "granted")
                            var notification = new Notification("Time's up!");
                        else if (Notification.permission !== "denied") {
                            Notification.requestPermission().then(function (permission) {
                                if (permission === "granted") {
                                    var notification = new Notification("Time's up!");
                                }
                            });
                        }
                        return {timer: 0,
                                toggle:false,
                                reset:true,
                                index:(state.index + 1) % state.timeQueue.length}
                    }
                });
            }
        }, 1);
    }

    /** Unmounts the startTime */
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    onSubmit(e) {
        e.preventDefault();

        this.setState((state) => {
            if (isNaN(parseInt(state.value)) || parseInt(state.value) <= 0) return;
            else {
                state.timeQueue.push(parseInt(state.value));
                return {timeQueue: state.timeQueue,
                        value:""}
            }
        });
    }

    /** Activates when start/pause is clicked */
    handleStartClick(e) {
        e.preventDefault();

        /* Runs the startTime function */
        this.setState((state) => {
            return {dateTime: Date.now(),
                    startTime: state.reset ? state.timeQueue[state.index]*1000 : state.timer,
                    toggle: !state.toggle,
                    reset: false
                }
        });
    }

    /** Activates when reset is clicked */
    handleResetClick(e) {
        e.preventDefault();

        /* Resets the timer back to 0 */
        this.setState(() => {
            return {reset: true,
                    dateTime: Date.now(),
                    toggle: false,
                    timer: 0,
                    index: this.state.index + 1}
        });
    }

    handleKeyPress(e) {
        let checkIfNum = true;
        if (e.key !== undefined || e.keyCode !== undefined) {
          // Check if it's a "e", ".", "+" or "-"
          checkIfNum =  e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ||
                        e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

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
                <form className="timer-form"
                    onSubmit={(e) => this.onSubmit(e)}>
                    <input className="timer-input"
                        name="time"
                        type="number"
                        placeholder="00:00:00"
                        onChange={this.handleChange}
                        onKeyDown={(e) => this.handleKeyPress(e)}/>
                        <button className="timer-add-time"
                                type="submit"
                                onSubmit={(e) => this.onSubmit(e)}>
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
                <div className="timer-time-container">
                    {this.state.timeQueue.map(timeQueue => <Cards>{timeQueue}</Cards>)}
                </div>
            </div>
        );
    }
}

export default Timer;