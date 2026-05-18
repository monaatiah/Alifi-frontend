import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiClock1, CiMobile3 } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getFormSchema, postFormSubmission } from "@/store/actions";
import {} from "@/helpers/functions";

const Index = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(
      getFormSchema({
        slug: "contact-us",
      }),
    );
  }, [dispatch]);

  const { settings, formSchema } = useSelector((state) => state.settings);

  const onSubmit = (data) => {
    dispatch(
      postFormSubmission({
        data,
        slug: formSchema?.slug,
        reset: reset,
      }),
    );
  };

  return (
    <div className={styles["contact-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle="نحن نحب أن نسمع منك"
          secTitle="رعاية الحيوانات الأليفة من قبل خبراء"
        />
        <div className="top">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <MdOutlineMailOutline />
                </div>
                <div className="info">
                  <h4>البريد الإلكتروني</h4>
                  <p>
                    <Link
                      href={`mailto:${settings?.contact_email?.split("/")[4]}`}
                    >
                      <a> {settings?.contact_email?.split("/")[4]}</a>
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <CiMobile3 />
                </div>
                <div className="info">
                  <h4> رقم التليفون</h4>
                  <p className="d-flex flex-column gap-1">
                    <Link
                      href={`tel:${settings?.contact_phone?.split("/")[4]}`}
                    >
                      <a>{settings?.contact_phone?.split("/")[4]}</a>
                    </Link>
                    <span>خدمة عملاء متاحة 24/7 للرد على استفساراتك</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <CiClock1 />
                </div>
                <div className="info">
                  <h4> ساعات العمل</h4>
                  <p className="d-flex flex-column gap-1">
                    <span>
                      {
                        settings?.static_strings?.find(
                          (str) => str?.key === "workTimes",
                        )?.value
                      }
                    </span>
                    <span>
                      {
                        settings?.static_strings?.find(
                          (str) => str?.key === "workDays",
                        )?.value
                      }
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={6} sm={12}>
            <div className="addresses">
              <ul>
                <li>
                  <h4>
                    <FaMapMarkerAlt />
                    المقر الرئيسي :
                  </h4>
                  <p>
                    123 شارع الحيوانات الأليفة، مدينة الحيوان، دولة الحيوان
                    45678
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="contact-form">
              <h3>احجز مكانك أو اكتشف المزيد</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  {formSchema?.fields?.map((field) => (
                    <Col lg={12} key={field?.id}>
                      <div className="form-group">
                        {field?.type === "textarea" ? (
                          <textarea
                            placeholder={field?.label}
                            className="form-control"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          />
                        ) : field?.type === "select" ? (
                          <select
                            className="form-control form-select"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          >
                            <option value="">اختر خيارًا</option>
                            {field?.options?.map((option, index) => (
                              <option value={option?.value} key={index}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field?.type}
                            placeholder={field?.label}
                            className="form-control"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          />
                        )}
                        {errors[field?.key] && (
                          <p className="error">
                            {errors[field?.key]?.type === "required" &&
                              "هذا الحقل مطلوب"}
                            {errors[field?.key]?.type === "pattern" &&
                              errors[field?.key]?.message}
                          </p>
                        )}
                      </div>
                    </Col>
                  ))}
                  <Col lg={12}>
                    <div className="form-group d-flex justify-content-end">
                      <button type="submit" className="btn">
                        أرسل الرسالة
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
