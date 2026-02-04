import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { resetPassword } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const { token, email } = router.query || {};

    if (email) {
      setValue("email", email);
    }

    if (token) {
      setValue("token", token);
    }

    if (token || email) {
      router.replace("/reset-password", undefined, { shallow: true });
    }
  }, [router.isReady, router.query, setValue]);

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
                <input
                  type="hidden"
                  {...register("email", { required: true })}
                />
                <input type="hidden" {...register("token")} />
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
                    {...register("password", { required: true })}
                  />
                  {errors.password && <p className="error">هذا الحقل مطلوب</p>}
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
