// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
  }
}
