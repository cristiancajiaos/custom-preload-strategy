import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { flatMap, mergeMap, Observable, of, timer } from "rxjs";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, loadMe: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      var delay: number = route.data['delay'];
      console.log(`Preload called on ${route.path}, delay is ${delay}`);
      return timer(delay).pipe(
        mergeMap(_ => { /* Reemplaza a flatMap por ser método deprecado */
          console.log(`Loading now: ${route.path}`);
          return loadMe();
        })
      )
    } else {
      console.log(`No preload for the path ${route.path}`);
      return of(null);
    }
  }

}
