export type ProductInfo = {
    id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
    seller: string;
    rating: number;
};

export type UserInfo = {
    id: string;
    email: string;
    name: string;
    type: 'basic' | 'seller' | 'admin';
    profile_image: string;
    business_name: string;
    seller_description: string;
}

export type ArtisanCardInfo = {
    id: string;
    name: string;
    profile_image: string;
    business_name: string;
    description: string;
    rating: number;
}
