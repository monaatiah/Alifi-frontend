import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Pattern1 from "./assets/1.png";
import Pattern2 from "./assets/2.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";
import { submitServiceRequest } from "@/store/actions";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { pageData } = useSelector((state) => state.settings);
  const { singleService } = useSelector((state) => state.services);
  const joinData = getComponentByIdentifier(
    pageData?.page_components,
    "apply_vendor",
  );

  const onSubmit = (data) => {
    dispatch(
      submitServiceRequest({
        marketplace_service_id: singleService?.id,
        customer_name: data.name,
        customer_phone: data.phone,
        customer_email: data.email,
        message: data.message,
        reset,
      }),
    );
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
          <Row className="w-100">
            <Col lg={6} xs={12}>
              <div className="info">
                <h3>{joinData?.data?.title}</h3>
                <p>{joinData?.data?.description}</p>
              </div>
            </Col>
            <Col lg={6} xs={12}>
              <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      dir="ltr"
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
