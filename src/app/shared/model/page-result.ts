import {BaseModel} from './base-model';

export class PageResult<T extends BaseModel> {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  data: T[];
}
