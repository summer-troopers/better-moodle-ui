import { Renderer2 } from '@angular/core';

export default class Download {
  constructor(public renderer: Renderer2) {
  }

  downloadFile(fileData) {
    const blob = new Blob([fileData.data], {type: 'text/csv'});
    const anchor = this.renderer.createElement('a');

    anchor.download = this.getFileNameFromHttpResponse(fileData);
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
  }

  getFileNameFromHttpResponse(httpResponse) {
    const contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }
}
