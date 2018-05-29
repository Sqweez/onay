import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  MenuController,
  NavController,
  NavParams
} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Profile} from "../../models/profile";
import {Camera, CameraOptions} from "@ionic-native/camera";
import * as firebase from "firebase";

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  profileInfo: FirebaseObjectObservable<any>;
  image: any;
  imageUrl: any;
  id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private afDatabase: AngularFireDatabase,

  ) {
    this.id = this.navParams.get('id');
    this.profileInfo = this.afDatabase.object('profile/' + this.id);
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

}
