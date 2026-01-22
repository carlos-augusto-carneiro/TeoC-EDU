import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Afd } from './afd';

describe('Afd', () => {
  let component: Afd;
  let fixture: ComponentFixture<Afd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Afd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Afd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
