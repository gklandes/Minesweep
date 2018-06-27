import { Component } from '@angular/core';

import { Game, GameData } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active: boolean = false;
  game: Game;

  constructor () {
    let data = JSON.parse(localStorage.getItem('save_game'));
    this.loadGame(data);
  }

  loadGame (data?: any): void {
    this.game = new Game(data || {
      rows: Math.floor((window.innerHeight - 200) / 50),
      cols: Math.floor(window.innerWidth / 50)
    });
    this.updateGame();
  }

  resetGame (): boolean {
    this.loadGame();
    this.updateGame();
    return false;
  }

  updateGame (): void {
    localStorage.setItem('save_game', JSON.stringify(this.game));
  }
}
