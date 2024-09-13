import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({pageNumber,keyword}) => ({ url: `${PRODUCTS_URL}`, params: {pageNumber,keyword} }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: "POST"
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data,
        }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        getTopProducts: builder.query({
            query: () => ({ url: `${PRODUCTS_URL}/top` }),
            keepUnusedDataFor: 5
        })
    })
});


export const {useGetTopProductsQuery,useCreateReviewMutation,useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation } = productsApiSlice
