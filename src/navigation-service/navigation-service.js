import { NavigationActions, DrawerActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('routeName!!!!!!!!!!!!!!!!!!!!!!!!', routeName);
  console.log('params!!!!!!!!!!!!!!!!!!!!1', params)
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  )
}

function back() {
  _navigator.dispatch(
    NavigationActions.back({
      key: null
    }),
  );
}

function openDrawer() {
  _navigator.dispatch(
    DrawerActions.openDrawer()
  )
}

function closeDrawer() {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  )
}

// add other navigation functions that you need and export them

export default {
  openDrawer,
  closeDrawer,
  navigate,
  push,
  back,
  setTopLevelNavigator,
  replace
};
