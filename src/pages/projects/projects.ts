import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";
import {ProjectInfoPage} from "../project-info/project-info";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AngularFireAuth} from "angularfire2/auth";
import {AlertProvider} from "../../providers/alert/alert";

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  public projects: FirebaseListObservable<Project[]>;
  loading: Loading;
  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    private auth: AngularFireAuth,
    public alert: AlertProvider) {
    this.menuCtrl.enable(true, 'mainMenu');
    this.projects = this.afDatabase.list('projects/');
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  ionViewWillEnter(){
    console.log(this.auth.auth.currentUser);
    if(this.auth.auth.currentUser == null){
      this.alert.showAlert('Внимание!', 'Вы вошли как гость, поэтому ваш функционал ограничен! Вы не можете добавлять свои проекты, а также не можете смотреть информацию об авторах проектов!');
    }
    this.splashScreen.hide();

  }
  openProject(item){
    this.navCtrl.push(ProjectInfoPage, {item: item, videourl: item.videoUrl})
  }

}
