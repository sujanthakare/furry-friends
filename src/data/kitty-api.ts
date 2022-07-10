import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IKitty } from './types';

const BASE_URL = 'http://localhost:8080/api';

const kittyApi = createApi({
  reducerPath: 'kittyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 360,
  tagTypes: ['Kitties'],
  endpoints: (builder) => ({
    createKitty: builder.mutation<IKitty, Omit<IKitty, 'id'>>({
      invalidatesTags: [{ type: 'Kitties', id: 'LIST' }],
      query(formInputs) {
        return {
          method: 'POST',
          url: '/kitties',
          body: {
            ...formInputs,
          },
        };
      },
    }),

    updateKitty: builder.mutation<void, IKitty>({
      invalidatesTags: [{ type: 'Kitties', id: 'LIST' }],
      query({ id, ...rest }) {
        return {
          method: 'PUT',
          url: '/kitties/' + id,
          body: {
            ...rest,
          },
        };
      },
    }),

    deleteKitty: builder.mutation<void, number>({
      invalidatesTags: [{ type: 'Kitties', id: 'LIST' }],
      query(id) {
        return {
          method: 'DELETE',
          url: '/kitties/' + id,
        };
      },
    }),

    getKitty: builder.query<IKitty, number>({
      query(id) {
        return {
          method: 'GET',
          url: '/kitties/' + id,
        };
      },
    }),

    /**
     *
     */
    getKitties: builder.query<
      Array<IKitty>,
      {
        searchQuery?: string;
      } | void
    >({
      providesTags: [{ type: 'Kitties', id: 'LIST' }],
      query: (inputs) => {
        if (inputs && inputs.searchQuery) {
          return '/kitties?name_like=' + inputs.searchQuery;
        }

        return '/kitties';
      },
    }),
  }), // endPoints
});

export default kittyApi;
