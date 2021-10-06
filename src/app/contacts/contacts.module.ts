import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactsManageComponent } from './contacts-manage/contacts-manage.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactsManageComponent,
    ContactsListComponent,
    SearchPipe,
  ],
  imports: [CommonModule, ContactsRoutingModule, SharedModule],
})
export class ContactsModule {}
