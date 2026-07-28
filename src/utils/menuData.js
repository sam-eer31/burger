import classicBeefBurger from '../assets/menu/burgers/classic_beef_burger_1785254943681.png';
import crispyChickenBurger from '../assets/menu/burgers/crispy_chicken_burger_1785254953041.png';
import veggieSupremeBurger from '../assets/menu/burgers/veggie_supreme_burger_1785254963049.png';
import goldenFries from '../assets/menu/sides/golden_fries_1785254982231.png';
import onionRings from '../assets/menu/sides/onion_rings_1785254993343.png';
import craftCola from '../assets/menu/drinks/craft_cola_1785255003785.png';

export const menuData = [
  {
    category: "Signature Burgers",
    id: "burgers",
    items: [
      {
        id: "b1",
        name: "Classic Beef Burger",
        description: "Juicy beef patty, melted cheddar, crisp lettuce, ripe tomato, and our secret sauce on a toasted sesame bun.",
        price: "₹199",
        image: classicBeefBurger,
      },
      {
        id: "b2",
        name: "Crispy Chicken Sandwich",
        description: "Golden fried chicken breast, spicy mayo, crunchy pickles, on a brioche bun.",
        price: "₹179",
        image: crispyChickenBurger,
      },
      {
        id: "b3",
        name: "Veggie Supreme",
        description: "Grilled halloumi, smashed avocado, fresh greens, and tangy yogurt dressing.",
        price: "₹149",
        image: veggieSupremeBurger,
      }
    ]
  },
  {
    category: "Sides",
    id: "sides",
    items: [
      {
        id: "s1",
        name: "Golden Fries",
        description: "Crispy, golden, and sprinkled with sea salt.",
        price: "₹89",
        image: goldenFries,
      },
      {
        id: "s2",
        name: "Beer-Battered Onion Rings",
        description: "Thick-cut onion rings with a side of zesty dipping sauce.",
        price: "₹99",
        image: onionRings,
      }
    ]
  },
  {
    category: "Drinks",
    id: "drinks",
    items: [
      {
        id: "d1",
        name: "Craft Cola",
        description: "Icy cold, refreshing craft cola with a hint of citrus.",
        price: "₹49",
        image: craftCola,
      }
    ]
  }
];
