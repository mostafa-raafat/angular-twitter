/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { TweetsComponent } from './tweets.component';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '../../Pipes/Date.pipe';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

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

  it('should set hashtagSubscription and listData', () => {
    const apiService = fixture.debugElement.injector.get(ApiService);
    const httpCommonResponse = [{ name: 'mostafa' }];
    const spyService = spyOn(apiService, 'getTweets').and.callFake(() => {
      return of(httpCommonResponse);
    });
    component.ngOnInit();
    expect(component.listData).toBeDefined();
    expect(component.hashtagSubscription).toBeDefined();
    component.ngOnDestroy();
  });

  it('should clear searchKey after call onSearchClear', () => {
    component.searchKey = 'mostafa';
    component.listData = new MatTableDataSource([{ name: 'mostafa' }]);
    const applyFilterSpy = spyOn(component, 'applyFilter').and.callThrough();
    component.onSearchClear();
    expect(component.searchKey).toEqual('');
    expect(applyFilterSpy).toHaveBeenCalled();
    component.ngOnDestroy();
  });

  it('should change datalist.filter after call applyFilter', () => {
    component.searchKey = 'mostafa';
    component.listData = new MatTableDataSource([{ name: 'mostafa' }]);
    component.applyFilter();
    expect(component.listData.filter).toEqual('mostafa');
    component.ngOnDestroy();
  });

});
