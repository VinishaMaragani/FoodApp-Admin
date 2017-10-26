import { TestBed, inject } from '@angular/core/testing';

import { AppSttinsService } from './app-sttins.service';

describe('AppSttinsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSttinsService]
    });
  });

  it('should be created', inject([AppSttinsService], (service: AppSttinsService) => {
    expect(service).toBeTruthy();
  }));
});
