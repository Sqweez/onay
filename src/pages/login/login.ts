import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  async login(user: User){
   this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    this.afAuth.authState.subscribe(data => {
      this.afDatabase.object('profile/' + data.uid).subscribe(data =>{
        console.log('firstname: ' + data.firstname + 'isAccepted: ' + data.didLicenseAccepted);
       /* if(!data.firstname){
          this.navCtrl.setRoot(ProfilePage);
        }
        else{
          this.navCtrl.setRoot(TabsPage);
        }*/
      })
    });
  }
  ionViewDidLoad() {
  }

}
