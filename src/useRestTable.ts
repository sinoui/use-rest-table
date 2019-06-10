import { useState, useCallback, useMemo } from 'react';
import useRestPageApi, { Options } from '@sinoui/use-rest-page-api';
import { DataSource } from './types';

/**
 * 简化`use-rest-page-api`与`@sinoui/data-table`相关处理的Hook
 *
 * @template T
 * @param {string} url
 * @param {T[]} [defaultValue]
 * @param {Options<T>} [options]
 * @returns
 */
function useRestTable<T>(
  url: string,
  defaultValue?: T[],
  options?: Options<T>,
): DataSource<T> {
  const dataSource = useRestPageApi(url, defaultValue, options);

  const [selectedRows, setSelectedRows] = useState([]);
  /**
   * 列表选中时的回调函数
   */
  const onSelect = useCallback((_ids, rows) => setSelectedRows(rows), []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSelectedItems = (items: any, replace: boolean = false) => {
    if (replace) {
      setSelectedRows(items);
    }
  };

  /**
   * 处理pagination的转换
   */
  const pagination = useMemo(
    () => ({
      pageSize: dataSource.pagination.pageSize,
      currentPage: dataSource.pagination.pageNo + 1,
      total: dataSource.pagination.totalElements,
    }),
    [
      dataSource.pagination.pageNo,
      dataSource.pagination.pageSize,
      dataSource.pagination.totalElements,
    ],
  );

  /**
   * 处理排序信息
   */
  const sortInfo = useMemo(() => {
    const { sorts } = dataSource.pagination;
    if (sorts) {
      if (sorts.length > 0) {
        return { name: sorts[0].property, direction: sorts[0].direction };
      }
      return undefined;
    }
    return undefined;
  }, [dataSource.pagination]);

  /**
   * 翻页、排序时的回调函数
   */
  const onChange = useCallback(
    (
      pageNo: number,
      pageSize: number,
      sort?: { name: string; direction: 'desc' | 'asc' },
    ) => {
      dataSource.fetch(
        pageNo - 1,
        pageSize,
        sort ? [{ property: sort.name, direction: sort.direction }] : [],
      );
    },
    [dataSource],
  );

  const onClean = useCallback(() => {
    dataSource.clean();
    setSelectedRows([]);
  }, [dataSource]);

  return {
    ...dataSource,
    data: dataSource.items,
    loading: dataSource.isLoading,
    error: dataSource.isError,
    pagination,
    onSelect,
    selectedRows,
    setSelectedItems,
    refresh: dataSource.reload,
    getItem: dataSource.getItemById,
    create: dataSource.save,
    onChange,
    sort: sortInfo,
    clean: onClean,
  };
}

export default useRestTable;
