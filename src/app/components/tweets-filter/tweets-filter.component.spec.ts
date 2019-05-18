/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TweetsFilterComponent } from './tweets-filter.component';
import { By } from '@angular/platform-browser';


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

  it('should create tweets filter component.', () => {
    expect(component).toBeTruthy();
  });

  it('should watch input for changes and send them back to parent.', fakeAsync(() => {
    const enterSpy = spyOn(component.filterTweets, 'emit').and.callThrough();
    const input = fixture.debugElement.query(By.css('#search')).nativeElement;
    input.value = 'twitter';
    input.dispatchEvent(new Event('input'));
    component.ngOnInit();
    tick(1000);
    expect(component.searchValue).toEqual('twitter');
    expect(enterSpy).toHaveBeenCalled();
  }));

});
