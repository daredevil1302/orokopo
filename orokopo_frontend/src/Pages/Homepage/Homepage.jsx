import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import {
  Redirect,
  Route,
  Link,
  useHistory,
  Switch,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb, Input, Space, Spin } from "antd";
import { showNotification } from "../../Notification";
import Items from "../../Components/Items/Items";
import {
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import AuthVerify from "../../Common/auth-verify";
import { useUser } from "../../UserContext";
import Login from "../Login/Login";
import Signup from "../SignUp/Signup";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Homepage = () => {
  const [items, setItems] = useState([]);
  const [selectedSearchKey, setSelectedSearchKey] = useState("");
  const [user, loginUser, logoutUser] = useUser(useUser);
  const [spin, setSpin] = useState(false);
  const location = useLocation();
  const axios = require("axios");
  const history = useHistory();

  const handleLogin = ({ email, password }) => {
    loginAction(email, password);
    setSpin(true);
  };

  const loginAction = (email, password) => {
    axios
      .post(`http://localhost:5000/auth/signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;
        const name = response.data.user.name;
        const id = response.data.user.id;
        const surname = response.data.user.surname;
        const currentUser = {
          id,
          name,
          surname,
          accessToken,
        };
        loginUser(currentUser);
        setSpin(false);
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data) {
          showNotification(e.response.data, "error");
        } else {
          showNotification("Invalid credentials", "error");
        }
        setSpin(false);
      });
  };

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
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname.substring(1)]}
        >
          <Menu.Item key="items">
            <Link to="/items">Items</Link>
          </Menu.Item>

          <Menu.Item key="categories">
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          {!user && (
            <>
              <Menu.Item key="login" className="float-right">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="signup" className="float-right">
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </>
          )}
          {user && (
            <>
              <Menu.Item key="myrents">
                <Link to="/myrents">My Rents</Link>
              </Menu.Item>

              {user && (
                <Menu.Item
                  key="change-password"
                  className="float-right"
                  icon={<LockOutlined />}
                >
                  <Link to="change-password">Change Password</Link>
                </Menu.Item>
              )}

              <div className="user-wrap float-right">
                <div className="user-icn">
                  <UserOutlined />
                </div>
                <div className="user-info-wrap">
                  <div>{user.name}</div>
                </div>
              </div>
            </>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <div className="site-layout-content">
          {spin && <Spin />}
          <Switch>
            <Route
              exact
              path={"/items"}
              render={() => (
                <Items
                  items={items}
                  searchOnEmpty={searchOnEmpty}
                  setSearchKey={setSelectedSearchKey}
                />
              )}
            ></Route>
            <Route
              exact
              path="/"
              render={() => {
                return user ? (
                  <Redirect to="/items" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              exact
              path="/login"
              component={() => <Login handleLogin={handleLogin} />}
            />
            <Route exact path="/signup" component={Signup} />
          </Switch>
          <AuthVerify logout={logoutUser} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Homepage;
