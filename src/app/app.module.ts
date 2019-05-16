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



@NgModule({
  declarations: [
    AppComponent,
    TweetsComponent,
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
