import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faBomb } from '@fortawesome/free-solid-svg-icons';


import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  active: boolean = false;
  game: Game;

  // icons
  faBomb = faBomb;

  constructor (fb: FormBuilder) {
    this.game = this.loadGame();
  }

  loadGame (): Game {
    let data = JSON.parse(localStorage.getItem('save_game'));
    return new Game(data);
  }

  getCellType (c): string {
    if (c === 'B') return 'bomb';
    else return 'num';
  } 
}
