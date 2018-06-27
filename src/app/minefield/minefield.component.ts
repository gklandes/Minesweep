import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss']
})
export class MinefieldComponent {
  @Input() game: Game;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getRows () {
    let i = 0;
    return Array.from(new Array(this.game.rows).fill(0), () => i++);
  }

  getCells (r): string[] {
      return this.game.state.slice(r * this.game.cols, (r * this.game.cols) + this.game.cols);
  }

  flag (r,c,e): boolean {
    let i = (r * this.game.cols) + c;
    let s = this.game.state[i];

    // no flags after game
    if (this.game.status !== 'active') return;

    // you can't flag an opened tile
    if (['H','F'].indexOf(s) >= 0) {
      //toggle b/t flag and hidden
      this.game.state[i] = s === 'H' ? 'F' : 'H';
    }

    // check for win
    if (this.isWin()) this.game.status = 'won';

    this.sendUpdate();

    // prevent context menu unless 'shift' clicked
    return e.shiftKey;
  }

  discover (r,c,e?): void {
    let i = (r * this.game.cols) + c;
    let val = this.game.field[i];

    // reject clicks on flag or after game
    if ((e && this.game.state[i] === 'F') || this.game.status !== 'active') return;

    // handle value
    this.game.state[i] = val;
    if (val === 'B') this.booom();
    else if (this.isWin()) this.game.status = 'won';
    else if (val === '0') this.explore(i);

    if (e) this.sendUpdate();
  }

  private isWin (): boolean {
    for (let i = 0; i < this.game.field.length; i++) {
      if (this.game.state[i] === 'H') return false;
    };
    return true;
  }

  private booom (): void {
    for (let i = 0; i < this.game.field.length; i++) {
      if (this.game.field[i] === 'B') this.game.state[i] = 'B';
    };
    this.game.status = 'lost';
  }

  private explore (i): void {
    let row = Math.floor((i)/this.game.cols);
    let col = i % this.game.cols;
    // TL
    if (row > 0 && col > 0 && this.isOpen(row-1,col-1)) {
      this.discover(row-1,col-1);
    }
    // TC
    if (row > 0 && this.isOpen(row-1,col)) {
      this.discover(row-1,col);
    }
    // TR
    if (row > 0 && col < (this.game.cols-1) && this.isOpen(row-1,col+1)) {
      this.discover(row-1,col+1);
    }
    // ML
    if (col > 0 && this.isOpen(row,col-1)) {
      this.discover(row,col-1);
    }
    // MR
    if (col < (this.game.cols - 1) && this.isOpen(row,col+1)) {
      this.discover(row,col+1);
    }
    // BL
    if (row < (this.game.rows - 1) && col > 0 && this.isOpen(row+1,col-1)) {
      this.discover(row+1,col-1);
    }
    // BC
    if (row < (this.game.rows - 1) && this.isOpen(row+1,col)) {
      this.discover(row+1,col);
    }
    // BR
    if (row < (this.game.rows - 1) && col < (this.game.cols - 1) && this.isOpen(row+1,col+1)) {
      this.discover(row+1,col+1);
    }
  }

  private sendUpdate (): void {
    this.update.emit(null);
  }

  private isOpen (r,c): boolean {
    return this.game.state[(r * this.game.cols) + c] === 'H';
  }
}
