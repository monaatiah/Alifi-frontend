import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Pattern1 from "./assets/1.png";
import Pattern2 from "./assets/2.svg";
import Image from "next/future/image";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [userType, setUserType] = useState("seller"); // "seller" or "serviceProvider"

  const onSubmit = (data) => {
    data.userType = userType;
    console.log(data);
  };

  return (
    <div className={styles["joinus-section"]}>
      <Container>
        <div className="inner">
          <Image
            src={Pattern1}
            alt=""
            width={120}
            height={140}
            className="pattern-1"
          />
          <Pattern2 className="pattern-2" />
          <Row>
            <Col lg={6} xs={12}>
              <div className="info">
                <h3>انضم إلى عائلة أليفي</h3>
                <p>
                  <b>كن جزءًا من مجتمع أليفي </b>هل تملك متجرًا أو منتجات مخصصة
                  أو خدمات للحيوانات الأليفة؟انضم إلى شبكة أليفي وشاركنا شغفك
                </p>
              </div>
            </Col>
            <Col lg={6} xs={12}>
              <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <div className="user-type">
                      <button
                        type="button"
                        className={userType === "seller" ? "active" : ""}
                        onClick={() => setUserType("seller")}
                      >
                        انضم كبائع
                      </button>
                      <button
                        type="button"
                        className={
                          userType === "serviceProvider" ? "active" : ""
                        }
                        onClick={() => setUserType("serviceProvider")}
                      >
                        انضم كمقدّم خدمة
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="اسم المستخدم"
                      className="form-control"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <p className="error">هذا الحقل مطلوب</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="form-control"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <p className="error">هذا الحقل مطلوب</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      className="form-control"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && <p className="error">هذا الحقل مطلوب</p>}
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="رسالتك"
                      className="form-control"
                      {...register("message", { required: true })}
                    ></textarea>
                    {errors.message && <p className="error">هذا الحقل مطلوب</p>}
                  </div>
                  <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn">
                      انضم
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
