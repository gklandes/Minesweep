export interface GameData {
  rows: number,
  cols: number,
  active: boolean,
  field: string[],
  state: string[]
}

export class Game {
  rows: number = 8;
  cols: number = 8;
  active: boolean = true;
  field: string[] = [];
  state: string[] = [];

  constructor (data?: GameData) {
    if (data) Object.assign(this, data);
    if (this.field.length !== this.rows * this.cols) this.initField();
  }

  initField () {
    this.field = new Array(this.rows * this.cols);
    this.state = new Array(this.field.length).fill('H');

    // lay the mines
    for (let i = 0; i < this.field.length; i++) {
      this.field[i] = Math.random() < .1 ? 'B' : '';
    }
    // calculate adjacent mines
    for (let i = 0; i < this.field.length; i++) {
      if (this.field[i] === 'B') continue;

      let c = 0;
      let row = Math.floor((i)/this.cols);
      let col = i % this.cols;

      // TL
      if (row > 0 && col > 0 &&
        this.field[(i - this.cols) - 1] === 'B') c++;
      // TC
      if (row > 0 &&
        this.field[i-this.cols] === 'B') c++;
      // TR
      if (row > 0 && col < (this.cols-1) &&
        this.field[(i - this.cols) + 1] === 'B') c++;
      // ML
      if (col > 0 &&
        this.field[i - 1] === 'B') c++;
      // MR
      if (col < (this.cols - 1) &&
        this.field[i + 1] === 'B') c++;
      // BL
      if (row < (this.rows - 1) &&
        col > 0 &&
        this.field[(i + this.cols) - 1] === 'B') c++;
      // BC
      if (row < (this.rows - 1) &&
        this.field[i + this.cols] === 'B') c++;
      // BR
      if (row < (this.rows - 1) &&
        col < (this.cols - 1) &&
        this.field[(i + this.cols) + 1] === 'B') c++;
      // set value as string
      if (this.field[i] !== 'B') this.field[i] = String(c);
    }
  }
}