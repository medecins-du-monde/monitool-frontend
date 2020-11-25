import { Component, OnInit, Input } from '@angular/core';
import { Revision } from 'src/app/models/revision.model';



@Component({
  selector: 'app-revision-summary',
  templateUrl: './revision-summary.component.html',
  styleUrls: ['./revision-summary.component.scss'],
})

export class RevisionSummaryComponent implements OnInit {


  @Input() revision: Revision;

  forward = [];
  backwards = [];

  constructor() {}

  ngOnInit(): void {
    this.transformPatches(this.revision.forwards);
  }

  transformPatches(patches) {
  }

  splitPatchPath(patch) {
    return patch.path.split("/");
  }

}
