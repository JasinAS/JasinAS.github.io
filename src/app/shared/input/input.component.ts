import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputModel } from 'src/app/models/inputmodel';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() input: InputModel;
  @Output() value = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  /* Emit value while typing */
  emitValue(event, valid) {
    this.value.emit({ event, valid });
  }
}
