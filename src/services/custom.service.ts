import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  constructor(private http: HttpClient) {}
  getProducts(
    limit: number = 10,
    offset: number = 0,
    search: string = ''
  ): Observable<any> {
    const formData = new FormData();
    formData.append('method', '_listProductPaginateNew');
    formData.append('limit', limit.toString());
    formData.append('offset', offset.toString());
    if (search && search != '') {
      formData.append('search', search);
    }

    const headers = new HttpHeaders({
      'Content-Type':
        'multipart/form-data; boundary=<calculated when request is sent>',
    });

    return this.http.post('/api/uat/index.php/catlog/api/product', formData);
  }
}
