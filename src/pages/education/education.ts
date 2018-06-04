import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {eduction} from "../../models/education";
import {AngularFireDatabase} from "angularfire2/database";
import {EducationInfoPage} from "../education-info/education-info";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {map} from "rxjs/operators";


@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {
  public education: Observable<eduction[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    public nativePageTransitions: NativePageTransitions) {
    this.education = this.afDatabase.list<eduction>('education/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  openEduPage(item){
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
    this.navCtrl.push(EducationInfoPage, {item: item});
  }
  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

}
