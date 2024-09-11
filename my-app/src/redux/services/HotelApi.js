import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const HotelApi = createApi(
    {
        reducerPath: 'HotelApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/' }),
        endpoints: (builder) => ({

            getRooms: builder.query({
                query: (name_of_list) => name_of_list,
                providesTags: ['Rooms']
            }),

            getCountry: builder.query({
                query: () => 'https://restcountries.com/v3.1/all',
                providesTags: ['Country']
            }),

            createGuests: builder.mutation({
                query: ({ url, id, guests }) => ({
                    url: `${url}/${id}`,
                    method: 'POST',
                    body: guests
                }),
                invalidatesTags: ['Room']
            }),

            createUsers: builder.mutation({
                query: ({ url, user }) => ({
                    url: `${url}`,
                    method: 'POST',
                    body: user
                }),
                invalidatesTags: ['Users']
            }),

            updateRoom: builder.mutation({
                query: ({ url, id, room }) => ({
                    url: `${url}/${id}`,
                    method: 'PUT',
                    body: room
                }),
                invalidatesTags: ['Rooms']
            }),

            // deleteStudent: builder.mutation({
            //     query: ({ url, id }) => ({
            //         url: `${url}/${id}`,
            //         method: 'DELETE',
            //     }),
            //     invalidatesTags: ['Students']
            // })

        })
    }
)

export const { useGetRoomsQuery, useUpdateRoomMutation, useGetCountryQuery, useCreateGuestsMutation , useCreateUsersMutation } = HotelApi;