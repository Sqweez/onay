import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import {EducationPage} from "../education/education";
import {StoreProjectPage} from "../store-project/store-project";
import {ProjectsPage} from "../projects/projects";
import {ContactsPage} from "../contacts/contacts";
import {AngularFireAuth} from "angularfire2/auth";
import {AlertProvider} from "../../providers/alert/alert";
import {NativeTransitionOptions, NativePageTransitions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {AngularFireDatabase} from "angularfire2/database";
import {MyApp} from "../../app/app.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = ProjectsPage;
  dataTime: any = '';
  tab2Root = EducationPage;
  tab3Root = StoreProjectPage;
  tab4Root = HomePage;
  tab5Root = ContactsPage;
  isAuth: boolean = true;
  loaded: boolean = false;
  tabIndex: number = 0;
  constructor(
    private auth: AngularFireAuth,
    public alert: AlertProvider,
    private transition: NativePageTransitions,
    public statusBar: StatusBar,
    private db: AngularFireDatabase) {
    this.dataTime = new Date().getHours();
    if(this.dataTime > 20 && this.dataTime < 23){
      this.alert.showAlert('Внимание!','На территории Казахстана в данное время могут некорректно работать YouTube ролики');
    }
    this.statusBar.backgroundColorByHexString('#654EA3');
    if(this.auth.auth.currentUser == null){
      this.isAuth = false;
      this.alert.showAlert('Внимание!', 'Вы вошли как гость, поэтому ваш функционал ограничен! Вы не можете добавлять свои проекты, а также не можете смотреть информацию об авторах проектов!');
    }
    else {
      this.isAuth = true;
    }
  }
  getAnimationDirection(index) {
    let currentIndex = this.tabIndex;
    this.tabIndex = index;
    switch (true) {
      case currentIndex < index:
        return('left');
      case currentIndex > index:
        return('right');
    }
  }
  makeTransition(e){
    let options: NativeTransitionOptions = {
      direction:this.getAnimationDirection(e.index),
      duration: 125,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };

    if (!this.loaded) {
      this.loaded = true;
      return;
    }
    this.transition.slide(options);
  }
}
