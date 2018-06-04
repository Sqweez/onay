import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {News} from "../../models/news";
import {AngularFireAuth} from "angularfire2/auth";
import * as $ from 'jquery';
import {ToastProvider} from "../../providers/toast/toast";
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
  isAuth: boolean = true;
  didLiked: boolean = false;
  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private toast: ToastProvider) {
    this.titleInfo = this.navParams.get('info');
    if(this.afAuth.auth.currentUser == null){
      this.isAuth = false;
    }
    this.afDatabase.object('likes/news/' + this.titleInfo.key + '/' + this.afAuth.auth.currentUser.uid)
      .valueChanges()
      .subscribe(data => {
        if(data){
          $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
          this.didLiked = true;
        }
      })
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  like(id, didLiked) {
    console.log(this.didLiked);
    if (didLiked == false && this.isAuth == true) {
      this.titleInfo.likeCount++;
      $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
      this.afDatabase.object('news/' + id.key + '/').update({likeCount: this.titleInfo.likeCount});
      this.afDatabase.object('likes/news/' + id.key + '/' + this.afAuth.auth.currentUser.uid).set({like: 1});
      this.didLiked = true;
    }
    else if(didLiked == true && this.isAuth == true){
      this.afDatabase.object('likes/news/'+ id.key + '/' + this.afAuth.auth.currentUser.uid).remove();
      this.didLiked = false;
      this.titleInfo.likeCount = this.titleInfo.likeCount - 1;
      $('#like').removeClass('fas').addClass('far').removeClass('dislikeButton').addClass('likeButton');
      this.afDatabase.object('news/' + id.key).update({likeCount: this.titleInfo.likeCount});
    }
    else if(this.isAuth == false){
      this.toast.showToast('Войдите или зарегистрируйтесь, чтобы оценивать записи');
    }
  }
}
