import Image from "next/future/image";
import Link from "next/link";
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CartIcon from "@/assets/images/cart.svg";
import { FaRegHeart } from "react-icons/fa6";
import { handleImageLink } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import { toggleToWishlist, addToCart } from "@/store/cart/actions";
import PlaceholderImg from "@/assets/images/cover.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ProductBlock = memo(({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading, wishlist } = useSelector((state) => state.cart || {});
  const isService = item?.kind === "service";
  const detailsHref = item?.href || `/products/${item?.slug}`;

  const handleIncrement = () => {
    if (quantity >= (item?.quantity || 1)) {
      toast.error("لقد وصلت إلى الحد الأقصى من الكمية المتاحة");
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (isService) {
      return;
    }

    dispatch(addToCart({ cookies: {}, productId: item?.id, quantity }));
  };

  return (
    <div className="product-block">
      <div className="img">
        {item?.image ? (
          <Image
            src={handleImageLink(item?.image)}
            alt={item?.name}
            width={340}
            height={300}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          <Image
            src={PlaceholderImg}
            alt={item?.name}
            width={300}
            height={300}
          />
        )}
        <Link href={detailsHref}>
          <a aria-label={item?.name}> </a>
        </Link>
        {!isService && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {wishlist?.data?.some((w) => w?.id === item?.id)
                  ? "إزالة من المفضلة"
                  : "إضافة إلى المفضلة"}
              </Tooltip>
            }
          >
            <button
              className="wishlist-btn"
              aria-label="add to wishlist"
              onClick={() => {
                dispatch(
                  toggleToWishlist({ cookies: {}, product_id: item?.id }),
                );
              }}
              style={{
                background: wishlist?.data?.some((w) => w?.id === item?.id)
                  ? "#f75464"
                  : "inherit",
              }}
            >
              <FaRegHeart
                size={20}
                color={
                  wishlist?.data?.some((w) => w?.id === item?.id)
                    ? "#fff"
                    : "#000"
                }
              />
            </button>
          </OverlayTrigger>
        )}
      </div>
      <div className="info">
        <div className="title">
          <Link href={detailsHref}>
            <a>{item?.name}</a>
          </Link>
        </div>
        {item?.description && (
          <div className="description">
            {item?.description?.length > 70
              ? item?.description.substring(0, 70) + "..."
              : item?.description}
          </div>
        )}
        <div className="price">
          <div className="d-flex align-items-center gap-1">
            {item?.price}
            <SaudiRiyalIcon width={20} height={20} stroke="#000" />
          </div>
          {!isService && (
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
          )}
        </div>
        <div className="btns">
          <Link href={detailsHref}>
            <a>{isService ? "مزيد من التفاصيل" : "مزيد من التفاصيل"}</a>
          </Link>
          {!isService && (
            <button
              className="add-to-cart"
              aria-label="add to cart"
              onClick={handleAddToCart}
              disabled={loading}
            >
              <CartIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ProductBlock.displayName = "ProductBlock";

export default ProductBlock;
