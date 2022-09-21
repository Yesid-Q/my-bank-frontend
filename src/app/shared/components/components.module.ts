import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


import { BankCardComponent } from './bank-card/bank-card.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    BankCardComponent,
    AccountCardComponent
  ],
  exports: [
    BankCardComponent,
    AccountCardComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ],
})
export class ComponentsModule {}
