import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { identity } from 'rxjs';
import { ITypeAccount } from 'src/app/shared/interface/type-account.interface';
import { TypeAccountService } from 'src/app/shared/services/type-account/type-account.service';

import { IAccountForm, IAccountValue } from '../../interface/account.interface';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.page.html',
  styleUrls: ['./form-account.page.scss'],
})
export class FormAccountPage implements OnInit {

  id: string;

  accountForm: FormGroup<IAccountForm>;

  typesAccounts: Array<ITypeAccount>;

  loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private typeAccountService: TypeAccountService
  ) {
    this.id = '';
    this.accountForm = this.accountService.buildFormAccount();
    this.typesAccounts = [];
    this.loading = false;
  }

  @HostListener('submit')
  private onSubmitAccount(): void {
    if(this.accountForm.valid) {
      this.loading = true;
      if(this.id === '') {
        this.accountService.onCreateAccount(this.accountForm.value as IAccountValue).subscribe(() => {
          this.loading = false;
          this.accountForm.reset();
        }, () => {
          this.loading = false;
          this.accountForm.markAllAsTouched();
        });
      } else {
        this.accountService.onUpdateAccount(this.id ,this.accountForm.value as IAccountValue).subscribe(() => {
          this.loading = false;
          void this.router.navigate(['home']);
        }, () => {
          this.loading = false;
          this.accountForm.markAllAsTouched();
        });
      }
    } else {
      this.accountForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.typeAccountService.getAllTypeAccount().subscribe((res) => {
      this.typesAccounts = res;
    });

    this.activatedRoute.params.subscribe((params) => {
      if(params.hasOwnProperty('id')) {
        this.id = params['id'];
        this.accountService.onGetByAccount(this.id).subscribe((res) => {
          const { alias,bank, numberAccount, typeAccount, amount } = res;
          this.accountForm.patchValue({
            alias,
            bank,
            amount,
            numberAccount: numberAccount.toString(),
            typeAccountId: typeAccount.id
          });
        });
      }
    });
  }

  trackByTypesAccounts(_index: number, item: ITypeAccount): string {
    return item.id;
  }

}
