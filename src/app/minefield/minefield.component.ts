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
    this.game.state[i] = this.game.field[i];
  }
}
