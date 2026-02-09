export type ProductInfo = {
    id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
    seller: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};