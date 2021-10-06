import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { InputModel } from 'src/app/models/inputmodel';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  title = 'Contacts';

  /* Input config */
  searchModel: InputModel = {
    value: '',
    placeholder: 'search',
    type: 'search',
    name: 'search',
    icon: true,
    iconSrc: 'assets/svg/search.svg',
    required: false,
  };

  contacts: Contact[] = [];

  subscription: Subscription;
  constructor(private share: ShareService) {}

  ngOnInit() {
    /* Set new data and change screen after user selects one contact or tries to add a new one */
    this.subscription = this.share.currentContact.subscribe((contact) => {
      this.contacts = JSON.parse(localStorage.getItem('contactArray'));
      if (this.contacts && contact) {
        const selecedContact = this.contacts?.find((c) => c.id === contact?.id);
        const index = this.contacts?.indexOf(selecedContact);
        if (index !== -1) {
          this.contacts[index].selected = true;
        }
      }
    });
  }

  /* Add new contact */
  addNewContact() {
    this.resetSelection();
    const newContact: Contact = {
      firstName: '',
      lastName: '',
      emails: [],
      id: null,
    };
    this.share.changeContact(newContact);
  }

  /* Select Contact */
  selectContact(contact: Contact) {
    this.resetSelection();
    this.share.changeContact(contact);
    contact.selected = true;
  }

  /* Set rest to falsy */
  resetSelection() {
    if (this.contacts) {
      for (const element of this.contacts) {
        element.selected = false;
      }
    }
  }

  /* Destroy subs */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
