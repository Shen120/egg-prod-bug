// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCard from '../../../app/model/card';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Card: ReturnType<typeof ExportCard>;
    User: ReturnType<typeof ExportUser>;
  }
}
