import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title:string = '';

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length - 1;
    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextQuestion();
  }

  async nextQuestion(){
    this.questionIndex+=1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswers:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quiz_questions.results[finalAnswers as keyof typeof quiz_questions.results];
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, index, arr) => {
      if(arr.filter(item => item === previous).length >
         arr.filter(item => item === current).length){
          return previous;
      }else{
        return current;
      }
    })

    return result;
  }
}
