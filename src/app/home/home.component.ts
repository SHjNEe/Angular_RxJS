import { Component, OnInit, OnDestroy } from "@angular/core";
("@angular/core");
import { Observable, Subscription, interval, observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private firstObsSubscription: Subscription;
  count: number;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    let count = 0;
    const customIntervalObservable = Observable.create((observer) => {
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });
    this.firstObsSubscription = customIntervalObservable.subscribe((data) => {
      this.count = data;
    });
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
