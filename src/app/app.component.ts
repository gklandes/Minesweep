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
  private begin: number = null;
  private timeInterval: any;

  constructor () {
    let stored = localStorage.getItem('save_game')
    let data = JSON.parse(stored || 'false');
    this.loadGame(data);
  }

  loadGame (data?: any): void {
    this.game = new Game(data || {
      rows: Math.floor((window.innerHeight - 200) / 50),
      cols: Math.floor(window.innerWidth / 50)
    });

    if (this.game.status === 'active') {
      this.begin = new Date().valueOf() - this.game.time;
      this.startTimer();
    } else {
      this.game.status = 'active';
    }
  }

  resetGame (): boolean {
    localStorage.setItem('save_game', '');
    this.stopTimer();
    this.loadGame();
    // this.updateGame();
    return false;
  }

  updateGame (): void {
    console.log('update', this.game.status);
    if (this.game.status === 'active') this.startTimer();
    else {
      this.stopTimer();
      // this.game.status = 'active';
    }

    localStorage.setItem('save_game', JSON.stringify(this.game));
  }

  getTime (): Object {
    return new Date();
  }

  private startTimer (): void {
    if (this.game.time === null) {
      this.begin = new Date().valueOf();
      this.timeInterval = setInterval(() => {
        this.setTimeString();
      },1000);
    }
  }

  private setTimeString (): void {
    // const t1 = this.begin.valueOf();
    const t2 = new Date().valueOf();
    const diff = t2 - this.begin;
    this.game.time = diff;
  }

  private stopTimer () {
    clearInterval(this.timeInterval);
  }
}
