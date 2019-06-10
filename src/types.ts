import { RestPageResponseInfo, PageResponse } from '@sinoui/use-rest-page-api';

export interface PageInfo {
  pageSize: number;
  currentPage: number;
  total: number;
}

export interface DataSource<T>
  extends RestPageResponseInfo<T, PageResponse<T>> {
  data: T[];
  loading: boolean;
  error: boolean;
  pagination: any;
  onSelect: (ids: string[], rows: T[]) => void;
  selectedRows: T[];
  setSelectedItems: (items: T[], replace?: boolean) => void;
  refresh: () => void;
  getItem: (id: string) => T;
  create: (item: T) => Promise<T>;
  onChange: (
    pageNo: number,
    pageSize: number,
    sort?: { name: string; direction: 'desc' | 'asc' },
  ) => void;
  sort?: {
    name: string;
    direction: 'desc' | 'asc';
  };
}
