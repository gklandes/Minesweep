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
  }

}
