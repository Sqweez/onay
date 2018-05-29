import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {eduction} from "../../models/education";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the EducationInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-education-info',
  templateUrl: 'education-info.html',
})
export class EducationInfoPage {
  education = {} as eduction;
  loading: Loading;
  url: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController
  ) {
  }

  videoLoaded(){
    this.loading.dismiss();
  }

  ionViewWillEnter(){
    this.education = this.navParams.get('item');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.education.url);
    this.loading = this.loadingCtrl.create({
      content: 'Пожалуйста подождите'
    });
    this.loading.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationInfoPage');
  }

}
