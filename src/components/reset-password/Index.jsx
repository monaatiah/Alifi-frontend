import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { resetPassword } from "@/store/actions";
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
      resetPassword({
        type: "reset-password",
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
              <h3>إعادة تعيين كلمة المرور الخاصة بك</h3>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="اسم المستخدم أو عنوان البريد الإلكتروني"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="error">هذا الحقل مطلوب</p>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="كلمة المرور"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <p className="error">هذا الحقل مطلوب</p>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="تأكيد كلمة المرور"
                    {...register("password_confirmation", { required: true })}
                  />
                  {errors.password_confirmation && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
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
