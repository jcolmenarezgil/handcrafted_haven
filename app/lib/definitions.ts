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

export type Review = {
    id: string;
    name: string;
    rating: number;
    comment: string | null;
    created_at: string;
};

export type ProductInput = {
    name: string;
    price: number;
    description: string;
    image_url: string | null;
    category_id: string; 
};

export type SellerProduct = {
    id: string;
    name: string;
    price: string; 
    description: string | null;
    image_url: string | null;
    category: string;
    rating?: number;
};

export type Category = { 
    id: string; 
    name: string 
};

export type State ={
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        usertype?: string[];
        seller_username?: string[];
        seller_description?: string[];
    };
    message?: string | null;
};


export type UserRole = "basic" | "seller" | "admin";

export type CurrentUser = {
  id: string;
  name: string;
  type: UserRole;
  email: string;
};