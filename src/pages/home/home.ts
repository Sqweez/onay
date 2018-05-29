import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile";
import { AngularFireStorage} from "angularfire2/storage";
import {News} from "../../models/news";
import {DomSanitizer} from "@angular/platform-browser";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {NewInfoPage} from "../new-info/new-info";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profileData: FirebaseObjectObservable<Profile>;
  public news: FirebaseListObservable<News[]>;
  username: any;
  smth: any;
  constructor(
    private afStorage: AngularFireStorage,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private sanitizer: DomSanitizer,
    private inAppBrowser: InAppBrowser
    ) {
    this.menuCtrl.enable(true, 'mainMenu');
    this.news = this.afDatabase.list('news/');
  }

  ionViewWillLoad(){
    this.smth = this.afStorage.storage;
    this.afAuth.authState.take(1).subscribe(data => {
      this.afDatabase.object('profile/' + data.uid);
      console.log(this.username);
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
    })
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  showPage(id){
    this.navCtrl.push(NewInfoPage, {id});
  }
  goToUrl(url){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      hideurlbar: 'yes'
    };
    const browser = this.inAppBrowser.create(url, '_self', options);
  }
}
