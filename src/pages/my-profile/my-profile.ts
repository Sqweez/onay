import { Component } from '@angular/core';
import {
  MenuController,
  NavController,
  NavParams
} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  change: boolean = false;
  projects: Observable<Project[]>;
  image: any;
  imageUrl: any;
  id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private afDatabase: AngularFireDatabase,
    public sanitezer: DomSanitizer

  ) {
    this.id = this.navParams.get('id');
/*
    this.profileInfo = this.afDatabase.object('profile/' + this.id).valueChanges();
*/
    this.projects = this.afDatabase.list<Project>('projects/', ref => ref.orderByChild('uid').equalTo(this.id)).valueChanges();
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }
  showImage(image){
    return this.sanitezer.bypassSecurityTrustResourceUrl(image);
  }

}
