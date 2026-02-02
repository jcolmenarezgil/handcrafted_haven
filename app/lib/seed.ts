const products = [
  {
    name: 'Bamboo Hoodie',
    price: 59.99,
    categoryName: 'Apparel',
    sellerName: 'EarthStep',
    description: 'GreenWear presents this hand-loomed bamboo fiber hoodie. Soft, breathable, and dyed with organic pigments to reflect our vision of sustainable style.'
  },
  {
    name: 'Eco Sneakers',
    price: 89.99,
    categoryName: 'Footwear',
    sellerName: 'EarthStep',
    description: 'Step naturally with EarthStep sneakers. Crafted from recycled canvas and raw rubber, these hand-stitched shoes embody our commitment to the planet.'
  },
  {
    name: 'Reusable Water Bottle',
    price: 24.99,
    categoryName: 'Accessories',
    sellerName: 'EarthStep',
    description: 'HydroLife’s hand-hammered copper bottle keeps drinks fresh. A functional masterpiece designed to eliminate plastic while honoring ancient craftsmanship.'
  },
];

const categories = [
  {
    name: 'Apparel',
  },
  {
    name: 'Footwear',
  },
  {
    name: 'Accessories',
  },
];

const users = [
  {
    email: 'admin@handcrafted.com',
    name: 'Admin Handcrafted Heaven',
    password: 'admin',
    type: 'admin',
    profile_image: '',
    seller_username: 'admin',
    seller_description: ''
  },
  {
    email: 'yang.vanessa85@gmail.com',
    name: 'Vanessa Sun Yang',
    password: '123456',
    type: 'seller',
    profile_image: '',
    seller_username: 'EarthStep',
    seller_description: ''
  },
  {
    email: 'jose.colmenares.gil@gmail.com',
    name: 'Jose David Colmenarez Gil',
    password: '123456',
    type: 'seller',
    profile_image: '',
    seller_username: 'WoodenMad',
    seller_description: ''
  },
];

export {
  products,
  categories,
  users
};