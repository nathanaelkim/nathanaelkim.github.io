import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { AboutComponent } from "./about/about.component";

let timeout = false;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'nathanaelkim-portfolio';

  loadPage(event: { keyCode: number; }) {
    startTimer({ seconds: 5 });
    const wrapper: HTMLElement | null = document.querySelector(".words");
    const words = document.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    const currentWord: HTMLSpanElement | null = wrapper ? wrapper.querySelector("span.current") : null;
    const wordsWidths: number[] = Array.from(words).map((word: HTMLSpanElement) => word.offsetWidth);
    const maxWordsWidth: number = Math.max(...wordsWidths);
    const CURRENT_CLASS: string = "current";
    const NEXT_CLASS: string = "next";
    if (wrapper && currentWord) {
      wrapper.style.setProperty("--width", `${currentWord.offsetWidth}px`);
      wrapper.style.setProperty("--width-mobile", `${maxWordsWidth} px`)
     setInterval(() => {
      const currentWord: HTMLSpanElement | null = wrapper.querySelector("span.current");
      const nextWord: HTMLSpanElement | null = wrapper.querySelector("span.next");
      const nextNextWord: HTMLElement | null = nextWord && nextWord.nextElementSibling
        ? nextWord.nextElementSibling as HTMLElement
        : wrapper.firstElementChild as HTMLElement;
        if (currentWord && nextWord && nextNextWord) {
          currentWord.classList.remove(CURRENT_CLASS);
          nextWord.classList.remove(NEXT_CLASS);
          nextWord.classList.add(CURRENT_CLASS);
          nextNextWord.classList.add(NEXT_CLASS);
          wrapper.style.setProperty("--width", `${nextWord.offsetWidth}px`);
        }
     }, 1500)
    }
    if (event.keyCode == 13 && timeout == true) {
      openPage(0);
    }else {
    }
  }
}
  function startTimer({ seconds }: { seconds: number; }): void {
    const timer = setInterval(() => {
      seconds--;
    
      if (seconds < 0) {
        clearInterval(timer);
        timeout = true;
        return startTimer({ seconds: 5 });
      }
    }, 1000);
  }
  function openPage(nextPage: Number) {
    const routes: Routes = [

  ];
}