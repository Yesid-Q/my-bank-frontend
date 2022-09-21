import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankCardComponent {

  @Input() title: string;

  constructor() {
    this.title = '';
  }

}
