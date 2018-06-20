import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  active: boolean = false;
  game: Game;

  constructor (fb: FormBuilder) {
    this.game = this.loadGame();
  }

  loadGame (): Game {
    let data = JSON.parse(localStorage.getItem('save_game'));
    return new Game(data);
  }
}
