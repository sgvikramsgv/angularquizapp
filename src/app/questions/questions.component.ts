import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public name: string="";
  public questionList : any=[];
  public currentQuestion: number = 0;
  public points:number = 0;
  public counter:number=60;
  public correctAnswers:number=0;
  public incorrectAnswers:number=0;
  public interval$:any;
  public progress:string="0";
  public isCompleted : boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startTimer();
  }
  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{this.questionList = res.questions;});
    
  }

  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  selectedAnswer(selectedQues:number, option:any){

    if(selectedQues === this.questionList.length){
      this.isCompleted = true;
      this.stopTimer();
    }
    if(option.correct){
      this.points+=10;
      this.correctAnswers++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetTimer();
        this.getProgress();
      }, 500);
      
    } else{
      this.points-=10;
      this.incorrectAnswers++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetTimer();
        this.getProgress();
      }, 500);
      
    }
  }

  startTimer(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter==0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopTimer(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetTimer(){
    this.stopTimer();
    this.counter=60;
    this.startTimer();
  }
  resetQuiz(){
    this.resetTimer();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgress(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
