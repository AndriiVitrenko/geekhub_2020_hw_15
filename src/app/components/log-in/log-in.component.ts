import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClientService} from '../../services/http-client.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  form!: FormGroup;
  errors: {email?: string, password?: string} = {
    email: '',
    password: '',
  };

  constructor(private http: HttpClientService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.pattern(this.passwordRegexp), Validators.required])),
    });
  }

  submit(): void {
    const emailError = this.form.controls.email.errors;
    const passwordErrors = this.form.controls.password.errors;

    if (!emailError) {
      this.errors.email = '';
    }
    else if (emailError.hasOwnProperty('required')) {
      this.errors.email = 'Type your email here. This field has not to be empty.';
    }
    else if (emailError.hasOwnProperty('email')) {
      this.errors.email = 'Your email is incorrect. Check it again.';
    }

    if (!passwordErrors) {
      this.errors.password = '';
    }
    else if (passwordErrors.hasOwnProperty('required')) {
      this.errors.password = 'Type your password here. This field has not to be empty.';
    }
    else if (passwordErrors.hasOwnProperty('pattern')) {
      this.errors.password = 'Password must include numbers, capital and lowercase letters and be at least 8 symbols length.';
    }

    if (this.errors.password === '' && this.errors.email === '') {
      this.http.login(`Basic ${btoa(this.form.controls.email + ':' + this.form.controls.password)}`)
          .subscribe(
              data => console.log(data),
              error => console.error(error),
          );
    }
  }
}
