import server from "./server";

export const getMyOrdersApi = async ({ cookies, limit = 15, page = 1 }) => {
  const response = await server({ cookies }).post(
    `/customers/actions/get-my-orders`,
    {
      limit,
      page,
    },
  );

  return response;
};

export const getOrderDetailsApi = async ({ cookies, orderId }) => {
  const response = await server({ cookies }).get(`/orders/${orderId}`);

  return response;
};

export const cancelOrderApi = async ({ cookies, orderId, reason }) => {
  const response = await server({ cookies }).post(`/orders/actions/cancel`, {
    order_id: orderId,
    reason,
  });

  return response;
};
