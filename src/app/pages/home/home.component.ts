import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDo } from 'src/app/model/to_do.model';
import { ToDoService } from 'src/app/services/to-do.service';
import { IonInput, ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toDos: Array<ToDo> = [];
  currentDescription: String = "";

  constructor(
    private toDoService: ToDoService,
  ) {
    this.toDos = this.toDoService.ToDos;
  }
  ngOnInit(): void {
  }

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev: any) {
    const value = ev.target!.value;
    if (value != null && value != "" && value != undefined) {
      this.createTodo(value);
      ev.target.value = "";
    }
  }

 createTodo(description: String) {
    this.toDoService.addTodo(description);
    this.toDos = this.toDoService.getAllTodos();
    this.currentDescription = "";
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
}
