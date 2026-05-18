import server from "./server";

export const searchPetsApi = async ({ cookies, search = {} }) => {
  const response = await server({ cookies }).post(`/pets/search`, {
    search,
  });

  return response;
};

export const createPetApi = async ({ cookies, attributes }) => {
  const response = await server({ cookies }).post(`/pets/mutate`, {
    mutate: [
      {
        operation: "create",
        attributes,
      },
    ],
  });

  return response;
};
