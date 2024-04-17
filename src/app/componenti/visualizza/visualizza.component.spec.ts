import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaComponent } from './visualizza.component';

describe('VisualizzaComponent', () => {
  let component: VisualizzaComponent;
  let fixture: ComponentFixture<VisualizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
