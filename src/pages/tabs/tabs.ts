import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import {EducationPage} from "../education/education";
import {StoreProjectPage} from "../store-project/store-project";
import {ProjectsPage} from "../projects/projects";
import {ContactsPage} from "../contacts/contacts";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProjectsPage;
  tab2Root = EducationPage;
  tab3Root = StoreProjectPage;
  tab4Root = HomePage;
  tab5Root = ContactsPage;

  constructor() {

  }
}
