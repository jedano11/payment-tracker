import { END, eventChannel } from 'redux-saga';
import { all, call, delay, put, race, take } from 'redux-saga/effects';
import { timeoutSeconds } from '../../config/settings';
import { request } from '../../modules/Api';
import FirebaseClient from '../../modules/FirebaseClient';
import {
  CANCEL_FILE_UPLOAD,
  CANCEL_REQUEST,
  OVERRIDE_LATEST,
  requestComplete,
  requestError,
  updatefileUploadProgress,
} from './request.action';

/* `take` with conditional payload  */
export function* shouldCancel(
  actionParam: Object,
  key: string,
): Generator<*, *, *> {
  let notFound = true;

  while (notFound) {
    const action = yield take(key);
    if (
      action.payload.key === actionParam.payload.key &&
      action.payload.id === actionParam.payload.id
    ) {
      notFound = false;
    }
  }

  return true;
}

/* generic request saga */
export function* handleOptions(
  action: Object,
  response: any,
): Generator<*, *, *> {
  if (action.payload.options) {
    const { options } = action.payload;

    if (options.successAction) {
      if (options.successAction.constructor === Array) {
        const effects = options.successAction.map(el => put(el));

        yield all(effects);
      } else if (typeof options.successAction === 'object') {
        yield put(options.successAction);
      }
    }

    if (
      options.responseActionName &&
      typeof options.responseActionName === 'string'
    ) {
      yield put({
        payload: {
          id: action.payload.id,
          key: action.payload.key,
          response,
        },
        type: options.responseActionName,
      });
    }
  }
}

export default function* sendRequest(action: Object): Generator<*, *, *> {
  try {
    const { method, route, params } = action.payload.request;

    const { response, timeout, cancelled, overridden } = yield race({
      cancelled: call(shouldCancel, action, CANCEL_REQUEST),
      overridden: call(shouldCancel, action, OVERRIDE_LATEST),
      response: call(request, method, route, params || {}),
      timeout: delay(timeoutSeconds * 1000),
    });

    if (cancelled || overridden) {
      return;
    }

    if (timeout) {
      yield put(
        requestError(action.payload.key, action.payload.id, 'Request timeout'),
      );

      return;
    }

    yield put(requestComplete(action.payload.key, action.payload.id, response));

    yield handleOptions(action, response);
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}

function* uploadTask(action: Object): Generator<*, *, *> {
  const { directory, file, fileName } = action.payload.request;
  const userId = FirebaseClient.instance.auth().currentUser.uid;
  const storageRef = yield FirebaseClient.instance
    .storage()
    .ref(`${directory}/${userId}/${fileName}`);

  const task = storageRef.put(file);

  const progessChannel = () =>
    eventChannel((emitter: (params: any) => void) => {
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          emitter({
            done: false,
            downloadURL: null,
            error: null,
            percentage: Math.floor(percentage),
          });
        },
        error => {
          emitter({ percentage: 0, error, done: false, downloadURL: null });
          emitter(END);
        },
        () => {
          // complete
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            emitter({ percentage: 100, error: null, done: true, downloadURL });
            emitter(END);
          });
        },
      );

      return () => {
        task.cancel();
      };
    });

  const channel = progessChannel();

  while (true) {
    const { progess, cancel } = yield race({
      cancel: call(shouldCancel, action, CANCEL_FILE_UPLOAD),
      progess: take(channel),
    });

    if (cancel) {
      channel.close();
      // yield put();
      // if (!task.isComplete()) {
      //   task.cancel();
      // } else {
      //   // DELETE UPLOADED FILE
      // }

      return;
    }

    const { percentage, error, done, downloadURL } = progess;
    const response = { downloadURL };

    if (error) {
      throw error;
    }

    yield put(
      updatefileUploadProgress(
        action.payload.key,
        action.payload.id,
        percentage,
      ),
    );
    if (done === true) {
      yield put(
        requestComplete(action.payload.key, action.payload.id, response),
      );
      yield handleOptions(action, response);
    }
  }
}

export function* fileUpload(action: Object): Generator<*, *, *> {
  try {
    yield uploadTask(action);
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}
