import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  public currentSection: string;
  private openMenuClass = 'open';
  private burgerToggleSelect = '.nav-burger .toggle';
  private menuBgSelect = '#mobile-menu-bg';
  private navbarSelect = '#menu-links';
  private btnClass = '.button';
  public brandShowUp = true;

  constructor(private elRef: ElementRef) { }

  ngOnInit() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.navBurgerClose();
  }

  @HostListener('window:click', ['$event'])
  onScroll(event) {
    if (event.target.classList.contains('button')) {
      this.navBurgerClose();
    }
  }

  /**
   * Private functions
   */

  navBurgerToggle() {
    if (!this.navBurgerOpen()) {
      this.navBurgerClose();
    }
  }

  navBurgerOpen(): boolean {
    const elBurger = document.querySelector(this.burgerToggleSelect);

    if (!elBurger.classList.contains(this.openMenuClass)) {
      elBurger.classList.add(this.openMenuClass);
      document.querySelector(this.menuBgSelect).classList.add(this.openMenuClass);
      document.querySelector(this.navbarSelect).classList.add(this.openMenuClass);
      return true;
    }
    return false;
  }
  navBurgerClose(): boolean {
    const elBurger = document.querySelector(this.burgerToggleSelect);

    if (elBurger !== null && elBurger.classList.contains(this.openMenuClass)) {
      elBurger.classList.remove(this.openMenuClass);
      document.querySelector(this.menuBgSelect).classList.remove(this.openMenuClass);
      document.querySelector(this.navbarSelect).classList.remove(this.openMenuClass);
      return true;
    }
    return false;
  }
}
