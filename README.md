# @sinoui/use-rest-table

[![npm version](https://img.shields.io/npm/v/@sinoui/use-rest-table)](https://www.npmjs.com/package/@sinoui/use-rest-table)
[![downloads](https://img.shields.io/npm/dm/@sinoui/use-rest-table)](https://www.npmjs.com/package/@sinoui/use-rest-table)

@sinoui/use-rest-table 旨在简化与@sinoui/data-table 的相关处理。

## 安装

使用`yarn`：

```shell
yarn add @sinoui/use-rest-table
```

使用`npm`:

```shell
npm i --save @sinoui/use-rest-table
```

## 快速使用

```typescript
import React from 'react';
import useRestTable from '@sinoui/use-rest-table';
import DataTable, { TableColumn } from '@sinoui/data-table';

function ListDemo() {
  const dataSource = useRestTable('/users', [], { keyName: 'userId' });

  return (
    <DataTable {...dataSource}>
      <TableColumn name="userName" width={100} title="姓名" />
      <TableColumn name="age" width={100} title="年龄" />
    </DataTable>
  );
}
```

## dataSource 的属性和方法

`@sinoui/use-rest-table`的`dataSource`继承了[use-rest-page-api 的所有属性和方法](https://sinoui.github.io/use-rest-page-api/#datasource-%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95)，除此之外还有以下方法：

- `data` 表示列表数据
- `loading` 表示数据加载中的状态
- `error` 表示加载错误的状态
- `onSelect()` 列表选中时的回调函数
- `selectedRows` 表示列表的选中项
- `setSelectedItems()` 设置列表选中项的回调函数
- `refresh()` 重新加载数据列表数据
- `getItem()` 从列表数据中获取其中一条数据信息(不与后端交互)
- `create()` 新增一条数据
- `onChange()` 翻页、排序时的回调函数
- `sort` 排序信息，类型为`object`
- `clean()` 清空列表数据时的回调函数
