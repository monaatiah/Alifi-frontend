import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";

const ProductDescription = () => {
  return (
    <div className="product-description">
      <Container>
        <Row>
          <Col lg={12} className="mb-5">
            <div className="content">
              <h4>الوصف الكامل</h4>
              <p>
                هذا المنتج مصنوع من مكونات طبيعية عالية الجودة، ويقدم تجربة
                غذائية مشبعة وغنية بالقيم الغذائية. يساعد على دعم المناعة وتحسين
                صحة الفراء، ويوفر ترطيبًا ممتازًا للقطط.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} xs={6}>
            <div className="block">
              <FaStar color="#F2782B" size={40} />
              <h3>الخبرة</h3>
              <p>أكثر من 10 سنوات في الخدمة</p>
            </div>
          </Col>
          <Col lg={4} xs={6}>
            <div className="block">
              <PiCertificate color="#F2782B" size={40} />
              <h3>الشهادات</h3>
              <p>معتمدون من الهيئة البيطرية</p>
            </div>
          </Col>
          <Col lg={4} xs={6}>
            <div className="block">
              <GiTrophyCup color="#F2782B" size={40} />
              <h3>التخصصات</h3>
              <p>رعاية شاملة للحيوانات الأليفة</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDescription;
