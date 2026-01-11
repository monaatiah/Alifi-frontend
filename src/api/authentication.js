import server from "./server";

export const authApi = async ({ cookies, type, data }) => {
  const response = await server({ cookies }).post(
    `/customers/actions/${type}`,
    data
  );
  return response.data;
};
