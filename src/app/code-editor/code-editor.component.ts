import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit  {
  @ViewChild('editor', { static: true }) editor!: ElementRef;

  code: any = 'javascript';
  language: string = 'javascript';
  codeOutput: string = '';

  constructor() {setTimeout(() => {
    console.log(typeof this.code);
  }, 1000); }

  ngOnInit(): void {

    this.language = 'language'
    this.code = `console.log('Hello, world!');`;
  }

  ngAfterViewInit() {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode(`ace/mode/${this.language}`);
    editor.setValue(this.code);
  }

  runCode() {
    fetch('http://localhost:3000/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: this.language,
        code: this.code
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          this.codeOutput = data.output;
        } else {
          this.codeOutput = `Ошибка: ${data.error}`;
        }
      })
      .catch(error => {
        this.codeOutput = 'Ошибка при отправке запроса.';
      });
  }

  onLanguageChange(newLanguage: any): void {
    console.log(newLanguage)
    this.language = newLanguage;
  }

}
