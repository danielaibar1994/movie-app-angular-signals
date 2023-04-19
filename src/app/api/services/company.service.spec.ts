import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  const mockListData = [
    {
      id: 1,
      name: 'Jacobson-Dickinson',
      country: 'Colombia',
      createYear: 2010,
      employees: 81,
      rating: 4.32,
      movies: [1, 10]
    }
  ];

  it('getList() should return data', () => {
    service.getList().subscribe((res) => {
      expect(res).toEqual(mockListData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/companies');
    expect(req.request.method).toBe('GET');
    req.flush(mockListData);
  });

  const mockDetailData = {
    id: 1,
    name: 'Jacobson-Dickinson',
    country: 'Colombia',
    createYear: 2010,
    employees: 81,
    rating: 4.32,
    movies: [1, 10]
  };

  it('getItem() should return transformed data', () => {
    service.getItem('1').subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/companies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailData);
  });



  it('createItem() should POST and return data', () => {
    service.createItem(mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/companies');
    expect(req.request.method).toBe('POST');
    req.flush(mockDetailData);
  });


  it('updateItem() should PUT and return data', () => {
    service.updateItem('1', mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/companies/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(mockDetailData);
  });


});
