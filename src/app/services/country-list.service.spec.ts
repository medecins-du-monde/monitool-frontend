import { TestBed } from '@angular/core/testing';
import { CountryListService } from './country-list.service';
import { TranslateModule } from '@ngx-translate/core';


describe('CountryListService', () => {
  let service: CountryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ]
    });
    service = TestBed.inject(CountryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
