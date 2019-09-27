import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinefieldComponent } from './minefield.component';
import { TileComponent } from '../tile/tile.component';

describe('MinefieldComponent', () => {
  let component: MinefieldComponent;
  let fixture: ComponentFixture<MinefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MinefieldComponent,
        // TileComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
