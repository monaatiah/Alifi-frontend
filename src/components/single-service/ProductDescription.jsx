import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";

const normalizeService = (singleService) =>
  singleService?.id != null
    ? singleService
    : (singleService?.data ?? singleService);

const ProductDescription = ({ singleService }) => {
  const serviceData = normalizeService(singleService);
  const features = Array.isArray(serviceData?.service_features)
    ? serviceData.service_features
    : [];

  return (
    <div className="product-description">
      <Container>
        <Row>
          <Col lg={12} className="mb-5">
            <div className="content">
              <h4>الوصف الكامل</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceData?.description || "",
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={4} xs={6}>
            <div className="block">
              <FaStar color="#F2782B" size={40} />
              <h3>الفئة</h3>
              <p>{serviceData?.category?.name || "غير محدد"}</p>
            </div>
          </Col>
          <Col lg={4} xs={6}>
            <div className="block">
              <PiCertificate color="#F2782B" size={40} />
              <h3>مدة الخدمة</h3>
              <p>
                {serviceData?.duration_minutes
                  ? `${serviceData.duration_minutes} دقيقة`
                  : "غير محدد"}
              </p>
            </div>
          </Col>
          <Col lg={4} xs={6}>
            <div className="block">
              <GiTrophyCup color="#F2782B" size={40} />
              <h3>الحالة</h3>
              <p>{serviceData?.status || "غير محدد"}</p>
            </div>
          </Col>
        </Row>

        {(features.length > 0 ||
          serviceData?.preparation_instructions ||
          serviceData?.cancellation_rules) && (
          <Row className="mt-4">
            {features.length > 0 && (
              <Col lg={4} xs={12}>
                <div className="content details-block">
                  <h4>المميزات</h4>
                  <ul>
                    {features.map((feature, index) => (
                      <li key={`${feature}-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            )}
            {serviceData?.preparation_instructions && (
              <Col lg={4} xs={12}>
                <div className="content details-block">
                  <h4>تعليمات التحضير</h4>
                  <p>{serviceData.preparation_instructions}</p>
                </div>
              </Col>
            )}
            {serviceData?.cancellation_rules && (
              <Col lg={4} xs={12}>
                <div className="content details-block">
                  <h4>سياسة الإلغاء</h4>
                  <p>{serviceData.cancellation_rules}</p>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProductDescription;
