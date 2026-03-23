import server from "./server";

export const getUserCartApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(`/cart/actions/get-cart`, {});
  return response;
};

export const addToCartApi = async ({ cookies, productId, quantity }) => {
  const body = {
    product_id: productId,
    quantity: quantity,
  };
  const response = await server({ cookies }).post(
    `/cart/actions/add-item`,
    body,
  );
  return response;
};

export const updateCartItemApi = async ({ cookies, body }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/update-item`,
    body,
  );
  return response;
};

export const removeCartItemApi = async ({ cookies, body }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/remove-item`,
    body,
  );
  return response;
};

export const clearCartApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/clear-cart`,
    {},
  );
  return response;
};

export const applyCouponApi = async ({ cookies, body }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/apply-coupon`,
    body,
  );
  return response;
};

export const removeCouponApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/remove-coupon`,
    {},
  );
  return response;
};

export const mergeCartApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(
    `/cart/actions/merge-cart`,
    {},
  );
  return response;
};

export const addProductToWishlistApi = async ({ cookies, product_id }) => {
  const response = await server({ cookies }).post(`/wishlists/actions/toggle`, {
    product_id: product_id,
  });
  return response;
};
