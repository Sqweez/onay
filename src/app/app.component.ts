import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from "../pages/welcome/welcome";
import {Keyboard} from "@ionic-native/keyboard";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Profile} from "../models/profile";
import {TabsPage} from "../pages/tabs/tabs";
import {LicensePage} from "../pages/license/license";
import {Autentification} from "../providers/services/autentification";
import {HeaderColor} from "@ionic-native/header-color";
import { timer } from "rxjs/observable/timer";
import {AboutUsPage} from "../pages/about-us/about-us";
import { Network } from '@ionic-native/network'
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {HomePage} from "../pages/home/home";
import {RegisterPage} from "../pages/register/register";
import {Observable} from "rxjs/Observable";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //For fast tests
  /*email: string = "sasha.katerinin@gmail.com";
  password: string = "123456";*/
  showSplash = true;
  rootPage: any;
  profileData: Observable<Profile>;
  unregPages: Array<{title: string, component: any, icon: string}>;
  pages: Array<{title: string, component: any, icon: string}>;
  tabs: Array<{component: any, icon: string}>;
  profileDat = {} as any
  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public keyboard: Keyboard,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authProvider: Autentification,
    public headerColor: HeaderColor,
    public toastCtrl: ToastController,
    public ntwrk: Network) {
    this.initializeApp();



    // used for an example of ngFor and navigation
    this.unregPages = [
      {title: 'Войти', component: WelcomePage, icon: 'md-home'},
      {title: 'Зарегистироваться', component: RegisterPage, icon: 'md-cog'}
    ];
    this.pages = [
    /*  { title: 'Настройки', component: 'settings', icon: 'md-cog' },*/
      { title: 'Лицензионное соглашение', component: LicensePage, icon: 'mail' },
      { title: 'О нас', component: AboutUsPage, icon: 'information-circle' },
      { title: 'Выйти', component: null, icon: 'exit'}
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(data => {
        if(data){
          console.log('1');
          this.afDatabase.object('profile/' + data.uid)
            .valueChanges()
            .subscribe(data =>{
              this.profileDat = data;
            if(this.profileDat.didLicenseAccepted){
              this.afAuth.authState.subscribe(data => {
                console.log('Авторизован');
                this.profileData = this.afDatabase.object<Profile>(`profile/${data.uid}`).valueChanges();
              });
              this.headerColor.tint('#3f71ae');
              this.rootPage = TabsPage;
              console.log('2');
            }
            else if(this.profileDat.didLicenseAccepted == false){
              this.headerColor.tint('#3f71ae');
              this.rootPage = LicensePage;
              console.log('3');
            }
          });
        }
        else {
          console.log('5');
          this.statusBar.hide();
          this.rootPage = WelcomePage;
        }
      });
      this.headerColor.tint('#3f71ae');
      this.statusBar.backgroundColorByHexString('#3f71ae');
      this.keyboard.disableScroll(true);
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }
  showProfile(){
     this.afAuth.authState.subscribe(data => {
        let id = data.uid;
        this.nav.push(MyProfilePage, {id})
      });
  }

  openTab(page){
    this.nav.setRoot(page.component);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == 'settings'){
      this.showToast('Пункт меню временно оне работает!');
    }
    else if(page.component == 'aboutus'){
      this.showToast('Надо бы что-нибудь сюда написать');
    }
    else if(page.component) {
      this.nav.push(page.component);
    }
    else {
      this.nav.setRoot(WelcomePage);
      this.afAuth.auth.signOut();
      this.profileData = null;
    }
  }
  showToast(message: String){
    let toast = this.toastCtrl.create({
      message: '' + message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
