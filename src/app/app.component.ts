import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active: boolean = false;
  game: Game;
  phase: string = 'start'; // start,play,finish

  constructor (fb: FormBuilder) {
    this.game = this.loadGame();
  }

  loadGame (): Game {
    let data = JSON.parse(localStorage.getItem('save_game'));
    return new Game(data);
  }

  play (): void {
    this.phase = 'play';
  }

  reset (): boolean {
    this.game = new Game();
    return false;
  }

  quit (): boolean {
    this.phase = 'start';
    return false;
  }
}
