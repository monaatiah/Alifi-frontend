import Image from "next/future/image";
import Link from "next/link";
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CartIcon from "./assets/cart.svg";
import { FaRegHeart } from "react-icons/fa6";
import { handleImageLink } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import { addToCart } from "@/store/cart/actions";

const ProductBlock = memo(({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart || {});

  const handleIncrement = () => {
    if (quantity >= (item?.quantity || 1)) {
      toast.error("لقد وصلت إلى الحد الأقصى من الكمية المتاحة");
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ cookies: {}, productId: item?.id, quantity }));
  };

  return (
    <div className="product-block">
      <div className="img">
        <Image
          src={handleImageLink(item?.image)}
          alt={item?.name}
          width={340}
          height={200}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
        <Link href={`/products/${item?.slug}`}>
          <a aria-label={item?.name}> </a>
        </Link>
        <button className="wishlist-btn" aria-label="add to wishlist">
          <FaRegHeart size={20} />
        </button>
      </div>
      <div className="info">
        <div className="title">
          <Link href={`/products/${item?.slug}`}>
            <a>{item?.name}</a>
          </Link>
        </div>
        <div className="description">
          {item?.description?.length > 70
            ? item?.description.substring(0, 70) + "..."
            : item?.description}
        </div>
        <div className="price">
          <div className="d-flex align-items-center gap-1">
            {item?.price}
            <SaudiRiyalIcon width={20} height={20} stroke="#000" />
          </div>
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= (item?.quantity || 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="btns">
          <Link href={`/products/${item?.slug}`}>
            <a>مزيد من التفاصيل</a>
          </Link>
          <button
            className="add-to-cart"
            aria-label="add to cart"
            onClick={handleAddToCart}
            disabled={loading}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductBlock.displayName = "ProductBlock";

export default ProductBlock;
