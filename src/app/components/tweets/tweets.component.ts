import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Tweet, TabsId } from './tweet';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})

export class TweetsComponent implements OnDestroy {

  @Input() tabId: string;

  public searchValue = '';
  public loadingIcon = false;
  public tweetsList: Tweet[] = [];

  private tweetsSubscription: Subscription;

  constructor(private api: ApiService) {}

  /**
   * Get Tweets Based On User Input.
   *
   * @param {string} value
   * @memberof TweetsComponent
   */
  searchTweets(value: string) {
    this.searchValue = value;
    this.loadingIcon = true;
    if (value !== '') {
      this.tweetsSubscription = this.api.getTweets(this.tabId, this.removeHash(this.searchValue))
      .subscribe((list: Tweet[]) => {
        this.loadingIcon = false;
        this.tweetsList = this.exactMatch(list, this.tabId);
      }, error => {
        this.loadingIcon = false;
        this.tweetsList = [];
        console.log('oops', error);
      });
    } else {
      this.loadingIcon = false;
      this.tweetsList = [];
    }
  }

  /**
   * Filter By Exact Matching.
   *
   * @param {Tweet[]} tweets
   * @param {string} tabId
   * @returns {Tweet[]}
   * @memberof TweetsComponent
   */
  exactMatch(tweets: Tweet[], tabId: string): Tweet[] {
    if (tabId === TabsId.hashtag) {
      return this.exactHashtagMatching(tweets, this.searchValue);
    } else if (tabId === TabsId.user) {
      return this.exactUserMatching(tweets, this.searchValue);
    }
  }

  /**
   * Remove Hash For API Call.
   *
   * @param {string} searchValue
   * @returns {string}
   * @memberof TweetsComponent
   */
  removeHash(searchValue: string): string {
    if (this.tabId === TabsId.hashtag && searchValue.startsWith('#')) {
      return this.searchValue.slice(1);
    } else {
      return searchValue;
    }
  }

  /**
   * Filter Users By Exact Matching.
   *
   * @param {Tweet[]} tweets
   * @param {string} searchValue
   * @returns {Tweet[]}
   * @memberof TweetsComponent
   */
  exactUserMatching(tweets: Tweet[], searchValue: string): Tweet[] {
    return tweets.filter(user => user.account.href.slice(1) === searchValue);
  }

  /**
   * Filter Hashtags By Exact Matching.
   *
   * @param {Tweet[]} tweets
   * @param {string} searchValue
   * @returns {Tweet[]}
   * @memberof TweetsComponent
   */
  exactHashtagMatching(tweets: Tweet[], searchValue: string): Tweet[] {
    return tweets.filter(user => user.hashtags.includes(searchValue));
  }

  /**
   * Unsubscribe On Component Destroy.
   *
   * @memberof TweetsComponent
   */
  ngOnDestroy() {
    if (this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
  }
}
