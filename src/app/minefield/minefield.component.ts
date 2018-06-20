import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})
export class MinefieldComponent implements OnInit {
  @Input() game: Game;

  constructor() { }

  ngOnInit() {
    console.log(this.game.field);
    console.log(this.game.state);
  }

  getRows () {
    let i = 0;
    return Array.from(new Array(this.game.rows).fill(0), x => i++);
  }

  getCells (r) {
      return this.game.state.slice(r * this.game.cols, (r * this.game.cols) + this.game.cols);
  }

  discover (r,c) {
    let i = (r * this.game.cols) + c;
    let val = this.game.field[i];
    this.game.state[i] = val;
    if (val === '0') this.explore(i);
  }

  explore (i) {
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

  private isOpen (r,c): boolean {
    return this.game.state[(r * this.game.cols) + c] === 'H';
  }
}
