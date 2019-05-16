import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-tweets-filter',
  templateUrl: './tweets-filter.component.html',
  styleUrls: ['./tweets-filter.component.scss']
})
export class TweetsFilterComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput: ElementRef;

  public searchValue = '';

  private filterSubscription: Subscription;

  constructor() { }

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
   * Unsubscribe From Observables.
   */
  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

}
