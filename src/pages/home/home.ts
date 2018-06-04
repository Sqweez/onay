import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile";
import { AngularFireStorage} from "angularfire2/storage";
import {News} from "../../models/news";
import {DomSanitizer} from "@angular/platform-browser";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {NewInfoPage} from "../new-info/new-info";
import {Observable} from "rxjs/Observable";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {map} from "rxjs/operators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profileData: Observable<Profile>;
  news: Observable<News[]>;
  smth: any;
  isAuth: boolean = true;
  constructor(
    private afStorage: AngularFireStorage,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private sanitizer: DomSanitizer,
    private inAppBrowser: InAppBrowser,
    public nativePageTransitions: NativePageTransitions
    ) {
    this.menuCtrl.enable(true, 'mainMenu');
    this.news = this.afDatabase.list<News>('news/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ionViewWillLoad(){
    if(this.afAuth.auth.currentUser == null){
      this.isAuth = false;
    }
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  showPage(item){
    console.log(item.key);
    if(this.isAuth == true){
      this.afDatabase.object('views/news/' + item.key + '/'+ this.afAuth.auth.currentUser.uid).valueChanges().subscribe(data => {
        if (!data) {
            const count = item.viewCount + 1;
            this.afDatabase.object('news/' + item.key).update({viewCount: count});
            this.afDatabase.object('views/news/'+ item.key + '/' + this.afAuth.auth.currentUser.uid).set({view: 1});
        }
      })
    }
    if(!item.url){
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
      this.navCtrl.push(NewInfoPage, {info: item});
    }
    else{
      const options: InAppBrowserOptions = {
        zoom: 'no',
        hideurlbar: 'yes'
      };
      const browser = this.inAppBrowser.create(item.url, '_self', options);
    }
  }
}
