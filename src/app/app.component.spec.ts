import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { DatePipe } from './Pipes/Date.pipe';
import { TweetsTableComponent } from './components/tweets-table/tweets-table.component';
import { TweetsFilterComponent } from './components/tweets-filter/tweets-filter.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TweetsComponent,
        TweetsTableComponent,
        TweetsFilterComponent,
        DatePipe
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbPaginationModule,
        NgbTabsetModule
      ]
    }).compileComponents();
  }));

  it('should create the app component.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
