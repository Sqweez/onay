import { Component } from '@angular/core';
import {
  MenuController,
  NavController,
  NavParams
} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  change: boolean = false;
  profileInfo: FirebaseObjectObservable<any>;
  projects: FirebaseListObservable<Project[]>;
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
    this.profileInfo = this.afDatabase.object('profile/' + this.id);
    this.projects = this.afDatabase.list('projects/');
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }
  showImage(image){
    return this.sanitezer.bypassSecurityTrustResourceUrl(image);
  }

}
