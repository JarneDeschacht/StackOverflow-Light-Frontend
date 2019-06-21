import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../answer.model';

@Component({
  selector: 'app-post-answer',
  templateUrl: './post-answer.component.html',
  styleUrls: ['./post-answer.component.scss']
})
export class PostAnswerComponent implements OnInit {
  @Input() public answer: Answer;

  constructor() {}

  ngOnInit() {}
}
