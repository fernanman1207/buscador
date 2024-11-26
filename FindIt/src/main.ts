import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerPlugin } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  if (Capacitor.isNativePlatform()) {
    console.log('Running on native platform');
  }