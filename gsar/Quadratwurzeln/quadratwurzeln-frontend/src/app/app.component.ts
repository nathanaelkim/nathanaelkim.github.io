import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs';

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

    // GET-Request
    this.httpClient.get(`/api/result1?input=${input}`).pipe(
      switchMap((response: any) => {
        // Optional: Process the GET response if needed
        const postData = { data: response }; // Adjust the payload structure as needed
        return this.httpClient.post('/api/resultResponse1', postData);
      })
    ).subscribe((res: any) =>{
      const queryParam = res?.queryParam;
      const resultElement = document.getElementsByClassName("result")[0];
      if (resultElement) {
        resultElement.textContent = queryParam || 'No data received';
      }
    });
  }

  Result2() {
    const input = this.form.controls.input.value;

    // GET-Request
    this.httpClient.get(`/api/result2?input=${input}`).pipe(
      switchMap((response: any) => {
        // Optional: Process the GET response if needed
        const postData = { data: response }; // Adjust the payload structure as needed
        return this.httpClient.post('/api/resultResponse2', postData);
      })
    ).subscribe((res: any) =>{
      const queryParam = res?.queryParam;
      const resultElement = document.getElementsByClassName("result")[0];
      if (resultElement) {
        resultElement.textContent = queryParam || 'No data received';
      }
    });
  }
}
