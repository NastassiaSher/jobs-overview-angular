import {getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {from, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';


@Injectable()
export class MockedDataService implements InMemoryDbService {

  createDb() {
    return of({});
  }

  get(reqInfo: RequestInfo) {
    // need headers so casting reqInfo to any; see https://github.com/angular/in-memory-web-api/issues/156
    const rq: any = reqInfo as any;
    const url: string = rq.url;
    const headers = rq.req.headers;

    if (reqInfo.apiBase !== 'api/') {
      return null;
    }

    if (url === '/api/getJobsList') {
      return this.responseFromJson(reqInfo, 'jobsList');
    }

    if (url === '/api/getJobById') {
      return this.responseFromJson(reqInfo, 'selectedJobResponse');
    }

    // if (url.startsWith('/api/oauth/token')) {
    //   let auth = headers.get('Authorization').substring(6); // remove 'Basic ' prefix
    //   auth = atob(auth);
    //   if (auth.startsWith('USER_')) {
    //     return this.responseFromJson(reqInfo, 'getAccessTokenForCSM');
    //   } else if (auth.startsWith('TOKEN_')) {
    //     return this.responseFromJson(reqInfo, 'getAccessTokenWithToggledData');
    //   // } else {
    //   //   return this.statusOnlyResponse(reqInfo, STATUS.UNAUTHORIZED);
    //   }
    // }

    return this.statusOnlyResponse(reqInfo, STATUS.NOT_FOUND);
  }

  post(reqInfo: RequestInfo) {
    // need body so casting reqInfo to any
    const rq: any = reqInfo as any;
    const url: string = rq.url;
    const body = rq.req.body;

    if (reqInfo.apiBase !== 'api/') {
      return null;
    }

    // if (url === '/api/frontend-log') {
    //   // return this.statusOnlyResponse(reqInfo, STATUS.OK);
    // }

    // if (url === REGULAR_SOC_URL) {
    //   if ((body['productType'] === 'G') && (body['isUiFirstLoad'] === true) && (body['showExpiredSocs'] === false)) {
    //     return this.responseFromJson(reqInfo, 'regularSOCListGSM_uiFirstLoad');
    //   }
    //   if ((body['productType'] === 'G') && (body['isUiFirstLoad'] === true) && (body['showExpiredSocs'] === true)) {
    //     return this.responseFromJson(reqInfo, 'regularGSMShowExpired_first');
    //   }
    //   if (body['productType'] === 'G' && body['isUiFirstLoad'] === false) {
    //     return this.responseFromJson(reqInfo, 'regularSOCListGSM_uiSecondLoad');
    //   }
    //   if (body['productType'] === 'B' && body['isUiFirstLoad'] === true) {
    //     return this.responseFromJson(reqInfo, 'regularSOCListMI_uiFirstLoad');
    //   }
    //   if (body['productType'] === 'B' && body['isUiFirstLoad'] === false) {
    //     return this.responseFromJson(reqInfo, 'regularSOCListMI_uiFirstLoad');
    //   }
    // }

    // if (url === DEVICE_SOC_URL) {
    //   if (body['productType'] === 'G') {
    //     return this.responseFromJson(reqInfo, 'deviceSOCListGSM');
    //   }
    //   if (body['productType'] === 'B') {
    //     return this.responseFromJson(reqInfo, 'deviceSOCListMI');
    //   }
    // }

    // if (url === INIT_INFO_URL) {
    //   return this.responseFromJson(reqInfo, 'getInitInfo');
    // }
    //
    // if (url === SUBSCRIBER_LIST_URL) {
    //   return this.responseFromJson(reqInfo, 'subscriberList');
    // }
    //
    // if (url === SOCS_COMPATIBILITY_URL) {
    //   return this.responseFromJson(reqInfo, 'socsCompatibilityResponseFailures_SubAndAccountLvlError');
    // }
    //
    // if (url === SAVE_SOCS_URL) {
    //   return this.responseFromJson(reqInfo, 'saveSocsResponse');
    // }
    //
    // if (url === SAVE_BATCH_SOCS_URL) {
    //   return this.responseFromJson(reqInfo, 'saveSocsResponse');
    // }

    // return this.statusOnlyResponse(reqInfo, STATUS.NOT_FOUND);
  }

  private statusOnlyResponse(reqInfo: RequestInfo, status: number): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      return this.finishOptions({
        status: status
      }, reqInfo);
    });
  }

  private responseFromJson(reqInfo: RequestInfo, responseId: string): Observable<any> {
    const jsonUrl = `../assets/json-responses/${responseId}.json`;

    return from(fetch(jsonUrl))
      .pipe(
        mergeMap(response => response.json()),
        mergeMap((response) => {
          let results: any;
          results = response;

          return reqInfo.utils.createResponse$(() => {
            return this.finishOptions({
              body: results,
              status: STATUS.OK
            }, reqInfo);
          });
        })
      );
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

}
