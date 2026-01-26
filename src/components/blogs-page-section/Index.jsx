import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";
import Image from "next/future/image";
import Link from "next/link";
import userPlaceholder from "./assets/user.png";
import BlogImg from "./assets/blog.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const blogsData = getComponentByIdentifier(
    pageData?.page_components,
    "blogs",
  );

  return (
    <div className={styles["blogs-section"]}>
      <Container>
        <Row>
          <Col xxl={9} lg={8}>
            <div className="blogs-wrap">
              {blogsData?.data?.blogs?.map((item) => (
                <div className="block" key={item?.id}>
                  <div className="img">
                    <Image
                      src={item?.cover_image || ""}
                      alt={item?.title}
                      width={415}
                      height={260}
                    />
                    <Link href={`/blog/${item?.id}`}>
                      <a aria-label={item?.title}></a>
                    </Link>
                    <span>
                      {item?.tags?.map((tag) => tag.name).join(", ") || ""}
                    </span>
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
                        <Link href={`/blog/${item.id}`}>
                          <a>{item?.title}</a>
                        </Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.body?.substring(0, 100) + "...",
                        }}
                      />
                      <div className="author d-flex align-items-center gap-3">
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="global-pagination">
              <ul>
                <li>
                  <button
                    type="button"
                    aria-label="previous page"
                    className="action-btn"
                  >
                    <FaArrowRight />
                  </button>
                </li>
                <li>
                  <button type="button" className="active" aria-label="page 1">
                    1
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 2">
                    2
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 3">
                    3
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 4">
                    4
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 5">
                    5
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    aria-label="next page"
                    className="action-btn next-btn"
                  >
                    <FaArrowLeft />
                  </button>
                </li>
              </ul>
            </div>
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
                    <Link href="/blogs/category/technology">
                      <a>التكنولوجيا</a>
                    </Link>
                    <span>(10)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/category/lifestyle">
                      <a>أسلوب الحياة</a>
                    </Link>
                    <span>(8)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/category/business">
                      <a>الأعمال</a>
                    </Link>
                    <span>(5)</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Link href="/blogs/category/health">
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
                  <form>
                    <input
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      required
                      className="form-control"
                    />
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
