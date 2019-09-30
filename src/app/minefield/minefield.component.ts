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

  constructor () { }

  getRows () {
    let i = 0;
    return Array.from(new Array(this.game.rows).fill(0), () => i++);
  }

  getCells (r): string[] {
    return this.game.state.slice(r * this.game.cols, (r * this.game.cols) + this.game.cols);
  }

  flag (r, c, e): boolean {
    const i = (r * this.game.cols) + c;
    const s = this.game.state[i];

    // no flags after game
    if (this.game.status !== 'active') { return; }

    // you can't flag an opened tile
    if (['H', 'F'].indexOf(s) >= 0) {
      // toggle b/t flag and hidden
      this.game.state[i] = s === 'H' ? 'F' : 'H';
    }

    // check for win
    if (this.isWin()) { this.game.status = 'won'; }

    this.sendUpdate();

    // prevent context menu unless 'shift' clicked
    return e.shiftKey;
  }

  dig (r, c, e?): void {
    const i = (r * this.game.cols) + c;
    const val = this.game.field[i];

    // reject clicks on flag or after game
    if ((e && this.game.state[i] === 'F') || this.game.status !== 'active') { return; }

    // handle value
    this.game.state[i] = val;
    if (val === 'B') { this.booom(); } else if (this.isWin()) { this.game.status = 'won'; } else if (val === '0') { this.explore(i); }

    if (e) { this.sendUpdate(); }
  }

  private isWin (): boolean {
    return this.game.state.indexOf('H') < 0;
  }

  private booom (): void {
    for (let i = 0; i < this.game.field.length; i++) {
      if (this.game.field[i] === 'B') { this.game.state[i] = 'B'; }
    }
    this.game.status = 'lost';
    this.sendUpdate();
  }

  private explore (i): void {
    const row = Math.floor((i) / this.game.cols);
    const col = i % this.game.cols;
    // TL
    if (row > 0 && col > 0 && this.isOpen(row - 1, col - 1)) {
      this.dig(row - 1, col - 1);
    }
    // TC
    if (row > 0 && this.isOpen(row - 1, col)) {
      this.dig(row - 1, col);
    }
    // TR
    if (row > 0 && col < (this.game.cols - 1) && this.isOpen(row - 1, col + 1)) {
      this.dig(row - 1, col + 1);
    }
    // ML
    if (col > 0 && this.isOpen(row, col - 1)) {
      this.dig(row, col - 1);
    }
    // MR
    if (col < (this.game.cols - 1) && this.isOpen(row, col + 1)) {
      this.dig(row, col + 1);
    }
    // BL
    if (row < (this.game.rows - 1) && col > 0 && this.isOpen(row + 1, col - 1)) {
      this.dig(row + 1, col - 1);
    }
    // BC
    if (row < (this.game.rows - 1) && this.isOpen(row + 1, col)) {
      this.dig(row + 1, col);
    }
    // BR
    if (row < (this.game.rows - 1) && col < (this.game.cols - 1) && this.isOpen(row + 1, col + 1)) {
      this.dig(row + 1, col + 1);
    }
  }

  private sendUpdate (): void {
    this.update.emit(null);
  }

  private isOpen (r, c): boolean {
    return this.game.state[(r * this.game.cols) + c] === 'H';
  }
}
