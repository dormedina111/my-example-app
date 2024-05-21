import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';

function Lobby() {
    const codeBlocks = [
        "Async case",
        "Promise chaining",
        "Error handling",
        "Fetching data"
    ];

    return (
        <div className="lobby-container">
            <h1>Choose code block</h1>
            <div>
                {codeBlocks.map((codeBlock, index) => (
                    <Link to={`/codeblock/${encodeURIComponent(codeBlock)}`} key={index}>
                        <button className="lobby-button">
                            {codeBlock}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Lobby;