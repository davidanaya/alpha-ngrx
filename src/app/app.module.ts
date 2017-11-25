import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AppComponent } from "./app.component";

// pages
import { AboutPage } from "../pages/about/about";
import { TodosPage } from "../pages/todos/todos";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

// store
import { StoreModule } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { INITIAL_STATE } from "../store/state/app-state";
import { storeReducer } from "../store/reducers/store-reducer";

// components
import { TodosComponent } from "../containers/todos/todos.component";

// services
import { TodosService } from "../containers/todos/todos.service";
import { StorageService } from "../services/storage.service";

// rxjs imports
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/take";
import "rxjs/add/operator/delay";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

export const metaReducers = [storeFreeze];

@NgModule({
  declarations: [AppComponent, AboutPage, TodosPage, HomePage, TabsPage, TodosComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        reducerFactory: () => storeReducer,
        metaReducers,
        initialState: INITIAL_STATE
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [AppComponent, AboutPage, TodosPage, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TodosService,
    StorageService
  ]
})
export class AppModule {}
