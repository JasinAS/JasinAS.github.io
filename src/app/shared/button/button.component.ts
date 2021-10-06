import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'src/app/models/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() button: Button;
  @Output() clickAction = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  /* Emit button click */
  buttonClick(action) {
    this.clickAction.emit(action);
  }
}
