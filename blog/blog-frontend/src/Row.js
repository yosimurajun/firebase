import React from 'react';
import './Row.css';

function Row({ title, content, date}) {
    return (
        <div className="row">
            <h1>{title}</h1>
            <span>{date}</span>
            <p>{content}</p>
        </div>
    )
}

export default Row;
