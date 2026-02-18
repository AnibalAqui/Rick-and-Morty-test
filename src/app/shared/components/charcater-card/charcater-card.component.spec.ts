import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcaterCardComponent } from './charcater-card.component';

describe('CharcaterCardComponent', () => {
  let component: CharcaterCardComponent;
  let fixture: ComponentFixture<CharcaterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharcaterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharcaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
