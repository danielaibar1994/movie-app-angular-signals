/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ActorService } from './actor.service';

describe('ActorService', () => {
  let service: ActorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ActorService);
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
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7]
    },
  ];

  it('getList() should return data', () => {
    service.getList().subscribe((res) => {
      expect(res).toEqual(mockListData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/actors');
    expect(req.request.method).toBe('GET');
    req.flush(mockListData);
  });

  const mockDetailData = {
    id: 1,
    first_name: 'Isaak',
    last_name: 'McQuode',
    gender: 'Male',
    bornCity: 'Ciduren',
    birthdate: '24/12/1957',
    img: 'http://dummyimage.com/600x400.png/dddddd/000000',
    rating: 2.03,
    movies: [3, 7]
  };


  it('getItem() should return trasnformed data', () => {
    service.getItem('1').subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/actors/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailData);
  });



  it('createItem() should POST and return data', () => {
    service.createItem(mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/actors');
    expect(req.request.method).toBe('POST');
    req.flush(mockDetailData);
  });


  it('updateItem() should PUT and return data', () => {
    service.updateItem('1', mockDetailData).subscribe((res) => {
      expect(res).toEqual(mockDetailData);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/actors/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(mockDetailData);
  });

});
