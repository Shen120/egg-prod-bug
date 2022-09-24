// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportControllerLogin from '../../../app/io/controller/login';
import ExportMiddlewareConnection from '../../../app/io/middleware/connection';

declare module 'egg' {
  interface Application {
    io: IO;
  }

  interface IO {
    controller: {
      login: ExportControllerLogin;
    }
    middleware: {
      connection: ExportMiddlewareConnection;
    }
  }
}
