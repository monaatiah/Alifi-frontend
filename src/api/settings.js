import server from "./server";

// export const getPageDataApi = async ({ cookies, slug }) => {
//   const response = await server({ cookies }).post(
//     `/pages/search`,

//     {
//       search: {
//         filters: [
//           {
//             field: "slug",
//             operator: "=",
//             value: slug,
//           },
//         ],
//         selects: [
//           {
//             field: "id",
//           },
//           {
//             field: "title",
//           },
//           {
//             field: "slug",
//           },
//           {
//             field: "status",
//           },
//           {
//             field: "meta",
//           },
//           {
//             field: "created_at",
//           },
//           {
//             field: "updated_at",
//           },
//         ],
//         includes: [
//           {
//             relation: "pageComponents",
//           },
//         ],
//       },
//     }
//   );

//   return response.data;
// };

export const getPageDataApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).post(
    `/pages/actions/get-by-slug`,

    {
      slug: slug,
    }
  );

  return response.data;
};

export const getSettingsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get("/settings");
  return response.data;
};
