import { Component, OnInit } from '@angular/core';
import {LogicalFramework} from 'src/app/models/logicalFramework';
import{CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-logical-frame',
  templateUrl: './logical-frame.component.html',
  styleUrls: ['./logical-frame.component.scss']
})
export class LogicalFrameComponent implements OnInit {


  logicalFrameworksList:LogicalFramework[];
  
  

  constructor() { }

  ngOnInit(): void {
    this.logicalFrameworksList=
    [
      {
      name: 'Projet de référence MdM (1er janvier 2015 - 30 juin 2016)',    
      start: new Date('2015-01-01'),
      end: new Date('2016-06-30'),
      collectionSites:["AAA","BBB"]
      },
      {
        name: 'Bailleur DFID (1 janvier 2015 au 31 mai 2016)',    
        start: new Date('2015-01-01'),
        end: new Date('2016-05-31'),
        collectionSites:["AAA","BBB"]
      },
      {
        name: 'Bailleur ECHO (1er janvier au 31 décembre 2015) - District de Bimbo & clinique mobile seulement',    
        start: new Date('2015-01-01'),
        end: new Date('2015-12-31'),
        collectionSites:["AAA","BBB"]
      }
    ];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.logicalFrameworksList, event.previousIndex, event.currentIndex);
  }

}
