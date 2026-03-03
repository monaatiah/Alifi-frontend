import React from "react";
import { Col, Container, Row } from "react-bootstrap";

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
          <Col style={{ flex: "0 0 20%" }}>
            <div className="content">
              <h4>الفوائد الرئيسية</h4>
              <ul>
                <li> يدعم صحة الجهاز الهضمي</li>
                <li>عالي الترطيب</li>
                <li>خالٍ من المواد الحافظة</li>
                <li>مناسب للقطط الحساسة</li>
              </ul>
            </div>
          </Col>

          <Col style={{ flex: "0 0 20%" }}>
            <div className="content">
              <h4> تفاصيل المنتج</h4>
              <ul>
                <li>النوع: وجبة رطبة</li>
                <li>العمر: قطط بالغة</li>
                <li>الوزن: 85 جرام</li>
                <li> النكهة: تونة برية مع اليقطين</li>
                <li> القوام: شوربة</li>
                <li>بلد المنشأ: تايلاند</li>
              </ul>
            </div>
          </Col>

          <Col style={{ flex: "0 0 20%" }}>
            <div className="content">
              <h4> التحليل الغذائي</h4>
              <ul>
                <li>بروتين: 12%</li>
                <li> دهون: 1.5%</li>
                <li> ألياف: 0.5%</li>
                <li>رطوبة: 85%</li>
                <li>رماد: 1%</li>
              </ul>
            </div>
          </Col>

          <Col style={{ flex: "0 0 20%" }}>
            <div className="content">
              <h4> المكونات</h4>
              <ul>
                <li>تونة</li>
                <li>شوربة تونة طبيعية</li>
                <li>اليقطين</li>
                <li> فيتامين E</li>
                <li>معادن أساسية</li>
              </ul>
            </div>
          </Col>

          <Col style={{ flex: "0 0 20%" }}>
            <div className="content">
              <h4> طريقة التقديم</h4>
              <ul>
                <li>يقدم كما هو أو مع الطعام الجاف</li>
                <li>يقدم 1–2 مرة يوميًا</li>
                <li>يجب توفير الماء دائمًا</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDescription;
