import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    component.sidenav = {
      groups: [
        {
          title: 'one',
          items: [
            {
              name: 'test',
              icon: 'test',
              routerLink: 'test'
            },
            {
              name: 'test2',
              icon: 'test2',
              routerLink: 'test2'
            }
          ],
          collapsible: true
        },
        {
          title: 'two',
          items: [
            {
              name: 'test3',
              icon: 'test3',
              routerLink: 'test3'
            },
            {
              name: 'test4',
              icon: 'test4',
              routerLink: 'test4'
            }
          ],
          collapsible: true
        }
      ]
    };
    component.structurePage = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
