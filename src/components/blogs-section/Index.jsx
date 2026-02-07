import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import Image from "next/future/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";
import userPlaceholder from "./assets/user.png";

const Index = ({ noHeading, subTitle, title }) => {
  const { pageData } = useSelector((state) => state.settings);
  const blogsData = getComponentByIdentifier(
    pageData?.page_components,
    "blogs",
  );

  return (
    <div className={styles["blogs-section"]}>
      <Container>
        <SecMainTitle secSubTitle={subTitle || ""} secTitle={title || ""} />
        <div className="sec-body">
          {!noHeading && blogsData?.data?.description && (
            <p>{blogsData?.data?.description || ""}</p>
          )}

          <Row>
            {blogsData?.data?.blogs?.map((item) => (
              <Col key={item?.id} lg={4} md={6} sm={12}>
                <div className="block">
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
