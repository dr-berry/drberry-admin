import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import UserList from "@/components/page/user/user-list";
import UserSearch from "@/components/page/user/user-search";
import { useState } from "react";

const pageHeader: IPageHeader = {
  title: "Dr.berry User 리스트",
};

const IndexPage: IDefaultLayoutPage = () => {
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("name");

  return (
    <>
      <UserSearch searchText={searchText} setSearchText={setSearchText} type={type} setType={setType} />
      <UserList searchText={searchText} type={type} />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
