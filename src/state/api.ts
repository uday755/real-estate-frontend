import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<User | null, void>({
      queryFn: async () => {
        try {
          const cognitoInfo = await getCurrentUser();

          return {
            data: {
              cognitoInfo,
              userInfo: {} as User["userInfo"],
              userRole: "tenant",
            },
          };
        } catch {
          return { data: null };
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = api;
