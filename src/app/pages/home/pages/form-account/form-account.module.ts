import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAccountPageRoutingModule } from './form-account-routing.module';

import { FormAccountPage } from './form-account.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormAccountPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [FormAccountPage]
})
export class FormAccountPageModule {}
