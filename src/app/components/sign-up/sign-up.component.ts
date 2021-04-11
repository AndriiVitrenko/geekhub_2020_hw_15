import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  errors = {
    email: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[а-яйїьґa-z']+$/i)])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[а-яйїьґa-z']+$/i)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\+\d{6,15}$/)])),
    });
  }

  submit(): void {
    const {email, password, name, surname, phone} = this.form.controls;

    if (!email.errors) {
      this.errors.email = '';
    }
    else if (email.errors.hasOwnProperty('required')) {
      this.errors.email = 'Type your email here. This field has not to be empty.';
    }
    else if (email.errors.hasOwnProperty('email')) {
      this.errors.email = 'Your email is incorrect. Check it again.';
    }

    if (!password.errors) {
      this.errors.password = '';
    }
    else if (password.errors.hasOwnProperty('required')) {
      this.errors.password = 'Type your password here. This field has not to be empty.';
    }
    else if (password.errors.hasOwnProperty('pattern')) {
      this.errors.password = 'Your password must contain of numbers, capitals and lowercase letters';
    }

    if (!name.errors) {
      this.errors.name = '';
    }
    else if (name.errors.hasOwnProperty('required')) {
      this.errors.name = 'Type your name here. This field has not to be empty.';
    }
    else if (name.errors.hasOwnProperty('pattern')) {
      this.errors.name = 'Your name must contain of Ukrainian, Russian or English letters.';
    }

    if (!surname.errors) {
      this.errors.surname = '';
    }
    else if (surname.errors.hasOwnProperty('required')) {
      this.errors.surname = 'Type your surname here. This field has not to be empty.';
    }
    else if (surname.errors.hasOwnProperty('pattern')) {
      this.errors.surname = 'Your surname must contain of Ukrainian, Russian or English letters.';
    }

    if (!phone.errors) {
      this.errors.phone = '';
    }
    else if (phone.errors.hasOwnProperty('required')) {
      this.errors.phone = 'Type your phone here. This field has not to be empty.';
    }
    else if (phone.errors.hasOwnProperty('pattern')) {
      this.errors.phone = 'Your phone must start with "+" and contain 6-15 numbers.';
    }
  }
}
