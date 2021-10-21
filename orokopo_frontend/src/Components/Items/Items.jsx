import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";

const { Meta } = Card;

const Items = () => {
  const [items, setItems] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios.get("http://localhost:5000/items/all").then((res) => {
      setItems(res.data);
    });
  });

  return (
    <div>
      <Row>
        {items.forEach((item) => {
          <Col flex="auto">
            <Card
              hoverable
              style={{ width: 120 }}
              cover={<img alt="example" src={`${item.imageUrl}`} />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>;
        })}
      </Row>
    </div>
  );
};

export default Items;
