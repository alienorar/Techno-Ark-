import { useEffect, useState } from "react";
import { Card, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { settings } from "@service";

const { Text } = Typography;
const Index = () => {
  const [data, setData] = useState();
  const dataKey = ["First name", "Email", "Last name", "Phone number"];

  const getData = async () => {
    const id = Number(localStorage.getItem("id"));
    try {
      const res:any = await settings.get(id);
      if (res.status === 200) {
        const dataSetter = res?.data?.data
        setData(dataSetter);

      }
    } catch (error) {

    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Card
        style={{
          width: "100%",
        }}
      >
        <Row
          gutter={16}
          align="middle"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Col
            span={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar size={200} icon={<UserOutlined />} />
          </Col>
          <Col span={18}>
            <Row gutter={[16, 16]}>
              {dataKey.map((item, index) => (
                <Col span={12} key={index}>
                  <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                    {item}
                  </Text>
                  <br />
                  <Text style={{ fontSize: "24px" }}>
                    {data && data[item.toLowerCase().replace(" ", "_")]}
                  </Text>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Index;
