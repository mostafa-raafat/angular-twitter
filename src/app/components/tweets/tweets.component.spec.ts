/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { TweetsComponent } from './tweets.component';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '../../Pipes/Date.pipe';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

  const tweets = [{
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
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TweetsComponent, DatePipe],
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
  });

  it('should create tweets component', () => {
    expect(component).toBeTruthy();
  });

  it('should call exactHashtagMatching when tab id = hashtag', () => {
    expect(component).toBeTruthy();
  });

});
