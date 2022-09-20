// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/model/adminUser';
import ExportRole from '../../../app/model/role';

declare module 'egg' {
  interface IModel {
    AdminUser: ReturnType<typeof ExportAdminUser>;
    Role: ReturnType<typeof ExportRole>;
  }
}
