import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  options: any;

  constructor(private toaster: ToastrService) {
    this.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '3000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    };
  }

  success(message: string, options = this.options, title?: string) {
    this.toaster.success(message, title, options);
  }

  error(message: string, options = this.options, title?: string) {
    this.toaster.error(message, title, options);
  }

  warning(message: string, options = this.options, title?: string) {
    this.toaster.warning(message, title, options);
  }

  info(message: string, options = this.options, title?: string) {
    this.toaster.info(message, title, options);
  }
}
