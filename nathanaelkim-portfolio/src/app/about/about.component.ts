import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  form = new FormGroup({
    name: new FormControl(''),
    mail: new FormControl(''),
    message: new FormControl('')
  })
  Send() {

  }
}
