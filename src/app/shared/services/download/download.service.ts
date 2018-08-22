import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadFile(fileData) {
    const blob = new Blob([fileData.data], {type: 'application/octet-stream'});
    saveAs(blob, this.getFileNameFromHttpResponse(fileData));
  }

  getFileNameFromHttpResponse(httpResponse) {
    const contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }
}
