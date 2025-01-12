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
  protected  verlauefe : any [] = [];
  constructor(protected httpClient : HttpClient, protected  router : Router) {
  }
  showVerlauf() {
    this.httpClient.get<any>('/api/showResults').subscribe((res) => {
      Object.keys(res).forEach((key) => {
        this.verlauefe.push({
          "input": res[key].input,
          "result": res[key].result
        })
      })
    })
  }
  Result1() {
    const input = this.form.controls.input.value;
    this.httpClient.get(`/api/result1?input=${input}`).subscribe();
  }
  Result2() {
    const input = this.form.controls.input.value;
    this.httpClient.get(`/api/result1?input=${input}`).subscribe();
  }
}
