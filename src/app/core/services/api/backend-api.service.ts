import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

/* tslint:disable max-line-length */

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  protected URL: string = environment.apiUrl;

  protected options: Object = {
    headers: new HttpHeaders({
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VyIjoxLCJpYXQiOjE1MzIwNzM2NzIsImV4cCI6MTUzMjkzNzY3Mn0.9GxxNehMPLffSI3DYm1MmRL5RE4KyyWvpX0k2RVPiC8',
      'Content-Type': 'aplication/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * GET resource from backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @returns {Observable<any>}
   */
  get(path: string): Observable<any> {
    return this._request('GET', path, null, this.options);
  }

  /**
   * POST resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  post(path: string, body: Object): Observable<any> {
    return this._request('POST', path, JSON.stringify(body), this.options);
  }

  /**
   * PUT resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  put(path: string, body: Object): Observable<any> {
    return this._request('PUT', path, JSON.stringify(body), this.options);
  }

  /**
   * PATCH resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  patch(path: string, body: Object): Observable<any> {
    return this._request('PATCH', path, JSON.stringify(body), this.options);
  }

  /**
   * DELETE resource from backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @returns {Observable<any>}
   */
  delete(path: string): Observable<any> {
    return this._request('DELETE', path, null, this.options);
  }

  /**
   * GET Params for http requests
   * @param {Object} params - object with query params
   * @returns {HttpParams}
   */
  private getParams(params?: Object): HttpParams {
    let paramsToSend: HttpParams = new HttpParams();

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        paramsToSend = paramsToSend.append(key, value as string);
      }
    }

    return paramsToSend;
  }

  private _request(method: string, path: string, body?: string, options?: any): Observable<any> {

    if (!options) {
      options = {};
    }

    const url = `${this.URL}/${path}`;
    const params = options.params && this.getParams(options.params);

    const optionsToSend = Object.assign(options, {
      url,
      body,
      params
    });


    return Observable.create((observer) => {
      return this.http.request(method, url, optionsToSend).subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403) {
            console.log('Refresh token needed!');
          }

          console.log('err');

          observer.error(err);
        });
    });
  }
}
