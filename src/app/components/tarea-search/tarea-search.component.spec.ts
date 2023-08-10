import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaSearchComponent } from './tarea-search.component';

describe('TareaSearchComponent', () => {
  let component: TareaSearchComponent;
  let fixture: ComponentFixture<TareaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
