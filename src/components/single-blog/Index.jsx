import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import BlogImg from "./assets/blog.png";
import postImg from "./assets/blog.avif";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Index = () => {
  return (
    <div className={styles["single-blog-section"]}>
      <Container>
        <Row>
          <Col xxl={9} lg={8}>
            <div className="blog-wrap">
              <div className="post-img">
                <Image
                  src={postImg}
                  alt="Blog Title"
                  width={900}
                  height={430}
                />
              </div>
              <div className="post-info d-flex align-items-center gap-3">
                <span className="category">سلوك</span>
                <div className="d-flex align-items-center">
                  <span className="date">Dec 20, 2023</span>
                  <span className="comments">3 تعليقات</span>
                </div>
              </div>
              <div className="post-content">
                <h1>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم</h1>
                <div className="desc">
                  <p>
                    خلافاَ للإعتقاد السائد فإن لوريم إيبسوم ليس نصاَ عشوائياً،
                    بل إن له جذور في الأدب اللاتيني الكلاسيكي منذ العام 45 قبل
                    الميلاد، مما يجعله أكثر من 2000 عام في القدم. قام البروفيسور
                    (Richard McClintock) وهو بروفيسور اللغة اللاتينية في جامعة
                    هامبدن-سيدني في فيرجينيا بالبحث عن أصول كلمة لاتينية غامضة
                    في نص لوريم إيبسوم وهي ، وخلال تتبعه لهذه الكلمة في الأدب
                    اللاتيني اكتشف المصدر الغير قابل للشك. فلقد اتضح أن كلمات نص
                    لوريم إيبسوم تأتي من (de Finibus Bonorum et Malorum) للمفكر
                    شيشيرون (Cicero) والذي كتبه في عام 45 قبل الميلاد. هذا
                    الكتاب هو بمثابة مقالة علمية مطولة في نظرية الأخلاق، وكان له
                    شعبية كبيرة في عصر النهضة. السطر الأول من لوريم إيبسوم يأتي
                    من سطر في القسم 1.20.32 من هذا الكتاب.
                  </p>
                  <p>
                    هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة
                    ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل
                    توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة
                    لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف ع
                    فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح
                    النشر المكتبي وبرامح تحرير صفحات الويب
                  </p>
                </div>
                <div className="post-share d-flex align-items-center gap-3">
                  <span>شارك المقال:</span>
                  <div className="social-icons d-flex align-items-center gap-2">
                    <Link href="https://www.facebook.com/sharer/sharer.php?u=#">
                      <a className="facebook" target="_blank" rel="noreferrer">
                        <FaFacebookF />
                      </a>
                    </Link>
                    <Link href="https://twitter.com/intent/tweet?url=#">
                      <a className="twitter" target="_blank" rel="noreferrer">
                        <FaXTwitter />
                      </a>
                    </Link>
                    <Link href="https://www.linkedin.com/shareArticle?mini=true&url=#">
                      <a className="linkedin" target="_blank" rel="noreferrer">
                        <FaLinkedinIn />
                      </a>
                    </Link>
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
