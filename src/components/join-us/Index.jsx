import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Pattern1 from "./assets/1.png";
import Pattern2 from "./assets/2.svg";
import Image from "next/future/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";
import { joinUs } from "@/store/actions";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [userType, setUserType] = useState("vendor"); // "vendor" or "service_provider"

  const { pageData } = useSelector((state) => state.settings);
  const joinData = getComponentByIdentifier(
    pageData?.page_components,
    "apply_form",
  );

  const onSubmit = (data) => {
    const formattedData = {
      mutate: [
        {
          operation: "create",
          attributes: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            request_type: userType,
            request_status: "pending",
          },
        },
      ],
    };

    dispatch(
      joinUs({
        data: formattedData,
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
                    <div className="user-type">
                      <button
                        type="button"
                        className={userType === "vendor" ? "active" : ""}
                        onClick={() => setUserType("vendor")}
                      >
                        انضم كبائع
                      </button>
                      <button
                        type="button"
                        className={
                          userType === "service_provider" ? "active" : ""
                        }
                        onClick={() => setUserType("service_provider")}
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
