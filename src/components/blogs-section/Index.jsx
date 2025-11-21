import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { v4 } from "uuid";
import Image from "next/future/image";
import Link from "next/link";

const Index = () => {
  const data = [
    {
      id: v4(),
      title: "كيف تختار الطعام المناسب لكلبك؟",
      description:
        "اختيار الطعام المناسب لكلبك أمر ضروري للحفاظ على صحته وسعادته. في هذا المقال، سنستعرض بعض النصائح لمساعدتك في اتخاذ القرار الصحيح.",
      //img from unsplash
      image:
        "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      //date formate iso
      date: "2025-10-15T10:30:00Z",
      author: {
        name: "أحمد علي",
        //img from unsplash
        image:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      category: "تغذية",
    },
    {
      id: v4(),
      title: "أفضل التمارين للقطط المنزلية",
      description:
        "القطط المنزلية تحتاج إلى تمارين منتظمة للحفاظ على لياقتها وصحتها. في هذا المقال، سنقدم لك بعض الأفكار للتمارين التي يمكنك القيام بها مع قطتك.",
      image:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      date: "2025-11-20T14:00:00Z",
      author: {
        name: "سارة محمد",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      },
      category: "تمارين",
    },
    {
      id: v4(),
      title: "كيفية التعامل مع قلق الانفصال عند الحيوانات الأليفة",
      description:
        "قلق الانفصال هو مشكلة شائعة بين الحيوانات الأليفة. في هذا المقال، سنناقش بعض الاستراتيجيات لمساعدتك في تقليل قلق الانفصال لدى حيوانك الأليف.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      date: "2025-12-05T09:15:00Z",
      author: {
        name: "ليلى حسن",
        image:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      category: "سلوك",
    },
  ];

  return (
    <div className={styles["blogs-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle="المقالات والمحتوى"
          secTitle="تعلّم من خبراء الحيوانات الأليفة"
        />
        <div className="sec-body">
          <p>اكتشف مقالات ونصائح من مختصين في تربية ورعاية الحيوانات</p>
          <Row>
            {data.map((item) => (
              <Col key={item.id} lg={4} md={6} sm={12}>
                <div className="block">
                  <div className="img">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={415}
                      height={260}
                    />
                    <Link href={`/blog/${item.id}`}>
                      <a aria-label={item?.title}></a>
                    </Link>
                    <span>{item.category}</span>
                  </div>
                  <div className="info d-flex align-items-start">
                    <div className="date d-flex flex-column align-items-center justify-content-center">
                      <span>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                        })}
                      </span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="info-data">
                      <h3>
                        <Link href={`/blog/${item.id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </h3>
                      <p>{item.description}</p>
                      <div className="author d-flex align-items-center gap-3">
                        <div className="au-img">
                          <Image
                            src={item?.author?.image}
                            alt={item?.author?.name}
                            width={50}
                            height={50}
                          />
                        </div>
                        <span>{item?.author?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="load-more">
            <Link href="/blogs">
              <a className="btn">اقرأ المزيد من المقالات</a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;
