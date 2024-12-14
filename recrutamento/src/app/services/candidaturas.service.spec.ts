import { TestBed } from '@angular/core/testing';

import { CandidaturasService } from './candidaturas.service';

describe('CandidaturasService', () => {
  let service: CandidaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
