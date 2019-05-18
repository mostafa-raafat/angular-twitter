/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';

import { TweetsTableComponent } from './tweets-table.component';
import { TweetsComponent } from '../tweets/tweets.component';
import { NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from 'src/app/Pipes/Date.pipe';

describe('TweetsTableComponent', () => {
  let component: TweetsTableComponent;
  let fixture: ComponentFixture<TweetsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TweetsTableComponent, DatePipe],
      imports: [NgbPaginationModule, NgbTabsetModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call paginate on ngOnChange', () => {
    const tweetsList: SimpleChanges = {
      tweetsList: {
        previousValue: '',
        currentValue: [{
          account: {
            fullname: 'mostafa',
            href: '/mostafa',
            id: 1,
          },
          date: '1/1/2019',
          hashtags: ['mostafa'],
          likes: 1,
          replies: 2,
          retweets: 3,
          text: 'mostafa',
        }],
        firstChange: true,
        isFirstChange: () => true
      }
    };
    spyOn(component, 'paginate').and.callThrough();
    component.ngOnChanges(tweetsList);
    expect(component.tweetsSize).toEqual(1);
    expect(component.tweetsList).toEqual(tweetsList.tweetsList.currentValue);
    expect(component.paginate).toHaveBeenCalled();
  });
});
