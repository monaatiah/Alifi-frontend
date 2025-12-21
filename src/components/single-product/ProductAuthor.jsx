import React from "react";

import img from "./assets/img.png";
import Image from "next/future/image";
import Link from "next/link";
import { Container } from "react-bootstrap";

const ProductAuthor = () => {
  return (
    <div className="author-wrapper">
      <Container>
        <div className="product-author d-flex align-items-center">
          <div className="img">
            <Image src={img} alt="author" width={140} height={140} />
          </div>
          <div className="info">
            <h3>البائع: PetZone </h3>
            <ul>
              <li> متجر متخصص في منتجات العناية بالقطط</li>
              <li>معلومات إضافية: منتجات أصلية 100% – شحن سريع</li>
            </ul>
            <Link href="/">
              <a className="btn">عرض منتجات البائع</a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductAuthor;
