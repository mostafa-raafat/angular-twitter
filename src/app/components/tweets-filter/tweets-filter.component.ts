import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-tweets-filter',
  templateUrl: './tweets-filter.component.html',
  styleUrls: ['./tweets-filter.component.scss']
})
export class TweetsFilterComponent implements OnInit, OnDestroy {

  @Output() filterTweets: EventEmitter<string> = new EventEmitter();
  @Input() tabId: string;
  @Input() loadingIcon: boolean;

  public searchValue = '';
  public searchControl = new FormControl();

  private filterSubscription: Subscription;

  constructor() { }

  /**
   * Watch Input For Changes.
   *
   * @memberof TweetsFilterComponent
   */
  ngOnInit() {
    this.filterSubscription = this.searchControl.valueChanges
    .pipe(
      // Time in milliseconds between key events.
      debounceTime(500),
      // If previous query is different from current.
      distinctUntilChanged())
    .subscribe((newValue: string) => {
      this.searchValue = newValue;
      // don't emit value if it equal to #
      if (!(this.tabId === 'hashtag' && newValue === '#')) {
        this.filterTweets.emit(newValue);
      }
    });
  }

  /**
   * Unsubscribe On Component Destroy.
   *
   * @memberof TweetsFilterComponent
   */
  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

}
