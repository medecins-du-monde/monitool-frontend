import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSaveComponent } from './input-save.component';
import { TranslateModule } from '@ngx-translate/core';

describe('InputSaveComponent', () => {
  let component: InputSaveComponent;
  let fixture: ComponentFixture<InputSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSaveComponent ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
