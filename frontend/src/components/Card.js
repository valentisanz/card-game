import React from 'react';
import './styles/Card.css';

function Card(props) {
    return (
        <div className={`Card ${props.shown ? 'front' : ''}`} onClick={() => {
            props.flip()
        }}>
            {props.shown ? <h1>{props.content}</h1> : ''}
        </div>
    );
}

export default Card;
