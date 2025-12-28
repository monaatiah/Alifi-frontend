import Image from "next/future/image";
import Link from "next/link";
import React, { useState, memo } from "react";
import CartIcon from "./assets/cart.svg";
import PlaceholderLogo from "@/assets/images/logo.png";

const ProductBlock = memo(({ item }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-block">
      <div className="img">
        {item?.image ? (
          <Image
            src={item?.image}
            alt={item?.name}
            width={340}
            height={200}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="placeholder d-flex align-items-center justify-content-center position-absolute w-100 h-100 start-0 top-0">
            <Image
              src={PlaceholderLogo}
              alt="placeholder"
              width={120}
              height={120}
              loading="lazy"
            />
          </div>
        )}
        <Link href={`/products/${item?.id}`}>
          <a aria-label={item?.name}> </a>
        </Link>
      </div>
      <div className="info">
        <div className="title">
          <Link href={`/products/${item?.id}`}>
            <a>{item?.name}</a>
          </Link>
        </div>
        {item?.description && (
          <div className="description">{item?.description}</div>
        )}
        <div className="price">
          ${parseInt(item?.price).toFixed(2) || "0.00"}
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="btns">
          <Link href={`/products/${item?.id}`}>
            <a>مزيد من التفاصيل</a>
          </Link>
          <button className="add-to-cart" aria-label="add to cart">
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductBlock.displayName = "ProductBlock";

export default ProductBlock;
