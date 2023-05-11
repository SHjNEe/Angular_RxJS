import { Component, OnInit, OnDestroy } from "@angular/core";
("@angular/core");
import { Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //Theo dõi một Observable và hủy đăng ký Observer khi không cần thiết
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
        //observer.next(value) được sử dụng để gửi một giá trị mới đến Observer.
        // Giá trị này có thể là bất kỳ kiểu dữ liệu nào
        observer.next(count);
        if (count > 3) {
          //Error
          observer.error(new Error("Error...!"));
        }
        if (count > 2) {
          //Finish
          observer.complete();
        }
        count++;
      }, 1000);
    });
    // customIntervalObservable.pipe(
    //   map((data: number) => {
    //     return "Round: " + (data + 1);
    //   })
    // );
    this.firstObsSubscription = customIntervalObservable
      //Change return value with map
      .pipe(
        //Lọc phần tử (Lấy ra các phần tử không cần thiết với filter)
        filter((data: number) => {
          return data % 2 === 1;
        }),
        //Convert lại dữ liệu với map
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        //Call api
        (data: any) => {
          this.count = data;
        },
        //Handle error
        (err) => {
          alert(err.message);
        },
        //Finish
        () => {
          console.log("Completed");
        }
      );
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}

//Ví dụ call api với observable
export class AppObservable {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  getData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const observable: Observable<any> = this.http.get(url);
    observable.subscribe((response) => {
      this.data = response;
    });
  }
}

//Ví dụ call api với asyn await
export class AppAsync {
  data: any;

  constructor(private http: HttpClient) {}

  async getData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await this.http.get(url).toPromise();
    this.data = response;
  }
}
