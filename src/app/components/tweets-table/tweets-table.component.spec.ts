/* tslint:disable:no-unused-variable */
import { SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from 'src/app/Pipes/Date.pipe';
import { TweetsTableComponent } from './tweets-table.component';


describe('TweetsTableComponent', () => {
  let component: TweetsTableComponent;
  let fixture: ComponentFixture<TweetsTableComponent>;
  const tweetsList: SimpleChanges = {
    tweetsList: {
      previousValue: '',
      currentValue: [{
        account: {
          fullname: 'twitter',
          href: '/twitter',
          id: 1,
        },
        date: '1/1/2019',
        hashtags: ['twitter'],
        likes: 1,
        replies: 2,
        retweets: 3,
        text: 'twitter',
      }],
      firstChange: true,
      isFirstChange: () => true
    }
  };

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

  it('should create tweets table component.', () => {
    expect(component).toBeTruthy();
  });

  it('should call paginate on ngOnChange.', () => {
    spyOn(component, 'paginate').and.callThrough();
    component.ngOnChanges(tweetsList);
    expect(component.tweetsSize).toEqual(1);
    expect(component.tweetsList).toEqual(tweetsList.tweetsList.currentValue);
    expect(component.paginate).toHaveBeenCalled();
  });
});
