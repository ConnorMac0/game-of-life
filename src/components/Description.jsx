import { useState } from 'react';

const Popup = ({ onClose }) => {
    const popupStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '703px',
        padding: '20px',
        zIndex: '9999',
        textAlign: 'center'
    };

    return (
        <div className="bg-stone-800 font-serif rounded-lg" style={popupStyle}>
            <h1 className="text-2xl md:text-4xl py-3">Description</h1>
            <div className="border mb-4">
                <p className="p-2">Conway's Game of Life, also known simply as Life, is a cellular automaton devised by the British
                    mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is
                    determined by its initial state, requiring no further input. One interacts with the Game of Life by
                    creating an initial configuration and observing how it evolves.</p>
            </div>
            <h1 className="text-2xl md:text-4xl py-3">Rules</h1>
            <div className="border mb-4">
                <ol className="text-sm">
                    <li className="p-2">Any live cell with fewer than two live neighbors dies, as if by
                        underpopulation.
                    </li>
                    <li className="p-2">Any live cell with two or three live neighbors lives on to the next
                        generation.
                    </li>
                    <li className="p-2">Any live cell with more than three live neighbors dies, as if by
                        overpopulation.
                    </li>
                    <li className="p-2">Any dead cell with exactly three live neighbors becomes a live cell, as if by
                        reproduction.
                    </li>
                </ol>
            </div>
            <h1 className="text-2xl md:text-4xl py-3">How To Play</h1>
            <div className="border mb-4">
                <p className="p-2">Click the boxes in the grid to place or remove live cells. Then click start to begin the game. Click stop at any time to end the game. </p>
                <p className="p-2">(Tip: Try making compact clusters of cells for more interesting patterns!)</p>
            </div>
            <button className="text-lg bg-black px-2 rounded-md" onClick={onClose}>Close</button>
        </div>
    );
};

const Description = () => {
    const [showPopup, setShowPopup] = useState(true); // Set initial state to true

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {showPopup && <Popup onClose={closePopup}/>}
        </div>
    );
};

export default Description;
