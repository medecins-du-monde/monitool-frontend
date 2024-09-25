import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStatusComponent } from './input-status.component';
import { TranslateModule } from '@ngx-translate/core';

describe('InputStatusComponent', () => {
  let component: InputStatusComponent;
  let fixture: ComponentFixture<InputStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputStatusComponent ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
