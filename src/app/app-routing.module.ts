import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RandomNumberComponent} from "./common/random-number/random-number.component";
import {CombineUserComponent} from "./common/combine-user/combine-user.component";
import {NestedTaskComponent} from "./common/nested-task/nested-task.component";
import {MoveComponent} from "./common/move/move.component";

const routes: Routes = [
  {path: 'random-number', component: RandomNumberComponent},
  {path: 'combine-user', component: CombineUserComponent},
  {path: 'nested-task', component: NestedTaskComponent},
  {path: 'move', component: MoveComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
