import React from "react";

import PlaceHolderImage from "@/assets/images/cover.png";
import Image from "next/future/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { handleImageLink } from "@/helpers/functions";

const ProductAuthor = ({ singleProduct }) => {
  return (
    <div className="author-wrapper">
      <Container>
        <div className="product-author d-flex align-items-center">
          <div className="img">
            {singleProduct?.vendor?.logo ? (
              <Image
                src={handleImageLink(singleProduct?.vendor?.logo)}
                alt="author"
                width={140}
                height={140}
              />
            ) : (
              <Image
                src={PlaceHolderImage}
                alt="author"
                width={140}
                height={140}
              />
            )}
          </div>
          <div className="info">
            <h3>البائع: {singleProduct?.vendor?.name} </h3>
            <ul>
              <li>{singleProduct?.vendor?.description}</li>
              <li>{singleProduct?.vendor?.email}</li>
              <li style={{ direction: "ltr", textAlign: "right" }}>
                {singleProduct?.vendor?.phone}
              </li>
            </ul>
            <Link href={`/vendor/${singleProduct?.vendor?.slug}`} passHref>
              <a className="btn">عرض منتجات البائع</a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductAuthor;
