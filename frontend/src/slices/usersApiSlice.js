import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
            
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: credentials
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        getUsersDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/${user._id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
    }),
})

export const { useGetUsersDetailsQuery,useUpdateUserMutation,useDeleteUserMutation,useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation,useGetUsersQuery} = usersApiSlice