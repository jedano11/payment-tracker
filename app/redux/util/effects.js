/* eslint-disable func-names */
import { take, call, fork } from 'redux-saga/effects';

/*
 ignores action while sage is not done

 use case:
 tapping a button multiple times calls saga once until completion

 takeLeading(SUBMIT_FORM, submitFormSaga);
 */
export const takeLeading = (patternOrChannel: any, saga: any, ...args: any) =>
  fork(function*() {
    while (true) {
      const action = yield take(patternOrChannel);

      yield call(saga, ...args.concat(action));
    }
  });
