package com.reactnativecnblogs;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.oblador.vectoricons.VectorIconsPackage;
import com.microsoft.codepush.react.CodePush;
import com.remobile.toast.*;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VectorIconsPackage(),
          new RCTToastPackage(),
          new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
