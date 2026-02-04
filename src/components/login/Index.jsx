import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { login } from "@/store/actions";
import { useDispatch } from "react-redux";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset: resetLogin,
    handleSubmit: handleLoginSubmit,
    register: registerLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = (data) => {
    dispatch(
      login({
        type: "login",
        data: data,
        reset: resetLogin,
      }),
    );
  };

  return (
    <div className={styles["login-section"]}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} xs={12}>
            <div className="form-box">
              <h3>تسجيل الدخول إلى حسابك</h3>
              <form onSubmit={handleLoginSubmit(loginSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="اسم المستخدم أو عنوان البريد الإلكتروني"
                    {...registerLogin("email", { required: true })}
                  />
                  {loginErrors.email && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="كلمة المرور"
                    {...registerLogin("password", { required: true })}
                  />
                  {loginErrors.password && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>
                <div className="form-group d-flex align-items-center justify-content-between gap-3">
                  <div className="remember">
                    <label>
                      <input type="checkbox" />
                      تذكرني
                    </label>
                  </div>
                  <div className="forgot-password">
                    <Link href="/forgot-password">
                      <a>هل نسيت كلمة المرور؟</a>
                    </Link>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    تسجيل الدخول
                  </button>
                  <div className="hint">
                    ليس لديك حساب؟{" "}
                    <Link href="/register">
                      <a>إنشاء حساب</a>
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
