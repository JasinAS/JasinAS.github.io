import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/models/button';
import { Contact } from 'src/app/models/contact';
import { InputModel } from 'src/app/models/inputmodel';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-contacts-manage',
  templateUrl: './contacts-manage.component.html',
  styleUrls: ['./contacts-manage.component.scss'],
})
export class ContactsManageComponent implements OnInit, OnDestroy {
  visibleContacts = false;

  /* Button Config */
  emailButton: Button = {
    action: 'email',
    title: 'Add email',
    class: 'button_email',
  };
  saveButton: Button = {
    action: 'save',
    title: 'Save',
    class: 'button_save',
  };
  cancelButton: Button = {
    action: 'cancel',
    title: 'Cancel',
    class: 'button_cancel',
  };
  deleteButton: Button = {
    action: 'delete',
    title: 'Delete',
    class: 'button_delete',
  };

  /* Input Config */
  firstNameInput: InputModel = {
    value: '',
    placeholder: 'First name',
    type: 'text',
    name: 'firstName',
    icon: false,
    iconSrc: '',
    required: true,
  };
  lastNameInput: InputModel = {
    value: '',
    placeholder: 'Last name',
    type: 'text',
    name: 'lastName',
    icon: false,
    iconSrc: '',
    required: true,
  };
  emailInput: InputModel = {
    value: '',
    placeholder: 'email',
    type: 'email',
    name: 'email',
    icon: false,
    iconSrc: '',
    required: false,
  };
  contactArray: Contact[] = [];

  contactUpdateData: Contact = {
    firstName: '',
    lastName: '',
    emails: [],
    id: 0,
  };

  subscription: Subscription;
  tempEmail = '';
  constructor(private share: ShareService) {}

  ngOnInit() {
    /* Set new data and change screen after user selects one contact or tries to add a new one */
    this.subscription = this.share.currentContact.subscribe((contact) => {
      if (contact) {
        this.contactUpdateData = contact;
        this.firstNameInput.value = this.contactUpdateData?.firstName;
        this.lastNameInput.value = this.contactUpdateData?.lastName;
        this.visibleContacts = true;
      }
    });
    this.contactArray = JSON.parse(localStorage.getItem('contactArray')) || [];
  }

  /* Set new value from input element outputs */
  setNewValue(event: any, option: string) {
    switch (option) {
      case 'firstName':
        this.contactUpdateData.firstName = event.event;
        break;
      case 'lastName':
        this.contactUpdateData.lastName = event.event;
        break;
      case 'email':
        if (event.valid) {
          this.tempEmail = event.event;
        }
        break;
      default:
        break;
    }
  }

  /* Switch through actions */
  clickAction(event: string) {
    switch (event) {
      case 'email':
        this.addNewEmail();
        break;
      case 'save':
        this.saveContact();
        break;
      case 'cancel':
        this.cancelContact();
        break;
      case 'delete':
        this.deleteContact();
        break;
      default:
        break;
    }
  }

  /* Save new contact */
  saveContact() {
    if (this.contactUpdateData.firstName && this.contactUpdateData.lastName) {
      const contact: Contact = {
        firstName: this.contactUpdateData.firstName,
        lastName: this.contactUpdateData.lastName,
        emails: this.contactUpdateData.emails,
        // dummy id
        id: this.contactUpdateData.id
          ? this.contactUpdateData.id
          : (this.contactArray?.length || 0) + 1,
      };
      const newContact = this.contactArray?.find((c) => c.id === contact.id);
      const index = this.contactArray.indexOf(newContact);
      if (newContact) {
        this.contactArray[index] = contact;
      } else {
        this.contactArray.push(contact);
      }
      localStorage.setItem('contactArray', JSON.stringify(this.contactArray));
      this.share.changeContact(this.contactUpdateData);
      this.contactUpdateData = {
        firstName: '',
        lastName: '',
        emails: [],
        id: 0,
      };
      this.firstNameInput.value = '';
      this.lastNameInput.value = '';
      this.visibleContacts = false;
    }
  }

  /* Push email to array */
  addNewEmail() {
    if (this.tempEmail) {
      this.contactUpdateData.emails.push(this.tempEmail);
      this.tempEmail = '';
      this.emailInput.value = '';
    }
  }

  /* Delete email from array */
  deleteEmail(i: number) {
    this.contactUpdateData.emails.splice(i, 1);
  }

  /* Cancel everything */
  cancelContact() {
    this.contactUpdateData = {
      firstName: '',
      lastName: '',
      emails: [],
      id: 0,
    };
    this.visibleContacts = false;
    this.share.changeContact(null);
  }

  /* Delete contact */
  deleteContact() {
    const selecedContact = this.contactArray?.find(
      (c) => c.id === this.contactUpdateData.id
    );
    const index = this.contactArray.indexOf(selecedContact);
    this.contactArray.splice(index, 1);
    localStorage.setItem('contactArray', JSON.stringify(this.contactArray));
    this.share.changeContact(this.contactUpdateData);
    this.visibleContacts = false;
    this.contactUpdateData = {
      firstName: '',
      lastName: '',
      emails: [],
      id: 0,
    };
  }

  /* Destroy sub */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
