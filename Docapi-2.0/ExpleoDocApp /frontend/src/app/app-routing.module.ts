import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { MessageComponent } from './pages/message/message.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'lists/message', component: MessageComponent },
  { path: 'lists/signup', component: SignupPageComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/new-task', component: NewTaskComponent },
  { path: 'lists/edit-task', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
