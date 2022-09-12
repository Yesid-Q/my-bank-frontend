import { Injectable, Injector } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private injector: Injector,
    private toastController: ToastController
  ) { }

  async onShowUnauthorized(): Promise<void> {
    const translateService = this.injector.get(TranslateService);
    const toast = await this.toastController.create({
      message: translateService.instant('ERRORS.UNAUTHORIZED'),
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });

    await toast.present();
  }

  async onShowCreate(field: string): Promise<void> {
    const translateService = this.injector.get(TranslateService);

    const toast = await this.toastController.create({
      message: translateService.instant('MESSAGE.CREATE', { field: translateService.instant(field)}),
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });

    await toast.present();
  }

  async onShowUpdate(field): Promise<void> {
    const translateService = this.injector.get(TranslateService);

    const toast = await this.toastController.create({
      message: translateService.instant('MESSAGE.UPDATE', { field: translateService.instant(field)}),
      duration: 2000,
      color: 'warning',
      position: 'bottom'
    });

    await toast.present();
  }
}
