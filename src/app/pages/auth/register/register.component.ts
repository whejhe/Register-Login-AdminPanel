import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  public apiUrl = environment.apiUrl || 'https://localhost'
  public avatarUrl = `${this.apiUrl}/uploads/avatars/`;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    nick: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';

  constructor(
    private authSvc: AuthService,
    private router:Router,
    ) {}

  getImages(){
  }

  register() {
    if(this.registerForm.valid) {
      const userData = {
        name: this.registerForm.get('name')?.value,
        nick: this.registerForm.get('nick')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: 'USER',
      };

      this.authSvc.registerUser(userData).subscribe(
        (response: any) => {

          this.showSucessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
          this.router.navigate(['/auth']);

        },
        (error: any) => {

          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.errorMesage = 'Ocurrio algun error durante el registro';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }


  changeVisibilityPassword() {
    try{
      const input = document.querySelector(".input__field");
      const inputIcon = document.querySelector(".icon-password");
      const inputConfirm = document.querySelector(".input-field-confirm");
      const inputConfirmIcon = document.querySelector(".icon-confirm-password");

      if(inputConfirm?.getAttribute("type") == "password"){
        inputConfirm?.setAttribute("type", "text");
        inputConfirmIcon?.setAttribute("src", "assets/img/eye.svg");
      }else{
        inputConfirm?.setAttribute("type", "password");
        inputConfirmIcon?.setAttribute("src", "assets/img/eye-off.svg");
      }

      if(input?.getAttribute("type") == "password"){
        input.setAttribute("type", "text");
        inputIcon?.setAttribute("src", "assets/img/eye.svg");
      }else{
        input?.setAttribute("type", "password");
        inputIcon?.setAttribute("src", "assets/img/eye-off.svg");
      }

    }catch(error){

    }
  }


  ngOnInit(): void {

  }

}
