package com.teleropa;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.reactnativepayments.ReactNativePaymentsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.imagepicker.ImagePickerPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
//import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            // new ReactNativePaymentsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new ImagePickerPackage(),
            new ReactNativeRestartPackage(),
            new SplashScreenReactPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
            new SvgPackage(),
            new OrientationPackage(),
            new RNDeviceInfo(),
           // new RNCameraPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
