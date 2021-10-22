import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Input, Space } from "antd";
import Items from "../../Components/Items/Items";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Homepage = () => {
  const [items, setItems] = useState([]);
  const [selectedSearchKey, setSelectedSearchKey] = useState("");
  const axios = require("axios");
  const history = useHistory();

  const fetchItems = () => {
    let url = `http://localhost:5000/items/all`;
    if (selectedSearchKey !== "") {
      url += `?search=${selectedSearchKey}`;
    }
    axios
      .get(url)
      .then((res) => {
        setItems(res.data);
      })
      .then(() => history.push("/items"));
  };
  const searchOnEmpty = (e) => {
    if (e.target.value === "") {
      setSelectedSearchKey("");
    }
  };
  useEffect(() => {
    fetchItems();
  }, [selectedSearchKey]);

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
            onSearch={(e) => setSelectedSearchKey(e)}
            onChange={searchOnEmpty}
            enterButton
            size="large"
          />
        </Space>

        <div className="site-layout-content">
          <Route
            exact
            path={"/items"}
            render={() => <Items items={items} />}
          ></Route>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Homepage;
