import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the NewInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-info',
  templateUrl: 'new-info.html',
})
export class NewInfoPage {
  titleInfo: FirebaseObjectObservable<any>;
  titleId: string;
  constructor(private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.titleId = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.titleInfo = this.afDatabase.object('news/' + this.titleId);
  }
  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

}
