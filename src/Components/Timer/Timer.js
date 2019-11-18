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
        /** Time values */
        valueH: "",
        valueM: "",
        valueS: "",
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
                    if (state.timeQueue.length > 0) {
                        if (state.timer >= 0) return {timer: state.startTime - (Date.now() - state.dateTime)}
                        else {
                            if (Notification.permission === "granted")
                                new Notification("Time's up!");
                            else if (Notification.permission !== "denied") {
                                Notification.requestPermission().then(function (permission) {
                                    if (permission === "granted") {
                                        new Notification("Time's up!");
                                    }
                                });
                            }
                            return {toggle:false,
                                    reset:true,
                                    timer: state.timeQueue[state.index],
                                    index:(state.index + 1) % state.timeQueue.length}
                        }
                    } else {
                        return {toggle:false}
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
            let timeVal = 0;

            if (!(isNaN(parseInt(state.valueH)) || parseInt(state.valueH) <= 0)) {
                timeVal += parseInt(state.valueH * 3600);
            }
            if (!(isNaN(parseInt(state.valueM)) || parseInt(state.valueM) <= 0)) {
                timeVal += parseInt(state.valueM * 60);
            }
            if (!(isNaN(parseInt(state.valueS)) || parseInt(state.valueS) <= 0)) {
                timeVal += parseInt(state.valueS);
            }

            if (timeVal !== 0) {
                state.timeQueue.push(parseInt(timeVal));
                return {timeQueue: state.timeQueue}
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
        this.setState((state) => {
            return {reset: true,
                    dateTime: Date.now(),
                    toggle: false,
                    timer: 0,
                    index: (state.index + 1) % state.timeQueue.length}
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
        this.setState({valueH: this.refs.hr.value,
            valueM: this.refs.min.value,
            valueS: this.refs.sec.value
        });
    }

    render() {
        /* WOW! Look at how nice and pretty the timer display is because of the following four lines */
        let centiseconds = ("0" + (Math.floor(this.state.timer / 10))).slice(-2);
        let seconds = ("0" + (Math.floor(this.state.timer / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.state.timer / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.state.timer / 3600000)).slice(-2);

        return(
            <div className="timer">
                <h1 className="stopwatch-display">
                    {hours}:{minutes}:{seconds}:{centiseconds}
                </h1>
                <form className="timer-form"
                    onSubmit={(e) => this.onSubmit(e)}>
                    <input className="timer-input hours"
                        ref="hr"
                        name="time"
                        type="number"
                        placeholder="H"
                        onChange={this.handleChange}
                        onKeyDown={(e) => this.handleKeyPress(e)}/>
                    <span> : </span>
                    <input className="timer-input minutes"
                        ref="min"
                        name="time"
                        type="number"
                        placeholder="M"
                        onChange={this.handleChange}
                        onKeyDown={(e) => this.handleKeyPress(e)}/>
                    <span> : </span>
                    <input className="timer-input seconds"
                        ref="sec"
                        name="time"
                        type="number"
                        placeholder="S"
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
                    {this.state.timeQueue.map(timeQueue => <Cards key={timeQueue}>{("0" + (Math.floor(timeQueue/3600))).slice(-2) + ":" + ("0" + (Math.floor(timeQueue/60)-Math.floor(parseInt(timeQueue/3600))*60)).slice(-2) + ":" + ("0" + ((timeQueue - Math.floor(timeQueue/60)*60))).slice(-2)}</Cards>)}
                </div>
            </div>
        );
    }
}

export default Timer;