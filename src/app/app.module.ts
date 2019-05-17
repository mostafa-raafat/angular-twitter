import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { ApiService } from './services/api.service';
import { DatePipe } from './Pipes/Date.pipe';
import { TweetsTableComponent } from './components/tweets-table/tweets-table.component';
import { TweetsFilterComponent } from './components/tweets-filter/tweets-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    TweetsComponent,
    TweetsTableComponent,
    TweetsFilterComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbTabsetModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
