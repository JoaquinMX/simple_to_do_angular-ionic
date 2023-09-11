import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateToDoComponent } from './modal-update-to-do.component';

describe('ModalUpdateToDoComponent', () => {
  let component: ModalUpdateToDoComponent;
  let fixture: ComponentFixture<ModalUpdateToDoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUpdateToDoComponent]
    });
    fixture = TestBed.createComponent(ModalUpdateToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
