import { TestBed, inject } from '@angular/core/testing';

import { WetterService } from './wetter.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTransferService } from './datatransfer.service';

describe('WetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WetterService, HttpClientModule, DataTransferService]
    });
  });

  it('should be created', inject([WetterService], (service: WetterService) => {
    expect(service).toBeTruthy();
  }));
});
