/* tslint:disable:no-unused-variable */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '../../Pipes/Date.pipe';
import { TweetsFilterComponent } from '../tweets-filter/tweets-filter.component';
import { TweetsTableComponent } from '../tweets-table/tweets-table.component';
import { TweetsComponent } from './tweets.component';


describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;
  let httpClient: HttpClient;

  const tweetsList = [{
    account: {
      fullname: 'twitter',
      href: '/twitter',
      id: 1,
    },
    date: '1/1/2019',
    hashtags: ['#twitter'],
    likes: 1,
    replies: 2,
    retweets: 3,
    text: 'twitter',
  }, {
    account: {
      fullname: 'python',
      href: '/python',
      id: 1,
    },
    date: '1/1/2019',
    hashtags: ['#python'],
    likes: 1,
    replies: 2,
    retweets: 3,
    text: 'python',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TweetsComponent,
        TweetsFilterComponent,
        TweetsTableComponent,
        DatePipe
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbPaginationModule
      ],
      providers: [ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create tweets component.', () => {
    expect(component).toBeTruthy();
  });

  it('should call fake api and set returned result equal to tweets list.', () => {
    component.tabId = 'user';
    component.searchValue = 'twitter';
    spyOn(httpClient, 'get').and.returnValue(of(tweetsList));
    const service: ApiService = TestBed.get(ApiService);
    service.getTweets('user', 'twitter').subscribe(
      result => expect(result).toEqual(tweetsList),
      fail
    );
    spyOn(component, 'removeHash').and.callThrough();
    spyOn(component, 'exactMatch').and.callThrough();
    component.searchTweets('twitter');
    fixture.detectChanges();
    expect(component.removeHash).toHaveBeenCalled();
    expect(component.exactMatch).toHaveBeenCalled();
    expect(component.tweetsList.length).toEqual(1);
  });

  it('should set tweets list to empty array when search value is empty', () => {
    component.searchTweets('');
    expect(component.tweetsList.length).toEqual(0);
  });

  it('should filter by exact hashtag matching when tab id set to hashtag.', () => {
    component.searchValue = 'twitter';
    spyOn(component, 'exactHashtagMatching').and.callThrough();
    component.exactMatch(tweetsList, 'hashtag');
    fixture.detectChanges();
    expect(component.exactHashtagMatching).toHaveBeenCalled();
  });

  it('should filter by exact user matching when tab id set to user.', () => {
    component.searchValue = 'twitter';
    spyOn(component, 'exactUserMatching').and.callThrough();
    component.exactMatch(tweetsList, 'user');
    fixture.detectChanges();
    expect(component.exactUserMatching).toHaveBeenCalled();
  });

  it('should filter tweets using exact user Matching.', () => {
    const searchValue = component.searchValue = 'twitter';
    const tweets = component.exactUserMatching(tweetsList, searchValue);
    expect(tweets.length).toEqual(1);
  });

  it('should filter tweets using exact hashtag matching.', () => {
    const searchValue = component.searchValue = '#twitter';
    const tweets = component.exactHashtagMatching(tweetsList, searchValue);
    expect(tweets.length).toEqual(1);
  });

  it('should remove # from search value.', () => {
    let searchValue = component.searchValue = '#twitter';
    component.tabId = 'hashtag';
    searchValue = component.removeHash(searchValue);
    expect(searchValue).toEqual('twitter');
  });

});
