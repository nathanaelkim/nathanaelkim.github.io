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
      switchMap((getResponse: any) => {
        if (getResponse.resultNumber) {
          return this.httpClient.post(`/api/result1?resultNumber=${getResponse.resultNumber}`, { input });
        } else if (getResponse.error) {
          return this.httpClient.post(`/api/result1?error=${getResponse.error}`, { input });
        } else {
          return [];
        }
      })
    ).subscribe(
      (postResponse: any) => {
        if (postResponse.resultNumber) {
          document.getElementsByClassName("resultNumber")[0].textContent = postResponse.resultNumber;
        } else if (postResponse.error) {
          document.getElementsByClassName("error")[0].textContent = postResponse.error;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Result2() {
    const input = this.form.controls.input.value;

    // GET-Request
    this.httpClient.get(`/api/result2?input=${input}`).pipe(
      switchMap((getResponse: any) => {
        if (getResponse.resultNumber) {
          return this.httpClient.post(`/api/result2?resultNumber=${getResponse.resultNumber}`, { input });
        } else if (getResponse.error) {
          return this.httpClient.post(`/api/result2?error=${getResponse.error}`, { input });
        } else {
          return [];
        }
      })
    ).subscribe(
      (postResponse: any) => {
        if (postResponse.resultNumber) {
          document.getElementsByClassName("resultNumber")[0].textContent = postResponse.resultNumber;
        } else if (postResponse.error) {
          document.getElementsByClassName("error")[0].textContent = postResponse.error;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
