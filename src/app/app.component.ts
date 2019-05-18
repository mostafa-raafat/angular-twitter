import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public tabId = 'hashtag';

  constructor() { }

  public tabChanged(index: any): void {
      this.tabId = index.nextId;
  }

}
