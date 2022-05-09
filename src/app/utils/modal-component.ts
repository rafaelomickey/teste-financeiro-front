import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-component.html'
})

export class NgbdModalContent {

  @Input() mensagens: string[] = [];
  constructor(public activeModal: NgbActiveModal) { }
}
