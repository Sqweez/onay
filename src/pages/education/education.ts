import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {eduction} from "../../models/education";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {Project} from "../../models/project";
import {EduInfoPage} from '../edu-info/edu-info';
import {EducationInfoPage} from "../education-info/education-info";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the EducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {
  public education: FirebaseListObservable<eduction[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private sanitizer: DomSanitizer) {
    this.education = this.afDatabase.list('education/');
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
