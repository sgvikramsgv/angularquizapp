import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path:"", redirectTo:'landing', pathMatch:"full"},
  {path:"landing", component:LandingComponent},
  {path:"questions", component:QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
