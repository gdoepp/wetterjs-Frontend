import { TestBed, inject } from '@angular/core/testing';

import { WetterService } from './wetter.service';

describe('WetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetterService]
    });
  });

  it('should be created', inject([WetterService], (service: WetterService) => {
    expect(service).toBeTruthy();
  }));
});
