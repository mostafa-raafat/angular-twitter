import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url = 'https://am-twitter-scrape.herokuapp.com/';
  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      params: new HttpParams({
        fromObject: {
          pages_limit: '3',
          wait: '0',
        }
      })
    };
  }

  /**
   *  Get tweets by user or hashtag
   *
   * @param {string} key
   * @param {string} value
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  getTweets(key: string, value: string): Observable<any> {
    return this.httpClient.get(this.url + key + 's/' + value, this.httpOptions);
  }

}
