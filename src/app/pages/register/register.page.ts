import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDocument } from 'src/app/shared/interface/document.interface';
import { DocumentService } from 'src/app/shared/services/document/document.service';
import { IRegister, IRegisterForm } from './interface/register.interface';

import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  documents: Array<IDocument>;

  loading: boolean;

  registerForm: FormGroup<IRegisterForm>;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private documentService: DocumentService
  ) {
    this.documents = [];
    this.loading = false;
    this.registerForm = this.registerService.buildFormRegister();
  }


  @HostListener('submit')
  private onSubmitRegister(): void {
    if(this.registerForm.valid) {
      this.loading = true;
      this.registerService.onRegisterUser(this.registerForm.value as IRegister).subscribe(() => {
        this.loading = false;
        void this.router.navigate(['home']);
      }, () => {
        this.registerForm.markAllAsTouched();
        this.loading = false;
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.documentService.getAllDocuments().subscribe((res) => {
      this.documents = res;
    });
  }

  trackByDocument(_index: number, item: IDocument): string {
    return item.id;
  }

}
