import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
