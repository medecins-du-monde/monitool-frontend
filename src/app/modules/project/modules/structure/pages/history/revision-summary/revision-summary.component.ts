import { Component, OnInit, Input } from '@angular/core';
import { Revision } from 'src/app/models/revision.model';
import { pathToFileURL } from 'url';



@Component({
  selector: 'app-revision-summary',
  templateUrl: './revision-summary.component.html',
  styleUrls: ['./revision-summary.component.scss'],
})

export class RevisionSummaryComponent implements OnInit {


  @Input() revision: Revision;

  forward = [];
  backwards = [];
  output: string[] = []; 

  constructor() {}

  ngOnInit(): void {
    this.transformPatches(this.revision.backwards);
  }

  transformPatches(patches) {
    patches.forEach( patch => this.splitPatchPath(patch));
  }

  splitPatchPath(patch) {

    let outputString = "";
    let fields =  patch.path.split('/');
    console.log(fields);

    switch (patch.op) {
      case 'remove':
        outputString += 'Remove the ';
        break;
      case 'add':
        outputString += 'Add the ';
        break;
      case 'replace':
        outputString += 'Change the ';
        break;
      case 'move':
        outputString += 'Reorder the '; 
        break;
      default:
          console.log('ERROR IN REVISION SUMMARY. missing definition of: ', patch.op);
    }
    this.output.push(outputString);
  }

}
