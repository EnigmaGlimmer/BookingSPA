import { AxiosRequestConfig } from 'axios';

// *** Type Helper
interface APIResponse<Type> {
    result: Type;
    message: string;
    isSuccess: boolean;
    errors: string[];
}

interface Pagination {
    take: number;
    skip: number;
}

// 1. Blog
type SingleBlog = {
    BlogId: number;
    articleTitle: string;
    articleContent: string;
    createdDate: Date;
    updatedDate: Date;
    categories: string[];
    status: BlogStatus;
    presentedImage: string;
    galleries: string;
    likeCount: number;
    comments: CommentResponse[];
    commentCount: number;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
};

interface CreateBlog {
    articleTitle: string;
    articleContent: string;
    ceatedDate: Date;
    categories: number[];
    presentedImage: string;
    galleries: string;
    status: BlogStatus;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
}

interface UpdateBlog {
    articleTitle: string;
    articleContent: string;
    ceatedDate: Date;
    categories: number[];
    presentedImage: string;
    galleries: string;
    status: BlogStatus;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
}

export declare enum BlogStatus {
    Opening,
    Closed,
}

// 2. Comment
type CommentResponse = {};
type PostComment = {};

// 3. Upload

// *** Axios Response Types
// 1. Blog
/**
 * Lấy danh sách blog.
 * @param request Phân trang.
 * @returns Phản hồi bất đồng bộ của kiểu dữ liệu danh sách blog.
 */
export declare const getBlogList: (
    request: Pagination,
    config?: AxiosRequestConfig,
) => Promise<APIResponse<Array<SingleBlog>>>;
export declare const postBlog: (body: CreateBlog, config: AxiosRequestConfig) => Promise<APIResponse<SingleBlog>>;
export declare const updateBlog: (body: UpdateBlog, config: AxiosRequestConfig) => Promise<APIResponse<SingleBlog>>;

// 2. Comment
export declare const getCommentList: (pagination) => Promise<APIResponse<CommentResponse>>;
export declare const postComment: (
    body: PostComment,
    config: AxiosRequestConfig,
) => Promise<APIResponse<CommentResponse>>;

// 3. Upload
type UploadDTO = {
    assetId: string;
    assetLink: string;
    createdAt: Date;
    updatedAt: Date;
};
type CreateUploadDTO = {
    file: File;
};
type UpdateUploadDTO = {
    file: File;
};

export declare const getAssets: (
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<Array<UploadDTO>>>;

export declare const getAsset: (
    id: string,
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<UploadDTO>>;

export declare const postAsset: (body: CreateUploadDTO, config: AxiosRequestConfig) => Promise<APIResponse<UploadDTO>>;

export declare const putAsset: (
    id: string,
    body: UpdateUploadDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<UploadDTO>>;

export declare const deleteAsset: (id: string, config: AxiosRequestConfig) => Promise<APIResponse<UploadDTO>>;

// 4. Testimonial
type TestimonialDTO = {
    testimonialId: number;
};
type CreateTestimonialDTO = {};
type UpdateTestimonialDTO = {};

export declare const getTestimonials: (
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const getTestimonial: (
    id: number,
    request: any,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const postTestimonial: (
    body: CreateTestimonialDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const putTestimonial: (
    id: number,
    body: UpdateTestimonialDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const deleteTestimonial: (id: number) => Promise<APIResponse<number>>;
