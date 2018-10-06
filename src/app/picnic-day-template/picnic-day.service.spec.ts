import { TestBed } from '@angular/core/testing';

import { PicnicDayService } from './picnic-day.service';

describe('PicnicDayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicnicDayService = TestBed.get(PicnicDayService);
    expect(service).toBeTruthy();
  });
});
