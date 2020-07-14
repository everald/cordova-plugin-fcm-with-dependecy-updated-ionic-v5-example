import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { PushService } from '../push.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private platform: Platform, private pushService: PushService) {
    console.log('-= HomePage constructor =-');
    from(this.platform.ready()).subscribe(() => {
      console.log('-= Platform Ready =-');
      pushService.init();
      console.log('-- Platform Ready --');
    });
    console.log('-- HomePage constructor --');
  }

  public alertToken() {
    this.pushService.getToken().subscribe(token => {
      console.log(token);
      alert(JSON.stringify(token));
    });
  }
}
