import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})

export class TweetsComponent implements OnInit, OnDestroy {

  @Input() searchKey: string;
  @ViewChild('searchInput') searchInput: ElementRef;

  public searchValue = '';
  public page = 1;
  public pageSize = 10;
  public tweetsSize = 0;
  public loadingTweets = false;
  public tweets: any[];
  public tweetsList: any[];

  private tweetsSubscription: Subscription;
  private filterSubscription: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.filterSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      // Time in milliseconds between key events.
      debounceTime(500),
      // If previous query is different from current.
      distinctUntilChanged(),
      // Get search input.
      map((search: any) => search.target.value)
      // subscription for response
    ).subscribe((text: string) => this.searchTweets(text));
  }

  /**
   * Filter Data From The Table.
   */
  searchTweets(value: string) {
    this.loadingTweets = true;
    if (value !== '') {
      this.tweetsSubscription = this.api.getTweets(this.searchKey, value)
      .subscribe((list: any) => {
        this.loadingTweets = false;
        this.tweetsSize = list.length;
        this.tweetsList = list;
        this.paginate(this.page);
      });
    } else {
      this.tweets = [];
      this.tweetsList = [];
      this.tweetsSize = 0;
    }

  }

  exactUserMatching(tweets, key): any {
    tweets.filter(user => user.account.fullname === key);
  }

  exactHashtagMatching(tweets, key): any {
    tweets.filter(user => user.hashtags === key);
  }

  paginate(page: number): void {
    this.tweets = this.tweetsList.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize);
  }


  /**
   * Unsubscribe From Observables.
   */
  ngOnDestroy() {
    if (this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
    this.filterSubscription.unsubscribe();
  }
}
