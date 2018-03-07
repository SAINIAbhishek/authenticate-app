import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateGuardService } from './authenticate-guard.service';

describe('AuthenticateGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateGuardService]
    });
  });

  it('should be created', inject([AuthenticateGuardService], (service: AuthenticateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
