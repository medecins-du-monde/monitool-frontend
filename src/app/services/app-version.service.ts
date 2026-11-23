import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
    this.http.get('/assets/version.txt?ngsw-bypass=true').pipe(take(1)).subscribe(data => {
      const version = `${data}`;
      if (!localStorage['appVersion'] || version !== localStorage['appVersion']) {
        this.showDialog(version);
      }
    });
    this.subscription.add(
      interval(60000).subscribe(() => {
        this.http.get('/assets/version.txt?ngsw-bypass=true').pipe(take(1)).subscribe(data => {
          const version = `${data}`;
          if (!localStorage['appVersion'] || version !== localStorage['appVersion']) {
            this.showDialog(version);
          }
        });
      })
    );
  }

  showDialog(version?: string): void{
    if (this.ignoreCache || this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(RefreshModalComponent, {
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (version) {
          localStorage['appVersion'] = version;
        }
        this.hardRefresh();
      } else {
        this.ignoreCache = true;
      }
      this.dialogRef = undefined;
    });
  }

  /**
   * Equivalent of a browser hard refresh (Ctrl+Shift+R): unregisters the service worker
   * and empties Cache Storage before reloading, so the old SW cannot serve stale
   * index.html / JS chunks / assets (i18n). Auth tokens in localStorage are kept.
   */
  async hardRefresh(): Promise<void> {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(r => r.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) {
      console.error('Hard refresh: failed to clear service worker caches', e);
    } finally {
      // Cache-busting navigation so neither the HTTP cache nor a lingering SW serves the old document
      const url = new URL(window.location.href);
      url.searchParams.set('_r', Date.now().toString());
      window.location.replace(url.toString());
    }
  }
}
