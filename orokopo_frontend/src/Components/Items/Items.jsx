import React, { useEffect, useState } from "react";
import "./Items.scss";
import { Card, Row, Col, Button } from "antd";

const { Meta } = Card;

const Items = ({ items }) => {
  return (
    <div>
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
                actions={[<Button type="primary">Rent item</Button>]}
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
