import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";

const Extras = () => {
  return (
    <div className="extra-services">
      <Container>
        <Row>
          <Col xs={6} lg={3}>
            <div className="service-block">
              <div className="img">
                <Image
                  src={Image1}
                  alt="service image"
                  width={325}
                  height={325}
                />
              </div>
              <div className="info">
                <h3>الرعاية المنزلية</h3>
                <p>مقدّمو رعاية موثوقون أثناء غيابك.</p>
                <span>150 ريال - 300 ريال</span>
              </div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className="service-block">
              <div className="img">
                <Image
                  src={Image2}
                  alt="service image"
                  width={325}
                  height={325}
                />
              </div>
              <div className="info">
                <h3>الاستشارات الغذائية</h3>
                <p>نصائح وخطط تغذية بإشراف مختصين.</p>
                <span>150 ريال - 300 ريال</span>
              </div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className="service-block">
              <div className="img">
                <Image
                  src={Image3}
                  alt="service image"
                  width={325}
                  height={325}
                />
              </div>
              <div className="info">
                <h3> العناية والتجميل</h3>
                <p>تنظيف، قص شعر، والعناية بالأظافر.</p>
                <span>150 ريال - 300 ريال</span>
              </div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className="service-block">
              <div className="img">
                <Image
                  src={Image3}
                  alt="service image"
                  width={325}
                  height={325}
                />
              </div>
              <div className="info">
                <h3> التدريب والسلوك</h3>
                <p>تنظيف، قص شعر، والعناية بالأظافر.</p>
                <span>150 ريال - 300 ريال</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Extras;
