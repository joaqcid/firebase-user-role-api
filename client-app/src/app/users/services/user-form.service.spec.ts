import { TestBed } from '@angular/core/testing';

import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFormService = TestBed.get(UserFormService);
    expect(service).toBeTruthy();
  });
});
