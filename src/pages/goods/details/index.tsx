import React, { useRef } from 'react';

import { history } from 'umi';

import { Button, Image } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { reqTableList } from '@/services/goods';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  // 表格的ref, 便于自定义操作表格
  const actionRef = useRef<any>();

  const handleTable = async (params: API.ParamsType) => {
    const res = await reqTableList(params);
    if (res?.code === 200) {
      const { total, list } = res.data;
      return {
        data: list,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total,
      };
    }
  };

  const columns: any = [
    {
      width: 50,
      fixed: 'left',
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      width: 80,
      title: '商品图',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
      render: (
        _: any,
        record: {
          thumb: string | undefined;
        },
      ) => <Image width={40} src={record.thumb} />,
    },
    {
      align: 'center',
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 280,
      tip: '标题过长会自动收缩',
      fixed: 'left',
    },
    {
      align: 'center',
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },

    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_: any, record: { id: string }) => <a>编辑</a>,
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          columns={columns}
          actionRef={actionRef}
          request={async (params): Promise<any> => handleTable(params)}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          headerTitle="用户列表"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                history.push({
                  pathname: '/goods/addDetails',
                  query: {
                    type: 'add',
                  },
                });
              }}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  );
};

export default Index;
