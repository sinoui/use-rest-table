import { renderHook } from 'react-hooks-testing-library';
import http from '@sinoui/http';
import useRestTable from './useRestTable';

jest.mock('@sinoui/http');

afterEach(() => {
  (http.get as jest.Mock).mockReset();
});

it('验证列表选中项', async () => {
  (http.get as jest.Mock).mockResolvedValue({
    content: [
      { userId: '1', userName: '张三' },
      { userId: '2', userName: '李四' },
      { userId: '3', userName: '王五' },
      { userId: '4', userName: '赵六' },
    ],
    number: 0,
    size: 15,
    totalElements: 4,
  });

  const { result, waitForNextUpdate } = renderHook(() =>
    useRestTable('/test', [], {
      keyName: 'userId',
    }),
  );

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  result.current.onSelect(
    ['1', '2'],
    [{ userId: '1', userName: '张三' }, { userId: '2', userName: '李四' }],
  );

  expect(result.current.selectedRows).toEqual([
    { userId: '1', userName: '张三' },
    { userId: '2', userName: '李四' },
  ]);

  result.current.setSelectedItems([{ userId: '3', userName: '王五' }]);

  expect(result.current.selectedRows).toEqual([
    { userId: '1', userName: '张三' },
    { userId: '2', userName: '李四' },
  ]);

  result.current.setSelectedItems([{ userId: '3', userName: '王五' }], true);

  expect(result.current.selectedRows).toEqual([
    { userId: '3', userName: '王五' },
  ]);
});

it('onChange', async () => {
  (http.get as jest.Mock).mockResolvedValue({
    content: [
      { userId: '1', userName: '张三' },
      { userId: '2', userName: '李四' },
      { userId: '3', userName: '王五' },
      { userId: '4', userName: '赵六' },
    ],
    number: 0,
    size: 15,
    totalElements: 4,
  });

  const { result, waitForNextUpdate } = renderHook(() =>
    useRestTable('/test', [], {
      keyName: 'userId',
    }),
  );

  await waitForNextUpdate();
  result.current.onChange(3, 15, { name: 'userId', direction: 'desc' });

  expect((http.get as jest.Mock).mock.calls[1][0]).toMatch(
    '/test?page=2&size=15&sort=userId%2Cdesc',
  );

  result.current.onChange(4, 15);

  expect((http.get as jest.Mock).mock.calls[2][0]).toMatch(
    '/test?page=3&size=15',
  );
});

it('清空列表', async () => {
  (http.get as jest.Mock).mockResolvedValue({
    content: [
      { userId: '1', userName: '张三' },
      { userId: '2', userName: '李四' },
      { userId: '3', userName: '王五' },
      { userId: '4', userName: '赵六' },
    ],
    number: 0,
    size: 15,
    totalElements: 4,
  });

  const { result, waitForNextUpdate } = renderHook(() =>
    useRestTable('/test', [], {
      keyName: 'userId',
    }),
  );

  await waitForNextUpdate();

  result.current.clean();

  expect(result.current.items.length).toBe(0);
  expect(result.current.selectedRows.length).toBe(0);
});

it('验证useRestTable的返回值', async () => {
  (http.get as jest.Mock).mockResolvedValue({
    content: [
      { userId: '1', userName: '张三' },
      { userId: '2', userName: '李四' },
      { userId: '3', userName: '王五' },
      { userId: '4', userName: '赵六' },
    ],
    number: 0,
    size: 15,
    totalElements: 4,
  });

  const { result, waitForNextUpdate } = renderHook(() =>
    useRestTable('/test', [], {
      keyName: 'userId',
    }),
  );

  await waitForNextUpdate();

  expect(result.current.keyName).toBe('userId');
  expect(result.current.pagination).toEqual({
    pageSize: 15,
    total: 4,
    currentPage: 1,
  });
  expect(result.current.data).toEqual(result.current.items);
  expect(result.current.loading).toBe(result.current.isLoading);
  expect(result.current.error).toBe(result.current.isError);
  expect(result.current.refresh).toEqual(result.current.reload);
});
