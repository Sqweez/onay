import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EducationInfoPage } from './education-info';

@NgModule({
  declarations: [
    EducationInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EducationInfoPage),
  ],
})
export class EducationInfoPageModule {}
