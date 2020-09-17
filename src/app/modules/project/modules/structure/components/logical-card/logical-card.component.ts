import { Component, OnInit, Input } from '@angular/core';
import { LogicalFramework } from 'src/app/models/logicalFramework';

@Component({
  selector: 'app-logical-card',
  templateUrl: './logical-card.component.html',
  styleUrls: ['./logical-card.component.scss']
})
export class LogicalCardComponent implements OnInit {
  @Input() logicalFramework: LogicalFramework;

  constructor() { }

  ngOnInit(): void {
  }

}
