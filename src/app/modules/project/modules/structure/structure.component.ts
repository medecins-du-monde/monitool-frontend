import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.inBigPage.next(false);
  }

}
