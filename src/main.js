// 12:22PM -> 2:03
/* Tick tack Toe */
// 3:30pm

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.less';


const ROW = 3;
const COL = 3;

class Game extends React.Component{
	
    constructor(props) {
        super(props);
        this.state = {
            turn: true,
            game: [
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
            ],
            gameStatus: false
        }
        this.handlePlayerTurn = this.handlePlayerTurn.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
    }

    handlePlayerTurn(r_index,c_index) {
        if (this.state.gameStatus) {
            return false;
        }
        let gg = this.state.game;
        gg = [...gg];
        let val = gg[r_index][c_index];
        
        if (val == undefined) {
            let turn = this.state.turn;
            let value = turn ? 'cross' : 'zero';
            gg[r_index][c_index] = value;

            let game_status = this.checkGameStatus(gg, value);
            this.setState({
                game: gg,
                turn: !turn,
                gameStatus: game_status
            })
            
        } else {
            alert('!!!!!! Box is already covered !!!!!!');
        }
        
    }

    checkRow(gg, value) {
        console.log("checking for value", value);
        let status = true
        for (let i = 0; i < ROW; i++){
            status = true
            for (let j = 0; j < COL; j++){
                if (gg[i][j] != value) {
                   status = false
                } 
            }
            if (status) {
                return true;
            }
        }
        return false
    }

    checkCol(gg, value) {
        console.log("maching value: ", value);
        let status = true
        for (let i = 0; i < ROW; i++){
            status = true
            for (let j = 0; j < COL; j++){
                if (gg[j][i] != value) {
                   status = false
                } 
            }
            if (status) {
                return true;
            }
        }
        return false
    }

    checkDiagonal(gg, value) {
        let status = true;
        // first diagonal
        for (let i = 0; i < ROW; i++) {
            if (gg[i][i] != value) {
                status = false;
                break;
            }
        }

        if (status) {
            return true;
        }

        /* Second diagonal */
        let i = 0;
        let j = COL - 1;
        status = true;
        while (i < ROW && j >= 0) {
            if (gg[i][j] != value) {
                status = false;
                break;
            }
            i++;
            j--;
        }
        return status;
    }

    checkGameStatus(gg, value) {

        // if (this.checkRow(gg, value) ) {
        if (this.checkRow(gg, value) || this.checkCol(gg, value) || this.checkDiagonal(gg, value)) {
            return true;
        }
        return false;
    }

    render() {
        let $this = this;
        return (
            <>
                <div><b> Turn : </b> Player {this.state.turn ? 1 : 2 } </div>
                {
                    this.state.game.map((row, r_index) => {
                        return (
                            <div className='row' key={r_index} >
                                {
                                    row.map((col, c_index) => {
                                        return (
                                            <div className='col' key={c_index}>
                                                <Box row={r_index} col={c_index} turn={$this.state.turn} value={$this.state.game[r_index][c_index]} handlePlayerTurn={ ()=>this.handlePlayerTurn(r_index,c_index)} />
                                            </div>
                                        )
                                    })
                                }
                                </div>   
                        )
                    })
                }
                {
                    <div className='game-status'>
                        {this.state.gameStatus ?
                            (<>
                                <div> <h2>Game Over !!!</h2></div>
                                <div>
                                    <h3> Congratulations !!!!  Player {this.state.turn ? 2 : 1}</h3>
                                </div>
                            </>
                            ) : ""}
                    </div>
                }
        </>
        )
           
    };
}

class Box extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render() {
        let img_val = this.props.value != undefined ? (this.props.value=='cross' ? 'cross' : 'zero') : '';
		return (
            <div className='box' onClick={() => this.props.handlePlayerTurn(this.props.row, this.props.col)} >
                <div className={'pic ' + img_val } />
			</div>
		)
	}
}

let rootElement = ReactDOM.createRoot(document.getElementById('root'));

rootElement.render(
    <React.StrictMode>
        <Game/>
    </React.StrictMode>
)