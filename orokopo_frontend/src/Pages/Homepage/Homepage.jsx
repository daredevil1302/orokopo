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
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Space,
  Spin,
  Modal,
  DatePicker,
  Divider,
  Descriptions,
} from "antd";
import moment from "moment";
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
import ChangePass from "../ChangePass/ChangePass";
import { showNotification } from "../../Notification";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Homepage = () => {
  const [items, setItems] = useState([]);
  const [selectedSearchKey, setSelectedSearchKey] = useState("");
  const [user, loginUser, logoutUser] = useUser(useUser);
  const [spin, setSpin] = useState(false);
  const [pickedFrom, setPickedFrom] = useState();
  const [pickedUntil, setPickedUntil] = useState();
  const [currentItem, setCurrentItem] = useState({});
  const [difference, setDifference] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const axios = require("axios");
  const history = useHistory();

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const handleLogin = ({ email, password }) => {
    loginAction(email, password);
    setSpin(true);
  };

  const openModal = (item) => {
    setIsModalVisible(true);
    setCurrentItem(item);
  };

  const createRent = () => {
    axios
      .post("http://localhost:5000/rents/createRent", {
        date_from: pickedFrom,
        date_to: pickedUntil,
        userId: user.id,
        itemId: currentItem.id,
      })
      .then(() => {
        showNotification("Item rented");
        setCurrentItem({});
        setDifference(null);
        setIsModalVisible(false);
        setPickedFrom(null);
        setPickedUntil(null);
      })
      .catch((e) => {
        showNotification(e.response.data.message, "error");
      });
  };

  const closeModal = () => {
    createRent();
  };

  const cancelModal = () => {
    setCurrentItem({});
    setDifference(null);
    setIsModalVisible(false);
    setPickedFrom(null);
    setPickedUntil(null);
  };

  const handleDate = (date) => {
    if (date) {
      const currentDate = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const daydiff = date.startOf("day").diff(currentDate, "days");
      setDifference(daydiff);
    }
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
        showNotification("Login successful!");
        loginUser(currentUser);
        setSpin(false);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          showNotification(e.response.data.message, "error");
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
        setSpin(false);
      })
      .then(() => history.push("/items"));
  };
  const searchOnEmpty = (e) => {
    if (e.target.value === "") {
      setSelectedSearchKey("");
    }
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/items");
  };

  useEffect(() => {
    fetchItems();
    setSpin(true);
  }, [selectedSearchKey]);

  useEffect(() => {
    if (pickedFrom && pickedUntil) {
      let difference = pickedUntil
        .startOf("day")
        .diff(pickedFrom.startOf("day"), "days");
      setDifference(difference);
    }
  }, [pickedFrom, pickedUntil]);

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
                <>
                  <Menu.Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    onClick={() => handleLogout()}
                    className="float-right"
                  >
                    Log out
                  </Menu.Item>
                  <Menu.Item
                    key="change-password"
                    className="float-right"
                    icon={<LockOutlined />}
                  >
                    <Link to="change-password">Change Password</Link>
                  </Menu.Item>
                </>
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
          <Modal
            title="Rent details"
            visible={isModalVisible}
            onCancel={cancelModal}
            onOk={closeModal}
            okText="Confirm rent"
            cancelText="Cancel rent"
          >
            <Space direction="vertical">
              <DatePicker
                allowClear={false}
                placeholder="Rent from: "
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                onChange={(date) => {
                  if (date) {
                    // const currentDate = moment()
                    //   .startOf("day")
                    //   .format("YYYY-MM-DD HH:mm:ss");
                    // const daydiff = date
                    //   .startOf("day")
                    //   .diff(currentDate, "days");
                    // setDifference(daydiff);
                    setPickedFrom(date);
                  }
                }}
                value={pickedFrom ? pickedFrom : null}
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                className="date-picker2"
              />
              <DatePicker
                allowClear={false}
                placeholder="Rent until: "
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                onChange={(date) => {
                  if (date) {
                    // const currentDate = moment()
                    //   .startOf("day")
                    //   .format("YYYY-MM-DD HH:mm:ss");
                    // const daydiff = date
                    //   .startOf("day")
                    //   .diff(currentDate, "days");
                    // setDifference(daydiff);
                    setPickedUntil(date);
                  }
                }}
                value={pickedUntil ? pickedUntil : null}
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                className="date-picker2"
              />
            </Space>

            {difference && (
              <>
                <Divider />
                <Descriptions title={`Total price for ${difference} days is: `}>
                  <Descriptions.Item>
                    {currentItem.price * difference} kn
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}
          </Modal>
          <Switch>
            <Route
              exact
              path={"/items"}
              render={() => (
                <Items
                  items={items}
                  searchOnEmpty={searchOnEmpty}
                  setSearchKey={setSelectedSearchKey}
                  openModal={openModal}
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
            <Route
              exact
              path="/change-password"
              render={() => (user ? <ChangePass /> : <Redirect to="/login" />)}
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
