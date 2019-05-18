/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TweetsFilterComponent } from './tweets-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('TweetsFilterComponent', () => {
  let component: TweetsFilterComponent;
  let fixture: ComponentFixture<TweetsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TweetsFilterComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set filterSubscription on ngOnInit', fakeAsync(() => {
  //   const enterSpy = spyOn(component.filterTweets, 'emit').and.callThrough();
  //   const input = fixture.debugElement.nativeElement.querySelector('#search');
  //   component.ngOnInit();
  //   setInputValue('#search', 'Tommy');
  //   tick(1000);
  //   fixture.detectChanges();
  //   expect(component.searchValue).toEqual('Tommy');
  //   expect(enterSpy).toHaveBeenCalled();
  // }));

  // // must be called from within fakeAsync due to use of tick()
  // function setInputValue(selector: string, value: string) {
  //   fixture.detectChanges();
  //   tick();

  //   let input = fixture.debugElement.query(By.css(selector)).nativeElement;
  //   input.value = value;
  //   input.dispatchEvent(new Event('input'));
  //   tick();
  // }
});
