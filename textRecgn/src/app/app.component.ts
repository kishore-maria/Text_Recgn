import { Component, OnInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  recognitionProgressElement;

  recognitionTextElement;

  originalImageElement;

  labeledImageElement;

  recognitionConfidenceInputElement;

  recognitionImageInputElement;

  constructor() { }

  ngOnInit() {
    this.recognitionImageInputElement = document.querySelector(
      '#recognition-image-input',
    );
    this.recognitionConfidenceInputElement = document.querySelector(
      '#recognition-confidence-input',
    );
    this.recognitionProgressElement = document.querySelector('#recognition-progress');
    this.recognitionTextElement = document.querySelector('#recognition-text');
    this.originalImageElement = document.querySelector('#original-image');
    this.labeledImageElement = document.querySelector('#labeled-image');

  }

  fileChange(event) {
    const file = event.target.files[0];

    console.log(file);

    return Tesseract
      .recognize(file, 'eng').then(async (res: any) => {
        const data = res.data;
        console.log(data);
        const paragraphsElements = data.paragraphs.map(({ text }) => {
          const p = document.createElement('p');
          p.textContent = text;
          return p;
        });
        this.recognitionTextElement.append(...paragraphsElements);

        const setImageSrc = (image: HTMLImageElement, imageFile: File) => {
          return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
              if (typeof fr.result !== 'string') {
                return reject(null);
              }
              image.src = fr.result;
              return resolve();
            };
            fr.onerror = reject;
            fr.readAsDataURL(imageFile);
          });
        };

        const originalImage = document.createElement('img');
        await setImageSrc(originalImage, file);
        const labeledImage = originalImage.cloneNode(true);

        const wordsElements = data.words
          .filter(({ confidence }) => {
            return confidence > parseInt(this.recognitionConfidenceInputElement.value, 10);
          })
          .map(word => {
            const div = document.createElement('div');
            const { x0, x1, y0, y1 } = word.bbox;
            div.classList.add('word-element');
            Object.assign(div.style, {
              top: `${y0}px`,
              left: `${x0}px`,
              width: `${x1 - x0}px`,
              height: `${y1 - y0}px`,
              border: '1px solid black',
              position: 'absolute',
            });
            return div;
          });
        this.originalImageElement.appendChild(originalImage);
        this.labeledImageElement.appendChild(labeledImage);
        this.labeledImageElement.append(...wordsElements);

      // })
      // .progress(({ progress, status }) => {
      //   if (!progress || !status || status !== 'recognizing text') {
      //     return null;
      //   }
      //   const p = (progress * 100).toFixed(2);
      //   this.recognitionProgressElement.textContent = `${status}: ${p}%`;
      //   this.recognitionProgressElement.value = p;
      });
  }
}
