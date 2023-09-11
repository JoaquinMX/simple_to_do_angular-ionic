import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-update-to-do',
  template: "{{updatedDescription}}",
  templateUrl: './modal-update-to-do.component.html',
  styleUrls: ['./modal-update-to-do.component.css']
})
export class ModalUpdateToDoComponent {
  @Input("updatedDescription")
  updatedDescription!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.updatedDescription, 'confirm');
  }

  onInput($event: any) {
    const value = $event.target!.value;
    if (value != null && value != "" && value != undefined) {
      this.updatedDescription = $event.target.value;
    }
  }
}
