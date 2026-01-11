import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { login, signUp } from "@/store/actions";

const Index = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const loginSubmit = (data) => {
    console.log(data);

    dispatch(
      login({
        type: "login",
        data: data,
        reset,
      })
    );
  };

  const regsiterSubmit = (data) => {
    dispatch(
      signUp({
        type: "register",
        data: data,
        reset,
      })
    );
  };

  return (
    <div className={styles["login-section"]}>
      <Container>
        <Row>
          <Col lg={6} xs={12}>
            <div className="form-box">
              <h3>تسجيل الدخول إلى حسابك</h3>
              <form onSubmit={handleSubmit(loginSubmit)}>
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
                </div>
              </form>
            </div>
          </Col>
          <Col lg={6} xs={12}>
            <div className="form-box register">
              <h3>إنشاء حساب جديد</h3>
              <form onSubmit={handleSubmit(regsiterSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="الاسم الكامل"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <p className="error">هذا الحقل مطلوب</p>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="البريد الالكتروني"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="error">هذا الحقل مطلوب</p>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="رقم الهاتف"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <p className="error">هذا الحقل مطلوب</p>}
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
                  {errors.password && <p className="error">هذا الحقل مطلوب</p>}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    إنشاء حساب
                  </button>
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
