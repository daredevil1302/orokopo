import React, { useEffect, useState } from "react";
import "./Items.scss";
import { useUser } from "../../UserContext";
import { Card, Row, Col, Button, Space, Input } from "antd";

const { Meta } = Card;

const { Search } = Input;

const Items = ({ items, searchOnEmpty, setSearchKey, openModal }) => {
  const [user] = useUser(useUser);
  return (
    <div>
      <Space style={{ width: 300, paddingBottom: "40px" }} direction="vertical">
        <Search
          placeholder="Browse items"
          onSearch={setSearchKey}
          onChange={searchOnEmpty}
          enterButton
          size="large"
        />
      </Space>
      <Row gutter={[24, 24]}>
        {items.map((item) => {
          return (
            <Col xs={24} xl={8}>
              <Card
                size={"small"}
                hoverable
                bordered={true}
                // style={{ width: 240 }}
                cover={<img alt="example" src={`${item.imageUrl}`} />}
                actions={[
                  <Button
                    type="primary"
                    disabled={user ? false : true}
                    onClick={() => openModal(item)}
                  >
                    Rent item
                  </Button>,
                ]}
              >
                <Meta
                  title={`${item.name}`}
                  description={`${item.description}`}
                />
                <p className="price">{item.price} kn/day</p>
              </Card>
            </Col>
          );
        })}
        ;
      </Row>
    </div>
  );
};

export default Items;
