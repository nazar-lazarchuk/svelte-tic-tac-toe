import { writable, derived, readable, get } from 'svelte/store';

export class Game {
  _squares;
  _winScore;
  _players;
  _moves;

  playerName;
  cols;
  gameState;

  constructor(options = {}) {
    this._squares = options.squares || 3;
    this._winScore = options.winScore || 3;
    this._players = readable(options.players || ['Player 1', 'Player 2']);
    this._moves = writable([]);

    this.playerName = derived(this._moves, $moves => {
      const players = get(this._players);
      return players[$moves.length % players.length];
    });

    this.cols = writable(
      [...new Array(this._squares)].map((el, i) => 
        [...new Array(this._squares)].map((el2, j) =>
          this._getInitialState(i, j)
        )
      )
    );

    this.gameState = writable({
      complete: false,
      draw: false,
      playerName: null,
    });
  }

  _getInitialState = (i, j) => ({
    playerId: -1,
    onMove: this._move(i, j),
  });

  _move = (i, j) => () => {
    if (get(this.gameState).complete) return;
    if (get(this.cols)[i][j].playerId >= 0) return;

    const playerId = get(this._moves).length % get(this._players).length;

    this.cols.update(cols => {
      cols[i][j].playerId = playerId;
      return cols;
    });

    const lastMove = { i, j, playerId };
    this._moves.update(moves => [...moves, lastMove]);

    if (this._checkWin(lastMove)) {
      this.gameState.update(() => ({
        complete: true,
        draw: false,
        playerName: get(this._players)[playerId]
      }))
      return;
    }

    if (!this._isFreeColsExists()) {
      this.gameState.update(() => ({
        complete: true,
        draw: true,
        playerName: 'Дружба'
      }))
    }
  }

  _checkWin = (lastMove) => {
    const currentPlayerMoves = get(this._moves).filter(move => move.playerId === lastMove.playerId);

    const horizontalCoordinates = this._getWinCoordinates((i, j) => ({
      i: lastMove.i,
      j: lastMove.j - j + i
    }));
    const verticalCoordinates = this._getWinCoordinates((i, j) => ({
      i: lastMove.i - j + i,
      j: lastMove.j
    }));
    const leftDiagonalCoordinates = this._getWinCoordinates((i, j) => ({
      i: lastMove.i - j + i,
      j: lastMove.j - j + i
    }));
    const rightDiagonalCoordinates = this._getWinCoordinates((i, j) => ({
      i: lastMove.i - j + i,
      j: lastMove.j - i + j
    }));
    const winCoordinates = [
      ...horizontalCoordinates,
      ...verticalCoordinates,
      ...leftDiagonalCoordinates,
      ...rightDiagonalCoordinates,
    ];

    const isWin = winCoordinates.some(coord => {
      return coord.every(c => currentPlayerMoves.find(
        move => move.i === c.i && move.j === c.j
      ));
    });

    return isWin;
  }

  /**
   * function to find out all the expected coordinates to win
   * @param {Function} calculateCoordinate 
   */
  _getWinCoordinates = (calculateCoordinate) => {
    const result = [];

    for (let i = 0; i < this._winScore; i++) {
      const h = [];
      for(let j = 0; j < this._winScore; j++) {
        const coord = calculateCoordinate(i, j);
        if (coord.i >= 0 && coord.j >= 0 && coord.i < this._squares && coord.j < this._squares) {
          h.push(coord);
        }
      }
      if (h.length === this._winScore) {
        result.push(h);
      }
    }

    return result;
  };

  _isFreeColsExists = () => {
    return get(this._moves).length < this._squares ** 2;
  }
}
