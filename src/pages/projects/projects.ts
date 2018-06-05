import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";
import {ProjectInfoPage} from "../project-info/project-info";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AngularFireAuth} from "angularfire2/auth";
import {AlertProvider} from "../../providers/alert/alert";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  projects: Observable<Project[]>;
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
    public alert: AlertProvider,
    public nativePageTransitions: NativePageTransitions) {
    this.menuCtrl.enable(true, 'mainMenu');
    this.projects = this.afDatabase.list<Project>('projects',
        ref => ref.orderByChild('isAccepted').equalTo(1))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  ionViewWillEnter(){
    this.splashScreen.hide();
  }
  openProject(item){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(ProjectInfoPage, {item: item, videourl: item.videoUrl})
  }

}
