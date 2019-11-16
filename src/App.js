import React from 'react';
import Stopwatch from './Components/Stopwatch/Stopwatch';
import Timer from './Components/Timer/Timer';
import './Styles/index.css'

const App = () => (
    <div>
        <div className="container">
            <h1>Stopwatch</h1>
            <Stopwatch />
        </div>
        <div className="container">
            <h1>Timer</h1>
            <Timer />
        </div>
    </div>
);

export default App;