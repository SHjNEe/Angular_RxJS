import { Component, OnInit, OnDestroy } from "@angular/core";
("@angular/core");
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
