export interface GameData {
    rows: number,
    cols: number,
    moves: number,
    field: string[]
}

export class Game {
    rows: number = 8;
    cols: number = 8;
    moves: number = 0;
    field: string[] = [];

    constructor (data?: GameData) {
        if (data) Object.assign(this, data);
        if (this.field.length !== this.rows * this.cols) this.initField();
    }

    initField () {
        this.field = new Array(this.rows * this.cols);
        // lay the mines
        for (let i = 0; i < this.field.length; i++) {
            this.field[i] = Math.random() < .1 ? 'B' : '';
        }
        // calculate adjacent mines
        for (let i = 0; i < this.field.length; i++) {
            let c = 0;
            if (this.field[i+(this.cols + 1)] && this.field[i+(this.cols + 1)] === 'B') c++;
            if (this.field[i+this.cols] && this.field[i+this.cols] === 'B') c++;
            if (this.field[i+(this.cols - 1)] && this.field[i+(this.cols - 1)] === 'B') c++;
            if (this.field[i+1] && this.field[i+1] === 'B') c++;
            if (this.field[i-1] && this.field[i-1] === 'B') c++;
            if (this.field[i-(this.cols + 1)] && this.field[i-(this.cols + 1)] === 'B') c++;
            if (this.field[i-this.cols] && this.field[i-this.cols] === 'B') c++;
            if (this.field[i-(this.cols - 1)] && this.field[i-(this.cols - 1)] === 'B') c++;
            if (this.field[i] !== 'B') this.field[i] = String(c);
        }
    }

    getRows () {
        let i = 0;
        return Array.from(new Array(this.rows).fill(0), x => i++);
    }

    getCells (r) {
        return this.field.slice(r * this.cols, (r * this.cols) + this.cols);
    }
}