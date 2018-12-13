import { NavigationActions } from 'react-navigation';

let navigator = null;

function setTopLevelNavigator(navigatorRef: ?Object) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params: Object) {
  if (!navigator) {
    return;
  }

  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
