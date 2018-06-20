import { Component, Input  } from '@angular/core';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  // icons
  faBomb = faBomb;
  faFlag = faFlag;

  @Input() tileValue;

  constructor() { }
}
