import React from 'react';
import './Cards.css';

const Cards = props =>  <div className="cards">
                            <h1 className="time-names">{props.children}</h1>
                        </div>

export default Cards;