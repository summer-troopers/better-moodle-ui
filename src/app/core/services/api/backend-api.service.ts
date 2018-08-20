import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';
import { TOKEN_STORAGE_KEY } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  protected URL: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private localStorageServices: LocalStorageService) {
  }

  private getHeaders() {
    return new HttpHeaders({
      token: this.localStorageServices.getLocalStorage(TOKEN_STORAGE_KEY),
    });
  }

  private getParams(params: any) {
    if (!params) { params = {}; }

    const mainParamNames = ['limit', 'offset', 'contains'];

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit || 0);
    httpParams = httpParams.set('offset', params.offset || 0);
    httpParams = httpParams.set('contains', params.contains || '');

    const otherPossibleParamNames = [
      'teacherId', 'studentId',
      'groupId', 'courseId', 'specialtyId',
      'labReportId', 'labTaskId', 'labCommentId'
    ];

    otherPossibleParamNames.forEach(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    // Error checking
    const otherParams = Object.keys(params).filter((key) => {
      const mainFound = mainParamNames.find(name => name === key);
      const otherFound = otherPossibleParamNames.find(name => name === key);

      return (!mainFound && !otherFound);
    });

    if (otherParams.length > 0) {
      console.error('Unknown query params set: ' + otherParams);
    }
    // End error checking

    return httpParams;
  }

  private getOptions(params): any {
    return {
      headers: this.getHeaders(),
      observe: 'response',
      params: this.getParams(params),
    };
  }

  /**
   * GET resource from backend
   * @param {string} path - relative path to resource (ex.: 'courses')
   * @param {Object} params - an object containing the query params (ex: 'offset')
   * @description 'limit' and 'offset' have default values of 0, 'contains' - ''
   * @returns {Observable<any>}
   */
  get(path: string, params?: Object): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.URL}/${path}`, this.getOptions(params)) as Observable<HttpResponse<any>>;
  }

  /**
   * POST resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @param {Object} params - an object containing the query params (ex: 'offset')
   * @returns {Observable<any>}
   */
  post(path: string, body: Object, params?: Object): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.URL}/${path}`, body, this.getOptions(params)) as Observable<HttpResponse<any>>;
  }

  /**
   * PUT resource to backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} body - object to be sent to the backend
   * @param {Object} params - an object containing the query params (ex: 'offset')
   * @returns {Observable<any>}
   */
  put(path: string, body: Object, params?: Object): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.URL}/${path}`, body, this.getOptions(params)) as Observable<HttpResponse<any>>;
  }

  /**
   * DELETE resource from backend
   * @param {string} path -  relative path to resource (ex.: 'courses')
   * @param {Object} params - an object containing the query params (ex: 'offset')
   * @returns {Observable<any>}
   */
  delete(path: string, params?: Object): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.URL}/${path}`, this.getOptions(params)) as Observable<HttpResponse<any>>;
  }

}


