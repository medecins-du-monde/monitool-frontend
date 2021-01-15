import { Component, Input } from '@angular/core';

export interface BreadcrumbItem{
  value: string;
  link?: string
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  
}
