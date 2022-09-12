import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

interface ITransaction {
    amount: number;
    numberAccount: string;
    password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  async onSendTransaction(): Promise<ITransaction|undefined> {
    const alert = await this.alertController.create({
      header: this.translateService.instant('TITLES.SEND_MONEY'),
      backdropDismiss: false,
      inputs: [
        {
          label: this.translateService.instant('FIELDS.AMOUNT'),
          placeholder: this.translateService.instant('FIELDS.AMOUNT'),
          id: 'amount',
          type: 'number',
        },
        {
          label: this.translateService.instant('FIELDS.NUMBER_ACCOUNT'),
          placeholder: this.translateService.instant('FIELDS.NUMBER_ACCOUNT'),
          id: 'numberAccount',
          type: 'text',
        },
        {
          label: this.translateService.instant('FIELDS.PASSWORD'),
          placeholder: this.translateService.instant('FIELDS.PASSWORD'),
          id: 'password',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: this.translateService.instant('FIELDS.SEND'),
          role: 'confirm',
        },
        {
          text: this.translateService.instant('FIELDS.CANCEL'),
          role: 'cancel',
        },
      ],
    });

    await alert.present();

    const { data, role } = await alert.onWillDismiss();

    if (role === 'cancel') {
      return undefined;
    }

    const { 0: amount, 1: numberAccount, 2: password } = data.values;

    return { amount: Number(amount), numberAccount, password };
  }
}
