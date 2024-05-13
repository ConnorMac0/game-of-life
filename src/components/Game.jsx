import React from "react";

const cellSize = 20;
const width = 800;
const height = 600;
const boardStyle = {
    backgroundImage:
        `linear-gradient(#333 1px, transparent 1px),
        linear-gradient(90deg, #333 1px, transparent 1px)`,
    width: width,
    height: height,
    backgroundSize: `${cellSize}px ${cellSize}px`,
}
class Cell extends React.Component {
    render() {
        let { x, y } = this.props;
        return (
            <div className="bg-white absolute"
                 style={{left: `${cellSize * x + 1}px`,
                 top: `${cellSize * y + 1}px`,
                 width: `${cellSize - 1}px`,
                 height: `${cellSize - 1}px`,}}
            />
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.board = this.makeEmptyBoard();
    }
    state = { cells: [], interval: 100, isRunning: false, }
    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x,y });
                }
            }
        }
        return cells;
    }
    getOffset (){
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return { x: (rect.left + window.scrollX) - doc.clientLeft, y: (rect.top + window.scrollY) - doc.clientTop, };
    }
    handleClick = (event) => {
        const elemOffset = this.getOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }
    runGame = () => {
        this.setState({ isRunning: true });
        this.iterate();
    }
    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    iterate () {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = 0;

                let rowIndex = [-1, -1, -1, 0, 0, 1, 1, 1];
                let colIndex = [-1, 0, 1, -1, 1, -1, 0, 1];

                for (let index = 0; index < 8; index++) {
                    let neighborRow = y + rowIndex[index];
                    let neighborCol = x + colIndex[index];

                    if (neighborCol >= 0 && neighborCol < this.cols && neighborRow >= 0 && neighborRow < this.rows) {
                        if(this.board[neighborRow][neighborCol]){
                            neighbors++;
                        }
                    }
                }

                if( this.board[y][x] ){
                    newBoard[y][x] = neighbors === 2 || neighbors === 3;
                } else {
                    newBoard[y][x] = neighbors === 3;
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });
        this.timeoutHandler = window.setTimeout(() => { this.iterate(); }, this.state.interval);
    }
    render() {
        const { cells } = this.state;
        return(
            <div>
                <div className="relative mx-auto bg-black"
                     style={boardStyle}
                     onClick={this.handleClick}
                     ref={(n) => {
                         this.boardRef = n;
                     }}>
                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>
                <div className="font-display">

                    {this.state.isRunning ?
                    <button className="flex text-4xl py-2 px-5 bg-black rounded-lg mx-auto my-5"
                            onClick={this.stopGame}> Stop </button>
                    :
                    <button className="flex text-4xl py-2 px-5 bg-black rounded-lg mx-auto my-5"
                    onClick={this.runGame}> Start </button>
                    }

                </div>
            </div>

    )
    }
}

export default Game;