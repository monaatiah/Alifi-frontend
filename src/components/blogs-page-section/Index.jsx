import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import Link from "next/link";
// import userPlaceholder from "./assets/user.png";
import BlogImg from "./assets/blog.png";
import { ImageWithFallback } from "@/helpers/functions";
import Pagination from "../Shared/Pagination";
import { useForm } from "react-hook-form";
import { postFormSubmission } from "@/store/actions";

const Index = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { content } = useSelector((state) => state.content);
  const { formSchema } = useSelector((state) => state.settings);

  const [currentPage, setCurrentPage] = useState(1);

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
    <div className={styles["blogs-section"]}>
      <Container>
        <Row>
          <Col xxl={9} lg={8}>
            <div className="blogs-wrap">
              {content?.data?.map((item) => (
                <div className="block" key={item?.id}>
                  <div className="img">
                    <ImageWithFallback
                      src={item?.cover_image || ""}
                      alt={item?.title}
                      width={415}
                      height={260}
                    />
                    <Link href={`/blogs/${item?.slug}`}>
                      <a aria-label={item?.title}></a>
                    </Link>
                    {/* <span>
                      {item?.tags?.map((tag) => tag.name).join(", ") || ""}
                    </span> */}
                  </div>
                  <div className="info d-flex align-items-start">
                    <div className="date d-flex flex-column align-items-center justify-content-center">
                      <span>
                        {new Date(item?.published_at).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                          },
                        )}
                      </span>
                      {new Date(item?.published_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </div>
                    <div className="info-data">
                      <h3>
                        <Link href={`/blogs/${item.slug}`}>
                          <a>{item?.title}</a>
                        </Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.body?.substring(0, 100) + "...",
                        }}
                      />
                      {/* <div className="author d-flex align-items-center gap-3">
                        <div className="au-img">
                          <Image
                            src={item?.author?.avatar || userPlaceholder}
                            alt={item?.author?.name}
                            width={50}
                            height={50}
                          />
                        </div>
                        <span>
                          {item?.data?.author_name || item?.author?.name}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={content?.last_page}
              maxPagesToShow={5}
            />
          </Col>
          <Col xxl={3} lg={4}>
            <div className="blogs-sidebar">
              <div className="widget">
                <div className="widget-title">
                  <h4>مقالات شائعة</h4>
                </div>
                <div className="recent-blogs">
                  <div className="d-flex align-items-center gap-3">
                    <div className="img">
                      <Image
                        src={BlogImg}
                        alt="Blog Title"
                        width={90}
                        height={80}
                      />
                    </div>
                    <div className="info">
                      <div className="date">March 15, 2026</div>
                      <div className="title">
                        <Link href="/blog/1">
                          <a>عنوان المقال الشائع</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="img">
                      <Image
                        src={BlogImg}
                        alt="Blog Title"
                        width={90}
                        height={80}
                      />
                    </div>
                    <div className="info">
                      <div className="date">March 15, 2026</div>
                      <div className="title">
                        <Link href="/blog/1">
                          <a>عنوان المقال الشائع</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="img">
                      <Image
                        src={BlogImg}
                        alt="Blog Title"
                        width={90}
                        height={80}
                      />
                    </div>
                    <div className="info">
                      <div className="date">March 15, 2026</div>
                      <div className="title">
                        <Link href="/blog/1">
                          <a>عنوان المقال الشائع</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget">
                <div className="widget-title">
                  <h4>التصنيفات</h4>
                </div>
                <div className="blog-categories">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/categories/technology">
                      <a>التكنولوجيا</a>
                    </Link>
                    <span>(10)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/categories/lifestyle">
                      <a>أسلوب الحياة</a>
                    </Link>
                    <span>(8)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/categories/business">
                      <a>الأعمال</a>
                    </Link>
                    <span>(5)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/categories/health">
                      <a>الصحة</a>
                    </Link>
                    <span>(7)</span>
                  </div>
                </div>
              </div>

              <div className="widget newsletter-widget">
                <div className="widget-title">
                  <h4>النشرة الإخبارية</h4>
                </div>
                <div className="newsletter-box">
                  <p>اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات.</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {formSchema?.fields?.map((field) => (
                      <input
                        type={field?.type}
                        className="form-control"
                        placeholder={field?.label}
                        {...register(field?.key, {
                          required: field?.required,
                        })}
                        key={field?.id}
                      />
                    ))}
                    {errors[formSchema?.fields[0]?.key] && (
                      <p className="error">
                        {errors[formSchema?.fields[0]?.key]?.type ===
                          "required" && "هذا الحقل مطلوب"}
                        {errors[formSchema?.fields[0]?.key]?.type ===
                          "pattern" &&
                          errors[formSchema?.fields[0]?.key]?.message}
                      </p>
                    )}
                    <button type="submit" className="btn">
                      اشترك
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
