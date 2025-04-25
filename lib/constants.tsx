export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  export const diningPackages = [
    {
      id: "fine-dining",
      title: "Fine Dining",
      description: "Bottle of Champagne, Fine Snack Taster For 2x Person",
      price: "$500",
      image: "/img/sushi.webp",
      imagePosition: "right",
    },
    {
      id: "gold-dining",
      title: "Gold Dining",
      description: "Bottle Of Champagne, Special Main Course For 2x Person",
      price: "$1000",
      image: "/img/sushi.webp",
      imagePosition: "left",
    },
    {
      id: "royalty-dining",
      title: "Royalty Dining",
      description: "Bottle of Luxury Champagne, Special Main Course For 4x Person, Royal Dessert",
      price: "$1500",
      image: "/img/sushi.webp",
      imagePosition: "right",
    },
  ]
  export const specialtyItems: MenuItem[] = [
    {
      id: "dragon-sushi",
      name: "Dragon Sushi",
      description: "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut rhoncus felis, vel tincidunt neque. Cras egestas ac ipsum in posuere. Lorem ipsum dolor sit amet.",
      price: 19,
      image: "/img/sushi2.webp"
    },
    {
      id: "creamy-sushi",
      name: "Creamy Sushi",
      description: "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut rhoncus felis, vel tincidunt neque. Cras egestas ac ipsum in posuere. Lorem ipsum dolor sit amet.",
      price: 19,
      image: "/img/sushi2.webp"
    },
    {
      id: "roll-salmon-sushi",
      name: "Roll Salmon Sushi",
      description: "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut rhoncus felis, vel tincidunt neque. Cras egestas ac ipsum in posuere. Lorem ipsum dolor sit amet.",
      price: 19,
      image: "/img/sushi3.jpg"
    }
  ];
  
  export const categories = [
    "All Categories",
    "The Verve Grill",
    "Fried",
    "Wok Roll",
    "Sushilab",
    "Appetizer"
  ];
  

  export const menuItems = [
    {
      id: "spinach-quiche",
      name: "Spinach & Mushroom Quiche",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at risus ac quam.",
      image: "/img/sushi2.webp",
      rating: 5,
      price: "$12.99",
      prepTime: "25 min",
      category: "Vegetarian",
    },
    {
      id: "sweet-potato",
      name: "Sweet Potato",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at risus ac quam.",
      image: "/img/sushi3.jpg",
      rating: 4,
      price: "$8.99",
      prepTime: "15 min",
      category: "Sides",
    },
    {
      id: "spaghetti",
      name: "Spaghetti",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at risus ac quam.",
      image: "/img/sushi2.webp",
      rating: 5,
      price: "$14.99",
      prepTime: "20 min",
      category: "Pasta",
    },
    {
      id: "chickpea-curry",
      name: "Chickpea Curry",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at risus ac quam.",
      image: "/img/sushi3.jpg",
      rating: 5,
      price: "$16.99",
      prepTime: "30 min",
      category: "Curry",
    },
  ]