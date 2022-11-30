import React, {useEffect} from 'react';
import {LogBox, StyleSheet, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './src/navigation/RootNavigator';
import {Fonts} from './src/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/storage/redux/store';
import {notificationListener, requestUserPermission} from './src/notifications';

let {store, persistor} = configureStore();

export default function App() {
  LogBox.ignoreAllLogs();

  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: Fonts.primaryRegular,
    },
  });

  const customProps = {style: styles.defaultFontFamily};

  // To set default font family, avoiding issues with specific android fonts like OnePlus Slate
  function setDefaultFontFamily() {
    const TextRender = Text.render;
    const initialDefaultProps = Text.defaultProps;
    Text.defaultProps = {
      ...initialDefaultProps,
      ...customProps,
    };
    Text.render = function render(props) {
      let oldProps = props;
      props = {...props, style: [customProps.style, props.style]};
      try {
        return TextRender.apply(this, arguments);
      } finally {
        props = oldProps;
      }
    };
  }

  useEffect(() => {
    SplashScreen.hide();
    setDefaultFontFamily();
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
