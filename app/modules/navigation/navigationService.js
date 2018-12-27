import { NavigationActions } from 'react-navigation';

let navigator = null;

const setTopLevelNavigator = (navigatorRef: ?Object) => {
  navigator = navigatorRef;
};

const navigate = (routeName: string, params: ?Object) => {
  if (!navigator) {
    return;
  }

  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const back = (key: ?string) => {
  if (!navigator) {
    return;
  }

  navigator.dispatch(
    NavigationActions.back({
      key,
    }),
  );
};

const dispatchNavigationAction = (action: Object) => {
  if (navigator) {
    navigator.dispatch(action);
  }
};

// add other navigation functions that you need and export them

const NavigationService = {
  navigate,
  back,
  setTopLevelNavigator,
  dispatchNavigationAction,
};

export default NavigationService;