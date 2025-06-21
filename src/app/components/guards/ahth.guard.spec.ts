import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ahthGuard } from './ahth.guard';

describe('ahthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ahthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
