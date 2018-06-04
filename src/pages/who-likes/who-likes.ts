import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the WhoLikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-who-likes',
  templateUrl: 'who-likes.html',
})
export class WhoLikesPage {
  post_id: string;
  users = [] as any;
  data = {} as any;
  info = {} as any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase) {
    this.post_id = this.navParams.get('id');
    console.log(this.post_id);
  }
  ionViewDidLoad() {
    this.db.list('likes',
        ref => ref.orderByChild('post_id')
          .equalTo(this.post_id))
      .valueChanges()
      .subscribe(data => {
        for(let i=0; i < data.length; i++){
          this.data = data[i];
          this.db.object('profile/' + this.data.user_id)
            .valueChanges()
            .subscribe(info => {
              this.info = info;
              this.users.firstname = this.info.firstame;
              this.users.lastname = this.info.lastname;
            })
        }
      })
  }

}
