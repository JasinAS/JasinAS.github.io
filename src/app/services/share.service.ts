import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private contactsource = new BehaviorSubject(null);
  currentContact = this.contactsource.asObservable();

  constructor() {}

  /* Shared Service for contact change */
  changeContact(contact: Contact) {
    this.contactsource.next(contact);
  }
}
