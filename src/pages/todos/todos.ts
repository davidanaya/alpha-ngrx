import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-todos",
  templateUrl: "todos.html"
})
export class TodosPage {
  constructor(public navCtrl: NavController) {}
}
