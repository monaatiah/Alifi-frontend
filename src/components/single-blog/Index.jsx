import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import BlogImg from "./assets/blog.png";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getFullDate, ImageWithFallback } from "@/helpers/functions";

const Index = () => {
  const { contentBySlug } = useSelector((state) => state.content);

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={styles["single-blog-section"]}>
      <Container>
        <Row>
          <Col xxl={9} lg={8}>
            <div className="blog-wrap">
              <div className="post-img">
                <ImageWithFallback
                  src={contentBySlug?.cover_image}
                  alt={contentBySlug?.title}
                  width={900}
                  height={430}
                />
              </div>
              <div className="post-info d-flex align-items-center gap-3">
                {/* <span className="category">سلوك</span> */}
                <div className="d-flex align-items-center">
                  <span className="date">
                    {getFullDate(contentBySlug?.created_at)}
                  </span>
                  {/* <span className="comments">3 تعليقات</span> */}
                </div>
              </div>
              <div className="post-content">
                <h1>{contentBySlug?.title}</h1>
                <div className="desc">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentBySlug?.body || "",
                    }}
                  />
                </div>
                <div className="post-share d-flex align-items-center gap-3">
                  <span>شارك المقال:</span>
                  <div className="social-icons d-flex align-items-center gap-2">
                    <button
                      className="social-btn facebook"
                      onClick={() => handleShare("facebook")}
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </button>
                    <button
                      className="social-btn twitter"
                      onClick={() => handleShare("twitter")}
                      aria-label="Share on Twitter"
                    >
                      <FaXTwitter />
                    </button>
                    <button
                      className="social-btn linkedin"
                      onClick={() => handleShare("linkedin")}
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn />
                    </button>
                  </div>
                </div>
              </div>
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
