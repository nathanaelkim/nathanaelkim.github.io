import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form = new FormGroup({
    input: new FormControl('input')
  })
  constructor(protected httpClient : HttpClient, protected  router : Router) {
  }
  Result1() {
    let body = {
      "input": this.form.controls.input.value
    };
    this.httpClient.post('/api/result1', body).subscribe()
    this.router.navigate(["/"])
  }
  Result2() {
    let body = {
      "input": this.form.controls.input.value
    };
    this.httpClient.post('/api/result2', body).subscribe()
    this.router.navigate(["/"])
  }
}
