import { Component } from '@angular/core';

import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active: boolean = false;
  game: Game;

  constructor () {
    this.game = this.loadGame();
  }

  loadGame (): Game {
    let data = JSON.parse(localStorage.getItem('save_game'));
    return new Game(data);
  }

  updateGame (): void {
    localStorage.setItem('save_game', JSON.stringify(this.game));
  }

  reset (): boolean {
    this.game = new Game();
    return false;
  }
}
