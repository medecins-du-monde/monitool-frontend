import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { CountryListService } from 'src/app/services/country-list.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() items?: BreadcrumbItem[];
  @Input() limitSize = true;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService, public countryListService: CountryListService) {}

  ngOnInit(): void {
    if (!this.items) {
      this.subscription.add(
        this.projectService.getBreadcrumbsList.subscribe(val => {
          this.items = val;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
