import React from "react";
import { Divider } from "antd";
import "./Title.scss";

const Title = ({ title }) => {
  return (
    <div className="title-wrap">
      <span className="title">{title}</span>
      <Divider />
    </div>
  );
};

export default Title;
