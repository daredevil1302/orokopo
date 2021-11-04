import React, { useEffect, useState } from "react";
import { Button, Row, Col, Divider, Table, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "./MyRents.scss";
import * as moment from "moment";
import { showNotification } from "../../Notification";
var { Column } = Table;

const dataSource = [
  {
    ante: "dinamo",
  },
];
const MyRents = () => {
  const [myRents, setMyRents] = useState([]);

  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    fetchMyRents();
  }, []);

  const fetchMyRents = () => {
    axios
      .get("http://localhost:5000/rents/my")
      .then((res) => {
        res.data.forEach((item) => {
          item.date_from = moment(item.date_from).format("DD.MM.YYYY ");
          item.date_to = moment(item.date_to).format("DD.MM.YYYY ");
        });
        setMyRents(res.data);
      })
      .catch((e) => {
        showNotification("danda");
      });
  };

  const cancelRent = (id) => {
    axios
      .delete(`http://localhost:5000/rents/${id}/cancel`)
      .then((res) => {
        setCancel(!cancel);
        showNotification("Rent cancelled!");
      })
      .catch((e) => {
        showNotification(e.response.data.message, "error");
      });
  };

  return (
    <div>
      <Table dataSource={myRents}>
        <Column title="Rented from" dataIndex="date_from"></Column>
        <Column title="Rented until" dataIndex="date_to"></Column>
        <Column title="Item name" dataIndex={["item", "name"]}></Column>

        <Column
          title="Cancel rent"
          className="buttons-col"
          render={(record) => {
            return (
              <div className="btn-wrap">
                <Tooltip title="Cancel rent">
                  <Button
                    key="1"
                    shape="circle"
                    className="red-bg"
                    icon={<CloseCircleOutlined />}
                    onClick={() => cancelRent(record.id)}
                  ></Button>
                </Tooltip>
              </div>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
};

export default MyRents;
