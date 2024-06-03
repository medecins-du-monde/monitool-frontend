import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { RefreshModalComponent } from '../components/refresh-modal/refresh-modal.component';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppVersionService {

  private subscription: Subscription = new Subscription();
  private dialogRef: any;
  private ignoreCache = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
  ) {

    this.subscription.add(
      this.swUpdate.available.subscribe(() => {
        this.showDialog();
      })
    );
    this.swUpdate.checkForUpdate().then(() => {
      // checking for updates
    });
    if (this.swUpdate.isEnabled) {
      this.subscription.add(
        interval(60000).subscribe(() => this.swUpdate.checkForUpdate().then(() => {
          // checking for updates
        }))
      );
    }

    // Second system for cache
    this.http.get('/assets/version.txt').pipe(take(1)).subscribe(data => {
      const version = `${data}`;
      if (localStorage['appVersion'] && version !== localStorage['appVersion']) {
        this.showDialog();
      }
      if (!localStorage['appVersion']) {
        localStorage['appVersion'] = version;
      }
    });
    this.subscription.add(
      interval(60000).subscribe(() => {
        this.http.get('/assets/version.txt').pipe(take(1)).subscribe(data => {
          const version = `${data}`;
          if (localStorage['appVersion'] && version !== localStorage['appVersion']) {
            this.showDialog();
          }
          if (!localStorage['appVersion']) {
            localStorage['appVersion'] = version;
          }
        });      })
    );
  }

  showDialog(): void{
    if (this.ignoreCache || this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(RefreshModalComponent, {
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      } else {
        this.ignoreCache = true;
      }
      this.dialogRef = undefined;
    });
  }
}
