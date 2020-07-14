import { Injectable } from '@angular/core';

import { from } from 'rxjs';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/typings';


@Injectable({providedIn: 'root'})
export class PushService {

    constructor(private fcm: FCM) {}

    init() {
        if (!this.fcm) {
          console.log('error: push plugin is not available');
          return;  
        }
        console.log('do we have push permission?');
        from(this.fcm.hasPermission()).subscribe(isEnabled => this.startPushService(isEnabled))
    }

    startPushService(isEnabled: boolean) {
        if(isEnabled) {
            console.log('push is enabled');
            this.initPushProcess();
        } else if(isEnabled === null) {
            console.log('push is not decided');
            this.requestPushPermission();
        } else {
            console.log('push is disabled');
        }
    }

    requestPushPermission() {
        console.log('request PushPermission');
        from(this.fcm.requestPushPermission()).subscribe(isEnabled => this.startPushService(isEnabled));
    }

    initPushProcess() {
        console.log('sub to onTokenRefresh');
        this.fcm.onTokenRefresh().subscribe(token => console.log('token refresh, send to server: ' + token));
        console.log('sub to onNotification');
        this.fcm.onNotification().subscribe((data:INotificationPayload) => this.handleNotification(data));
        console.log('getToken');
        this.getToken().subscribe(token => console.log('get token: ' + token))
    }

    getToken() {
        return from(this.fcm.getToken());
    }

    handleNotification(data: INotificationPayload) {
        console.log('handle notification');
        console.log(JSON.stringify(data));
    }
}