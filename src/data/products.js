import meatPieImg from '../assets/meat_pie.jpg';
import puffPuffImg from '../assets/puff_puff.jpg';
import hotPuffPuffImg from '../assets/hot_puff_puff_new.jpg';
import suyaSkewersImg from '../assets/fresh_suya_skewers_new.jpg';
import chinChinImg from '../assets/chin_chin.jpg';
import plantainChipsImg from '../assets/plantain_chips.jpg';
import potatoChipsImg from '../assets/potato_chips.jpg';
import cakeSliceImg from '../assets/cake_slice.png';
import drinksImg from '../assets/drinks.png';
import provisionsImg from '../assets/provisions.png';

export const products = [
    {
        id: 1,
        title: 'Delicious Cake Slice',
        price: 3500,
        rating: 4.8,
        reviews: 45,
        description: 'Moist and rich cake slice, perfect for dessert.',
        image: cakeSliceImg,
        badge: 'Sweet Treat',
        category: 'pastries'
    },
    {
        id: 2,
        title: 'Crunchy Chin Chin',
        price: 1500,
        rating: 4.7,
        reviews: 124,
        description: 'Savory fried dough snack with a kick.',
        image: chinChinImg,
        badge: 'Best Seller',
        category: 'pastries'
    },
    {
        id: 3,
        title: 'Classic Eggroll',
        price: 500,
        rating: 4.5,
        reviews: 89,
        description: 'Golden fried dough wrapped around a boiled egg.',
        image: puffPuffImg,
        badge: null,
        category: 'pastries'
    },
    {
        id: 4,
        title: 'Golden Meat Pie',
        price: 1200,
        rating: 4.9,
        reviews: 210,
        description: 'Buttery crust filled with spiced minced meat.',
        image: meatPieImg,
        badge: 'Hot',
        category: 'pastries'
    },
    {
        id: 5,
        title: 'Hot Puff Puff (Fresh Batch)',
        price: 300,
        rating: 4.8,
        reviews: 312,
        description: 'Sweet, pillowy deep-fried dough balls - served hot!',
        image: hotPuffPuffImg,
        badge: 'Freshly Made',
        category: 'pastries'
    },
    {
        id: 6,
        title: 'Spicy Plantain Chips',
        price: 1000,
        rating: 4.6,
        reviews: 56,
        description: 'Crispy plantain slices with a spicy seasoning.',
        image: plantainChipsImg,
        badge: null,
        category: 'chips'
    },
    {
        id: 7,
        title: 'Potato Chips',
        price: 1200,
        rating: 4.5,
        reviews: 34,
        description: 'Classic salted potato crisps.',
        image: potatoChipsImg,
        badge: null,
        category: 'chips'
    },
    {
        id: 8,
        title: 'Sweet Buns',
        price: 400,
        rating: 4.4,
        reviews: 78,
        description: 'Soft and fluffy baked buns.',
        image: puffPuffImg,
        badge: null,
        category: 'pastries'
    },
    {
        id: 9,
        title: 'Assorted Drinks',
        price: 500,
        rating: 4.7,
        reviews: 112,
        description: 'Water, soft drinks, and wine selection.',
        image: drinksImg,
        badge: 'Chilled',
        category: 'drinks'
    },
    {
        id: 10,
        title: 'Household Provisions',
        price: 5000,
        rating: 4.8,
        reviews: 23,
        description: 'Essential daily provisions and groceries.',
        image: provisionsImg,
        badge: 'Essentials',
        category: 'provisions'
    },
    {
        id: 11,
        title: 'Fresh Suya Skewers',
        price: 2500,
        rating: 4.9,
        reviews: 156,
        description: 'Spicy grilled beef skewers with peppers - authentic Nigerian suya!',
        image: suyaSkewersImg,
        badge: 'Hot & Spicy',
        category: 'grilled'
    }
];
