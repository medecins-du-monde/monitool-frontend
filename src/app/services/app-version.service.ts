import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { firstValueFrom, interval, Subscription } from 'rxjs';
import { RefreshModalComponent } from '../components/refresh-modal/refresh-modal.component';
import { SwUpdate } from '@angular/service-worker';
import { map, take } from 'rxjs/operators';

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
    this.fetchLatestVersion().subscribe(version => {
      if (!localStorage['appVersion'] || version !== localStorage['appVersion']) {
        this.showDialog(version);
      }
    });
    this.subscription.add(
      interval(60000).subscribe(() => {
        this.fetchLatestVersion().subscribe(version => {
          if (!localStorage['appVersion'] || version !== localStorage['appVersion']) {
            this.showDialog(version);
          }
        });
      })
    );
  }

  // 'ngsw-bypass' skips the Angular service worker (see ngsw-worker.js's onFetch) and
  // 'Cache-Control: no-cache' skips the browser HTTP cache, so this always hits the network —
  // otherwise /assets/version.txt gets served from the SW's own cached 'assets' group,
  // silently defeating this check.
  private fetchLatestVersion() {
    return this.http.get('/assets/version.txt', {
      params: { 'ngsw-bypass': 'true' },
      headers: { 'Cache-Control': 'no-cache' },
    }).pipe(map(data => `${data}`), take(1));
  }

  showDialog(version?: string): void{
    if (this.ignoreCache || this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(RefreshModalComponent, {
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (version) {
          localStorage['appVersion'] = version;
        }
        if (this.swUpdate.isEnabled) {
          try {
            await this.swUpdate.activateUpdate();
          } catch {
            // no pending SW update to activate (e.g. version.txt-only trigger) — reload anyway
          }
        }
        window.location.reload();
      } else {
        this.ignoreCache = true;
      }
      this.dialogRef = undefined;
    });
  }

  /**
   * Stores the latest known version in localStorage without prompting the user,
   * so a caller-initiated reload (e.g. a manual "refresh cache" action) doesn't
   * immediately re-trigger the "new version available" dialog on the next load.
   */
  async syncStoredVersion(): Promise<void> {
    try {
      const version = await firstValueFrom(this.fetchLatestVersion());
      localStorage['appVersion'] = version;
    } catch {
      localStorage.removeItem('appVersion');
    }
  }
}
