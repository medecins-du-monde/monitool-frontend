import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  onlinePlatformCards = [
    {
      icon: 'organigram',
      content: 'HomeSections.OnlinePlatform.Cards.0'
    },
    {
      icon: 'quality',
      content: 'HomeSections.OnlinePlatform.Cards.1'
    },
    {
      icon: 'pie-chart',
      content: 'HomeSections.OnlinePlatform.Cards.2'
    },
    {
      icon: 'message',
      content: 'HomeSections.OnlinePlatform.Cards.3'
    },
    {
      icon: 'parameters',
      content: 'HomeSections.OnlinePlatform.Cards.4'
    },
  ];

  whenCards = [
    {
      title: 'HomeSections.When.Cards.0.Title',
      text: 'HomeSections.When.Cards.0.Text',
      illustration: 'assets/illustrations/20.svg'
    },
    {
      title: 'HomeSections.When.Cards.1.Title',
      text: 'HomeSections.When.Cards.1.Text',
      illustration: 'assets/illustrations/30.svg'
    },
    {
      title: 'HomeSections.When.Cards.2.Title',
      text: 'HomeSections.When.Cards.2.Text',
      illustration: 'assets/illustrations/40.svg'
    },
    {
      title: 'HomeSections.When.Cards.3.Title',
      text: 'HomeSections.When.Cards.3.Text',
      illustration: 'assets/illustrations/50.svg'
    }
  ];

  keepInMindCards = [
    {
      content: 'HomeSections.KeepInMind.Cards.0'
    }
  ];

  gettingStartedCards = [
    {
      icon: 'grid',
      content: 'HomeSections.GettingStarted.Cards.0'
    },
    {
      icon: 'clipboard',
      content: 'HomeSections.GettingStarted.Cards.1'
    },
    {
      icon: 'format-shapes',
      content: 'HomeSections.GettingStarted.Cards.2'
    },
  ];

  guidesCards = [
    {
      content: 'HomeSections.Guides.Cards.0'
    }
  ];

  otherToolsCards = [
    {
      content: 'HomeSections.OtherTools.Cards.0'
    }
  ];

  ngOnInit(): void {
    this._snackBar.open('A new version is available', 'REFRESH');

    this._snackBar._openedSnackBarRef.onAction().subscribe(() => {
      console.log('you closed the snackbar');
    })
  }
}
