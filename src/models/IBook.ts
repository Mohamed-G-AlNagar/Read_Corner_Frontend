export interface IBook {
    id: number;
    title: string;
    author: string;
    description?: string,
    category: string;
    stock: number;
    price: number;
    bookCover?: string;
    rating: number;
}
export interface BookFormData {
    title: string;
    author: string;
    description: string;
    category: string;
    price: number;
    totalCopies: number;
    stock: number;
    bookCoverImage?: FileList;
}