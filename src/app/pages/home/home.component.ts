import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDo } from 'src/app/model/to_do.model';
import { ToDoService } from 'src/app/services/to-do.service';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { ModalUpdateToDoComponent } from 'src/app/components/modal-update-to-do/modal-update-to-do.component';
import { TokenService } from 'src/app/services/token.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toDos: Array<ToDo> = [];
  currentDescription: String = "";
  updateDescription: String = "";

  constructor(
    private toDoService: ToDoService,
    private userService: UsersService,
    private tokenService: TokenService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {

  }
  async ngOnInit(): Promise<void> {
    (await this.toDoService.getUserToDos(this.userService.getEmail()!))
    .subscribe(data => {
      this.toDos = data;
    });
  }
  onInput(ev: any) {
    const value = ev.target!.value;
    if (value != null && value != "" && value != undefined) {
      this.createTodo(value);
      ev.target.value = "";
    }
  }

 async createTodo(description: String) {
    this.toDoService.addTodo(description);
     (await this.toDoService.getUserToDos(this.userService.getEmail()!)).subscribe(data => {
      this.toDos = data;
     })
    this.currentDescription = "";
  }

  async deleteTodo(toDo: ToDo) {
    (await this.toDoService.deleteTodo(toDo._id)).subscribe(async () => {
      (await this.toDoService.getUserToDos(this.userService.getEmail()!))
      .subscribe(data => {
        this.toDos = data;
      });
    });
  }

  async updateToDoStatus(toDo: ToDo) {
    toDo.completed = !toDo.completed;
    toDo.updated_at = new Date(Date.now());
    (await this.toDoService.updateTodoDescription(toDo._id, toDo)).subscribe(data => {
      toDo = data;
    });
  }
  async updateTodoDescription(toDo: ToDo) {
    const modal = await this.modalCtrl.create({
      component: ModalUpdateToDoComponent,
      componentProps: {updatedDescription: toDo.description}
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      toDo.description = data;
      toDo.updated_at = new Date(Date.now());
      (await this.toDoService.updateTodoDescription(toDo._id, toDo)).subscribe(data => {
        toDo = data;
      });
    }
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);


  }
}
