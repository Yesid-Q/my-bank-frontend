import { Component, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/core/store/auth';
import { ITransaction } from '../../interface/transaction.interface';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transactions: Array<ITransaction>;

  constructor(
    public authStore: AuthStore,
    private transactionService: TransactionService
  ) {
    this.transactions = [];
  }

  ngOnInit() {
    this.transactionService.onGetTransaction().subscribe((response) => {
      this.transactions = response;
    });

  }

  trackByTransactions(_index: number, item: any): string {
    return item.id;
  }

}
