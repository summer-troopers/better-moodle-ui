import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { LocalStorageService } from '@shared/services/local-storage.service';
import { TOKEN_STORAGE_KEY } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  protected URL: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private localStorageServices: LocalStorageService) {
  }

  getHeaders(token) {
    return {
      headers: new HttpHeaders({
        'token': token,
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * GET resource from backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @returns {Observable<any>}
   */
  get(path: string): Observable<any> {
    return this._request('GET', path, null,
      this.getHeaders(this.localStorageServices.getLocalStorage(TOKEN_STORAGE_KEY)));
  }

  /**
   * POST resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  post(path: string, body: Object): Observable<any> {
    return this._request('POST', path, body, this.getHeaders(''));
  }

  /**
   * PUT resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  put(path: string, body: Object): Observable<any> {
    return this._request('PUT', path, body,
      this.getHeaders(this.localStorageServices.getLocalStorage(TOKEN_STORAGE_KEY)));
  }

  /**
   * PATCH resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @returns {Observable<any>}
   */
  patch(path: string, body: Object): Observable<any> {
    return this._request('PATCH', path, body,
      this.getHeaders(this.localStorageServices.getLocalStorage(TOKEN_STORAGE_KEY)));
  }

  /**
   * DELETE resource from backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @returns {Observable<any>}
   */
  delete(path: string): Observable<any> {
    return this._request('DELETE', path, null,
      this.getHeaders(this.localStorageServices.getLocalStorage(TOKEN_STORAGE_KEY)));
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

  private _request(method: string, path: string, body?: any, options?: any): Observable<any> {

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

          observer.error(err);
        });
    });
  }
}
