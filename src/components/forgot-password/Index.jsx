import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { forgotPassword } from "@/store/actions";
import { useDispatch } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    dispatch(
      forgotPassword({
        type: "forgot-password",
        data: data,
        reset,
      }),
    );
  };

  return (
    <div className={styles["login-section"]}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} xs={12}>
            <div className="form-box">
              <h3>هل نسيت كلمة المرور؟</h3>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="البريد الإلكتروني"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="error">هذا الحقل مطلوب</p>}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    إعادة تعيين كلمة المرور
                  </button>
                  <div className="hint">
                    هل تذكر كلمة المرور؟{" "}
                    <Link href="/login">
                      <a>تسجيل الدخول</a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
