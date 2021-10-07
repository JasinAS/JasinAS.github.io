import { Component, OnInit } from '@angular/core';
import { scaleAnimation } from '../helpers/animations/base-animations';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [scaleAnimation],
})
export class ContactsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
