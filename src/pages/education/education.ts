import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {eduction} from "../../models/education";
import {AngularFireDatabase} from "angularfire2/database";
import {EducationInfoPage} from "../education-info/education-info";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";


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
    private sanitizer: DomSanitizer) {
    this.education = this.afDatabase.list<eduction>('education/').valueChanges();
  }
  openEduPage(item){
    this.navCtrl.push(EducationInfoPage, {item: item});
  }
  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

}
