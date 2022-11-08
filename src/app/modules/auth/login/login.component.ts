import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { base_url } from 'src/app/common/environment/environment';
import { url } from 'src/app/common/url/url';

@Component({
  selector: 'mg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http : HttpClient
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required]
  });
  }
  get info() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    console.log(this.form)
    let body = {
      "username" : this.form.value.username,
      "password" : this.form.value.password
    }
    this.http.post(base_url+url.login.url, body).subscribe(res => {
      if(res[0] != null){
        console.log(res)
      }
      else{
        console.log('username or password incorrect')
      }
    })
} 
}

