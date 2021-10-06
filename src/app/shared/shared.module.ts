import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [InputComponent, ButtonComponent],
  exports: [InputComponent, ButtonComponent, AngularSvgIconModule],
})
export class SharedModule {}
