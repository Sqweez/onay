import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EduInfoPage } from './edu-info';

@NgModule({
  declarations: [
    EduInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EduInfoPage),
  ],
})
export class EduInfoPageModule {}
