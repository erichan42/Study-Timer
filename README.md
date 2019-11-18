# Study Timer

Study Timer is a stopwatch and countdown timer application that lets you manage your time studying with ease.

The first part to the application, the stopwatch, continously tracks the amount of time that has passed. Like any basic stopwatch, there are three controls: start, pause, and reset. The start lets the program know to increment the clock, the pause stops the clock, and the reset sets the clock back to zero.

The timer component is slightly more complex because it is intended to implement the Pomodoro Technique ([wiki](https://en.wikipedia.org/wiki/Pomodoro_Technique)). The gist of the Pomodoro Technique is for students to take short, regular breaks when they are studying to maximize productivity. Typically, students would study for 25 minutes, then take a 5 minute break, and continue this process until they are done studying. The timer component accomplishes this by adding a queue where users can add times for both study and break.

## Usage

Click [here](https://erichan42.github.io/Study-Timer/) for a live link.

### Stopwatch
There are three main controls to the stopwatch: start, pause, and reset. The start runs the clock, pressing the same button again pauses it (stops the clock), and the reset sets the clock back to zero.

### Countdown Timer
The timer also has a start, pause, and reset control, which have similar functions to the stopwatch. However, users are also able to input times in the H, M, and S fields, then click on add time to push it into the queue.
