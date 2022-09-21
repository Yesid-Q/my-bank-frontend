import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { IAccount } from '../../interface/account.interface';
import { ProfileService } from '../../services/profile/profile.service';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  accounts: Array<IAccount>;

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private alertService: AlertService,
    private transactionService: TransactionService
  ) {
    this.accounts = [];
  }

  ngOnInit() {
    this.profileService.getMyAccounts().subscribe((response) => {
      this.accounts = response;
    });
  }

  onNavigateForm(): void {
    void this.router.navigate(['home', 'create-account']);
  }

  trackAccounts(_index: number, item: IAccount): string {
    return item.id;
  }

  onEditAccount(event: string): void {
    void this.router.navigate(['home', 'edit-account', event]);
  }

  async onSendTransaction(event: string): Promise<void> {
    const data = await this.alertService.onSendTransaction();
    if(data !== undefined) {
      console.log({ data });
      this.transactionService.onSendTransaction(event, data);
    }
  }

  onShowTransaction(event: string): void {
    console.log(event);
  }

}
