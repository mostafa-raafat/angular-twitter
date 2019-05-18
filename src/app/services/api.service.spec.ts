/* tslint:disable:no-unused-variable */

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { ApiService } from './api.service';

describe('Service: Api', () => {
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });

    httpClient = TestBed.get(HttpClient);
  });

  it('should create api service.', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getTweets.', async(() => {
    spyOn(httpClient, 'get').and.returnValue(of(2));
    const service: ApiService = TestBed.get(ApiService);
    service.getTweets('user', 'twitter').subscribe(
      result => expect(result).toEqual(2),
      fail
    );
  }));
});
