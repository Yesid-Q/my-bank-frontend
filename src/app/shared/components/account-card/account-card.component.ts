import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCardComponent {

  @Input() id: string;

  @Input() amount: number;

  @Input() alias: string;

  @Input() bank: string;

  @Input() numberAccount: number;

  @Input() typeAccount: string;

  @Input() disabled: boolean;

  @Output() emitSendButton: EventEmitter<string>;

  @Output() emitListButton: EventEmitter<string>;

  @Output() emitEditButton: EventEmitter<string>;

  constructor() {
    this.id = '';
    this.amount = null;
    this.alias = '';
    this.bank = '';
    this.numberAccount = null;
    this.typeAccount = '';
    this.disabled = false;
    this.emitSendButton = new EventEmitter();
    this.emitListButton = new EventEmitter();
    this.emitEditButton = new EventEmitter();
  }

}
