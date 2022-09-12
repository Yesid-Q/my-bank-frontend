import { Component, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/core/store/auth';
import { ProfileService } from './services/profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getMyInfo().subscribe();
  }

}
