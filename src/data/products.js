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
import cokeImg from '../assets/coke.jpg';
import fantaImg from '../assets/fanta.jpg';
import spriteImg from '../assets/sprite.jpg';
import pepsiImg from '../assets/pepsi.jpg';
import maltaImg from '../assets/malta.jpg';
import teemImg from '../assets/teem.jpg';

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
        title: 'Coca-Cola (50cl)',
        price: 400,
        rating: 4.9,
        reviews: 524,
        description: 'Ice-cold Coca-Cola, the classic refreshment. Chilled and ready to drink.',
        image: cokeImg,
        badge: 'Chilled',
        category: 'drinks'
    },
    {
        id: 9.1,
        title: 'Fanta Orange (50cl)',
        price: 400,
        rating: 4.8,
        reviews: 318,
        description: 'Fizzy, fruity and orange-flavoured Fanta. A favourite among all ages.',
        image: fantaImg,
        badge: 'Fruity',
        category: 'drinks'
    },
    {
        id: 9.2,
        title: 'Sprite (50cl)',
        price: 400,
        rating: 4.7,
        reviews: 267,
        description: 'Cool, crisp lemon-lime Sprite. Light and refreshing, zero caffeine.',
        image: spriteImg,
        badge: null,
        category: 'drinks'
    },
    {
        id: 9.3,
        title: 'Teem Bitter Lemon (50cl)',
        price: 350,
        rating: 4.6,
        reviews: 143,
        description: 'Nigeria\'s beloved Teem bitter lemon drink — uniquely tangy and refreshing.',
        image: teemImg,
        badge: 'Nigerian Fav',
        category: 'drinks'
    },
    {
        id: 9.4,
        title: 'Malta Guinness (33cl)',
        price: 450,
        rating: 4.8,
        reviews: 289,
        description: 'Rich, malty non-alcoholic beverage. Packed with B vitamins and full of flavour.',
        image: maltaImg,
        badge: 'Energy Boost',
        category: 'drinks'
    },
    {
        id: 9.5,
        title: 'Pepsi (50cl)',
        price: 400,
        rating: 4.7,
        reviews: 201,
        description: 'Bold, refreshing Pepsi cola with that unmistakable taste. Ice cold and fizzy.',
        image: pepsiImg,
        badge: null,
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
