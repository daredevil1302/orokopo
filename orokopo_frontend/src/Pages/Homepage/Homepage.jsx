import React, { useEffect } from "react";
import "./Homepage.scss";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Input, Space } from "antd";
import Items from "../../Components/Items/Items";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("items");
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/myrents">My Rents</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Space
          style={{ width: 300, paddingBottom: "40px" }}
          direction="vertical"
        >
          <Search
            placeholder="Browse items"
            onSearch={() => console.log("dinamo")}
            enterButton
            size="large"
          />
        </Space>
        <Route exact path={"/items"} component={Items}></Route>
        <div className="site-layout-content"></div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Homepage;
