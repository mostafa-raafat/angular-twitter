/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';

import { TweetsTableComponent } from './tweets-table.component';
import { TweetsComponent } from '../tweets/tweets.component';
import { NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from 'src/app/Pipes/Date.pipe';

fdescribe('TweetsTableComponent', () => {
  let component: TweetsTableComponent;
  let fixture: ComponentFixture<TweetsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetsTableComponent, DatePipe ],
      imports: [ NgbPaginationModule, NgbTabsetModule]
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

  fit('should call paginate on ngOnChange', () => {
    const paginateSpy = spyOn(component, 'paginate').and.callThrough();
    component.ngOnChanges({prop1:  new SimpleChange('x', 'y', true)});
    expect(paginateSpy).toHaveBeenCalled();
  });
});
