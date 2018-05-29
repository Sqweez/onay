import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectInfoPage } from './project-info';

@NgModule({
  declarations: [
    ProjectInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectInfoPage),
  ],
})
export class ProjectInfoPageModule {}
