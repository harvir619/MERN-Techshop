import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({ url: `${PRODUCTS_URL}` }),
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
    })
});


export const { useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation } = productsApiSlice
