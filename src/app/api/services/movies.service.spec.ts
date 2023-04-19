import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { MoviesRepository } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MoviesRepository);
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
      title: 'Dancing Lady',
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: ['Comedy', 'Musical', 'Romance'],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6]
    }
  ];

  it('getList() should return data', () => {
    service.getList().subscribe((res) => {
      expect(res).toEqual(mockListData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockListData);
  });



  const mockDetailData = {
    id: 1,
    title: 'Dancing Lady',
    poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
    genre: ['Comedy', 'Musical', 'Romance'],
    year: 2006,
    duration: 161,
    imdbRating: 8.27,
    actors: [4, 5, 6]
  };

  it('getItem() should return trasnformed data', () => {
    service.getItem('1').subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailData);
  });



  it('createItem() should POST and return data', () => {
    service.createItem(mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/movies');
    expect(req.request.method).toBe('POST');
    req.flush(mockDetailData);
  });


  it('updateItem() should PUT and return data', () => {
    service.updateItem('1', mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/movies/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(mockDetailData);
  });

});





