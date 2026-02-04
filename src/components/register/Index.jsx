import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { signUp } from "@/store/actions";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

const Index = () => {
  const dispatch = useDispatch();
  const {
    reset: resetRegister,
    handleSubmit: handleRegisterSubmit,
    register: registerRegister,
    formState: { errors: registerErrors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const regsiterSubmit = (data) => {
    dispatch(
      signUp({
        type: "register",
        data: data,
        reset: resetRegister,
      }),
    );
  };

  return (
    <div className={styles["login-section"]}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} xs={12}>
            <div className="form-box register">
              <h3>إنشاء حساب جديد</h3>
              <form onSubmit={handleRegisterSubmit(regsiterSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="الاسم الكامل"
                    {...registerRegister("name", { required: true })}
                  />
                  {registerErrors.name && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="البريد الالكتروني"
                    {...registerRegister("email", { required: true })}
                  />
                  {registerErrors.email && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="رقم الهاتف"
                    {...registerRegister("phone", { required: true })}
                  />
                  {registerErrors.phone && (
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
                    {...registerRegister("password", { required: true })}
                  />
                  {registerErrors.password && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                  </button>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="تأكيد كلمة المرور"
                    {...registerRegister("password_confirmation", {
                      required: true,
                    })}
                  />
                  {registerErrors.password_confirmation && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    إنشاء حساب
                  </button>
                  <div className="hint">
                    لديك حساب بالفعل؟{" "}
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
