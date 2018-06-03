import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {WelcomePage} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";
import {Profile} from "../../models/profile";

/**
 * Generated class for the LicensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-license',
  templateUrl: 'license.html',
})
export class LicensePage {
  profile = {} as Profile;
  isAccepted: boolean;
  profileDat = {} as any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object('profile/' + auth.uid).valueChanges().subscribe( data => {
        this.profileDat = data;
        if(this.profileDat.didLicenseAccepted == true){
          this.isAccepted = true;
        }
        else if(this.profileDat.didLicenseAccepted == false){
          this.isAccepted = false;
        }
      })
    })
  }
  accept(){
    this.afAuth.authState.subscribe(data => {
      this.profile.didLicenseAccepted = true;
      this.afDatabase.object('profile/' + data.uid ).update(this.profile);
      this.navCtrl.setRoot(TabsPage);
    })
  }
  decline(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(WelcomePage);
  }
  ionViewDidLoad(){
    console.log(this.isAccepted);
  }

}
