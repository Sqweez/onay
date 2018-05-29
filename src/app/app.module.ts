import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Toast} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePage} from "../pages/welcome/welcome";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {Keyboard} from "@ionic-native/keyboard";
import  { AngularFireModule } from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import  { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database-deprecated";
import {ProfilePage} from "../pages/profile/profile";
import { AngularFireStorageModule } from "angularfire2/storage";
import {Camera} from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {WorkPage} from "../pages/work/work";
import {CalendarPage} from "../pages/calendar/calendar";
import {EducationPage} from "../pages/education/education";
import {ContactsPage} from "../pages/contacts/contacts";
import {NewInfoPage} from "../pages/new-info/new-info";
import {StoreProjectPage} from "../pages/store-project/store-project";
import {ProjectsPage} from "../pages/projects/projects";
import {TabsPage} from "../pages/tabs/tabs";
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {LicensePage} from "../pages/license/license";
import {Autentification} from "../providers/services/autentification";
import {ToastService} from "../providers/services/toast.service";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";
import {ProjectInfoPage} from "../pages/project-info/project-info";
import {EducationInfoPage} from "../pages/education-info/education-info";
import {HeaderColor} from "@ionic-native/header-color";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    WorkPage,
    CalendarPage,
    EducationPage,
    ContactsPage,
    NewInfoPage,
    StoreProjectPage,
    ProjectsPage,
    TabsPage,
    MyProfilePage,
    LicensePage,
    ProjectInfoPage,
    EducationInfoPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,  { scrollAssist: false, autoFocusAssist: false }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    WorkPage,
    CalendarPage,
    EducationPage,
    ContactsPage,
    NewInfoPage,
    StoreProjectPage,
    ProjectsPage,
    TabsPage,
    MyProfilePage,
    LicensePage,
    ProjectInfoPage,
    EducationInfoPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    Keyboard,
    AngularFireAuth,
    Camera,
    FileChooser,
    InAppBrowser,
    Autentification,
    ToastService,
    EmailComposer,
    CallNumber,
    HeaderColor
  ]
})
export class AppModule {}
