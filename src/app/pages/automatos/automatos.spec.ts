import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automatos } from './automatos';

describe('Automatos', () => {
  let component: Automatos;
  let fixture: ComponentFixture<Automatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Automatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Automatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
