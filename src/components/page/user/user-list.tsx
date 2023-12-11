import { IProduct } from "@/client/sample/product";
import DefaultTable from "@/components/shared/ui/default-table";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  searchText: string;
  type: string;
};

const UserList = ({ searchText, type }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    data: any[];
    totalNum: number;
  }>();
  const [pageNum, setPageNum] = useState(1);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      setPageNum(pageNumber);
    },
    [router]
  );

  const getDatas = async () => {
    await axios
      .get(
        `http://api.greenberry.site:3000/user/admin/total/user?pageNum=${
          pageNum - 1
        }&limit=15&searchText=${searchText}&type=${type}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setData({
          data: [],
          totalNum: 0,
        });
      });
  };

  useEffect(() => {
    getDatas();
  }, [searchText, type]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "유저 코드",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "유저 이름",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "디바이스 코드",
      dataIndex: "deviceCode",
      align: "center",
      width: 150,
    },
    {
      title: "가입 일자",
      dataIndex: "registerAt",
      align: "center",
      width: 150,
    },
    {
      title: "생년월일",
      dataIndex: "birth",
      align: "center",
      width: 150,
    },
    {
      title: "핸드폰 번호",
      dataIndex: "phoneNumber",
      align: "center",
      width: 200,
    },
    {
      title: "성별",
      dataIndex: "gender",
      align: "center",
      width: 80,
    },
    {
      title: "키",
      dataIndex: "tall",
      align: "center",
      width: 100,
    },
    {
      title: "몸무게",
      dataIndex: "weight",
      align: "center",
      width: 100,
    },
  ];

  return (
    <>
      <DefaultTable<IProduct>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={{
          current: pageNum,
          defaultPageSize: 5,
          total: data?.totalNum || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.totalNum}
      />
    </>
  );
};

export default React.memo(UserList);
