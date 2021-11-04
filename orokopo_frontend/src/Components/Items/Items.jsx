import React, { useEffect, useState } from "react";
import "./Items.scss";
import { useUser } from "../../UserContext";
import {
  Form,
  Card,
  Row,
  Col,
  Button,
  Space,
  Input,
  Modal,
  Select,
  Radio,
} from "antd";

const { Meta } = Card;
const { Option } = Select;
const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 16 },
};
const options = [
  <Option value={1}>Knjige</Option>,
  <Option value={2}>Alati</Option>,
  <Option value={3}>Glazba</Option>,
  <Option value={4}>Fotografija</Option>,
  <Option value={5}>Oprema</Option>,
  <Option value={6}>Elektronika</Option>,
  <Option value={7}>Video igrice</Option>,
  <Option value={8}>Odjevni predmeti</Option>,
  <Option value={9}>Sport i Fitness</Option>,
  <Option value={10}>Za djecu</Option>,
  <Option value={11}>Kampiranje</Option>,
  <Option value={12}>Skladištenje</Option>,
];
const { Search } = Input;

const Items = ({ items, searchOnEmpty, setSearchKey, openModal }) => {
  const [itemModal, setItemModal] = useState(false);
  const [valued, setValued] = useState(0);
  const [valuec, setValuec] = useState(0);
  const [user] = useUser(useUser);
  const [form] = Form.useForm();
  const addItem = () => {};

  const changeValued = (e) => {
    setValued(e.target.value);
  };
  const changeValuec = (e) => {
    setValuec(e.target.value);
  };
  return (
    <div>
      <Row
        gutter={48}
        style={{ paddingBottom: "40px", justifyContent: "center" }}
        justify="center"
      >
        <Col>
          {/* <Space
            style={{ width: 300, paddingBottom: "40px" }}
            direction="vertical"
          > */}
          <Search
            style={{ width: "300px" }}
            placeholder="Browse items"
            onSearch={setSearchKey}
            onChange={searchOnEmpty}
            enterButton
            size="large"
          />

          {/* </Space> */}
        </Col>
        <Col style={{ paddingTop: "5px" }}>
          <Button onClick={() => setItemModal(true)} type="primary">
            Add Item
          </Button>
        </Col>
      </Row>
      <Modal
        title="Add an item"
        visible={itemModal}
        onCancel={() => setItemModal(false)}
        centered={true}
        bodyStyle={{ paddingLeft: "130px" }}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
          });
        }}
        okText="Add item"
        cancelText="Cancel"
      >
        <Form form={form} layout={"vertical"} {...layout} name="item_input">
          <Form.Item
            name="item_name"
            label="Item name"
            rules={[
              {
                required: true,
                message: "Item name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description
            "
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="delivery"
            label="Delivery"
            rules={[
              {
                required: true,
                message: "Specify delivery policy",
              },
            ]}
          >
            <Radio.Group onChange={changeValued} value={valued}>
              <Radio value={1}>Available</Radio>
              <Radio value={2}>Not available</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="cancellation"
            label="Cancellation"
            rules={[
              {
                required: true,
                message: "Specify cancellation policy",
              },
            ]}
          >
            <Radio.Group onChange={changeValuec} value={valuec}>
              <Radio value={1}>Available</Radio>
              <Radio value={2}>Not available</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Select item categories",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Choose a category" allowClear>
              {options}
            </Select>
          </Form.Item>
          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[
              {
                required: true,
                message: "Image URL required",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
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
                    disabled={user && item.user.id !== user.id ? false : true}
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
