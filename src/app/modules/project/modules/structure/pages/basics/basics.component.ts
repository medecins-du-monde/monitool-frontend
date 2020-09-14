import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { themes } from 'src/app/constants/themes';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

  basicsForm: FormGroup;

  thematics: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicsForm = this.fb.group({
      country: ['', Validators.required],
      name: ['', Validators.required],
      thematics: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      private: [false, Validators.required]
    });
    themes.forEach(theme => {
      this.thematics.push(theme.shortName.fr + ': ' + theme.name.fr);
    });
  }

  onThematicRemoved(thematic: string) {
    const thematics = this.basicsForm.controls.thematics.value as string[];
    this.removeFirst(thematics, thematic);
    this.basicsForm.controls.thematics.setValue(thematics);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
