import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private paramMapSub = new ReplaySubject<ParamMap>();
  private queryParamMapSub = new ReplaySubject<ParamMap>();

  constructor(initialParams: Params = {}, initialQueryParams: Params = {}) {
    this.setParamMap(initialParams);
    this.setQueryParamMap(initialQueryParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.paramMapSub.asObservable();
  /** The mock queryParamMap observable */
  readonly queryParamMap = this.queryParamMapSub.asObservable();

  /** Set the paramMap observable's next value */
  setParamMap(params: Params = {}) {
    this.paramMapSub.next(convertToParamMap(params));
  }

  /** Set the queryParamMap observable's next value */
  setQueryParamMap(params: Params = {}) {
    this.queryParamMapSub.next(convertToParamMap(params));
  }
}
