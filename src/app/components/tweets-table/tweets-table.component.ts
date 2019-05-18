import { Component, Input, SimpleChanges } from '@angular/core';
import { Tweet } from '../tweets/tweet';

@Component({
  selector: 'app-tweets-table',
  templateUrl: './tweets-table.component.html',
  styleUrls: ['./tweets-table.component.scss']
})
export class TweetsTableComponent {

  @Input() tabId: string;
  @Input() searchValue: string;
  @Input() loadingIcon: boolean;
  @Input() tweetsList: Tweet[];

  public page = 1;
  public pageSize = 10;
  public tweetsSize = 0;
  public tweets: Tweet[];

  constructor() { }

  /**
   * Watch Tweets @input For changes.
   *
   * @param {SimpleChanges} changes
   * @memberof TweetsTableComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tweetsList) {
      this.tweetsSize = changes.tweetsList.currentValue.length;
      this.tweetsList = changes.tweetsList.currentValue;
      this.paginate(this.page);
    }
  }

  /**
   * Filter Tweets Based On Page Number.
   *
   * @param {number} page
   * @memberof TweetsTableComponent
   */
  paginate(page: number): void {
    if (this.tweetsSize > 0) {
      this.tweets = this.tweetsList.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize);
    } else {
      this.tweets = [];
    }
  }

}
