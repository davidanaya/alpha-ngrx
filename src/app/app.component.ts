import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/state/app-state";
import { PlatformReadyAction } from "../store/actions/todo-actions";

@Component({
  templateUrl: "app.component.html"
})
export class AppComponent {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<AppState>
  ) {
    platform.ready().then(() => {
      this.store.dispatch(new PlatformReadyAction());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
