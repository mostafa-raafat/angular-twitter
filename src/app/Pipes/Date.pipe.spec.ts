/* tslint:disable:no-unused-variable */

import { DatePipe } from './Date.pipe';

describe('Pipe: Date', () => {

  const pipe = new DatePipe();

  it('create an instance from DatePipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove time from date value', () => {
    expect(pipe.transform('2:46 PM - 29 Dec 2016', '')).toBe('29 Dec 2016');
  });

});
