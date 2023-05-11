import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  //   activatedEmitter = new EventEmitter<boolean>();
  //Use subject
  activatedEmitter = new Subject<boolean>();
}
