import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-tweets-filter',
  templateUrl: './tweets-filter.component.html',
  styleUrls: ['./tweets-filter.component.scss']
})
export class TweetsFilterComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() filterTweets: EventEmitter<string> = new EventEmitter();
  @Input() tabId: string;
  @Input() loadingIcon: boolean;

  public searchValue = '';

  private filterSubscription: Subscription;

  constructor() { }

  /**
   * Watch Input For Changes.
   *
   * @memberof TweetsFilterComponent
   */
  ngOnInit() {
    this.filterSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      // Time in milliseconds between key events.
      debounceTime(1000),
      // If previous query is different from current.
      distinctUntilChanged(),
      // Get search input.
      map((search: any) => search.target.value)
      // subscription for response
    ).subscribe((text: string) => this.filterTweets.emit(text));
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
