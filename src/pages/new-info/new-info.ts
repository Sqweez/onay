import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {News} from "../../models/news";

/**
 * Generated class for the NewInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-info',
  templateUrl: 'new-info.html',
})
export class NewInfoPage {
  titleInfo = {} as News;
  constructor(private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.titleInfo = this.navParams.get('info');
    console.log(this.titleInfo);
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

}
