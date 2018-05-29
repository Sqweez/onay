import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {Project} from "../../models/project";
import {News} from "../../models/news";
import {DomSanitizer} from "@angular/platform-browser";
import {ProjectInfoPage} from "../project-info/project-info";
import {SplashScreen} from "@ionic-native/splash-screen";

@IonicPage()
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
    public splashScreen: SplashScreen) {
    this.menuCtrl.enable(true, 'mainMenu');
    this.projects = this.afDatabase.list('projects/');
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  ionViewWillEnter(){
    this.splashScreen.hide();
  }
  openProject(item){
    this.navCtrl.push(ProjectInfoPage, {item: item, videourl: item.videoUrl})
  }

}
