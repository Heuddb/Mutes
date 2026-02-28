require("dotenv").config({ path: "../.env" });
const mongoose = require('mongoose');
const product = require('../model/ProductModel')

const products_json = [
  {
    "name": "White Iside Mini Satchel Bag",
    "description": "VALEXTRA White Iside Top Handle Mini Bag. Pergamena white leather, golden-tone clasp closure with a leather insert. Tonal detachable and adjustable strap, signature black lacquered Costa edges painted by hand. Handle on top, golden-tone hardware. Fully lined. Composition: Leather 100%CALF LEATHER Country Of Origin: Italy w:22cm h:16cm d:12cm",
    "price": 1634970,
    "discountPrice": 544990,
    "category": "BAGS",
    "subCategory": "bags",
    "brand": "Valextra",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909309/products/id7ye1ccs13hqalr4cvd.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909310/products/qcdwozvqf5eskm6uxz8y.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909312/products/l8wwptdycbkyyn1wn9jc.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M"],
      "color": ["White"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.5,
      "count": 28
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "Grey 3.5 Shoulder Bag",
    "description": "Grey 3.5 Shoulder Bag, magnetic closure, 1 compartment, solid, metal logo, Removable Top Handle With Removable Chain Shoulder Strap. Composition: 100% Calfskin Leather Country Of Origin: Italy\n\nPlease note that the product received might vary slightly in colour from the image depicted on the website due to different screen display settings/calibrations and/or lighting conditions in the product photography.",
    "price": 665700,
    "discountPrice": 221900,
    "category": "BAGS",
    "subCategory": "Luxury Bags",
    "brand": "Dolce & Gabbana",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909617/products/y8xqzhnzlqivuqzbeezw.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909614/products/u3ltpc6nkadmxyqtksbg.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909619/products/iazhykxmz80gavxrol1u.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Yellow"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 42
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "Cherry Loulou Medium Shoulder Bag",
    "description": "Expand the collection of your accessories in a trendy way with this bag from Saint Laurent. Cherrygrosgrain liningbronze-toned hardwaremagnetic snap closureone flat pocketchain-link strap. Products purchased from Darveys are supported exclusively by the warranty/exchange policies of Darveys and its partner boutiques. Brand owners and their channel partners are not responsible for exchange/warranty services for items purchased through Darveys.",
    "price": 1169970,
    "discountPrice": 389990,
    "category": "BAGS",
    "subCategory": "Shoulder Bag",
    "brand": "Saint Laurent",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909969/products/pwv4uzwdgbv1w3q0l3v0.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909969/products/nizzhhanwrvlauyiyeqv.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768909969/products/obyj4z5i7utvnxwqg6v3.jpg"
    ],
    "stock": 2,
    "attributes": {
      "size": ["S"],
      "color": ["Red"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.8,
      "count": 15
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "MICHAEL Michael Kors bags",
    "description": "Our Emilia satchel is the epitome of fashion-forward style and functionality. Crafted from Signature logo-print canvas, this everyday handbag features a streamlined silhouette punctuated by a belted detail and gold-tone hardware. Detach the crossbody strap to carry yours by the top handles",
    "price": 52500,
    "discountPrice": 17500,
    "category": "WOMEN",
    "subCategory": "Shoulder Bag",
    "brand": "MICHAEL Michael Kors",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768910366/products/m83z9pu9rm1fwx43rsk1.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768910368/products/wgjvstkwu6etij3wqauf.jpg"
    ],
    "stock": 5,
    "attributes": {
      "size": ["S"],
      "color": ["White"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.3,
      "count": 67
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "Dark Brown Sheila Medium Backpack",
    "description": "Michael Kors Dark Brown Sheila Medium Backpack crafted in coated canvas and polyester featuring zip closure, 1 compartment, inside zip and slip pockets, outside zip pocket, logo printed, top handle with adjustable backpack straps. Composition: 89.4% coated canvas/9.6% polyester/1% polyurethane Country of Origin: Vietnam.\n",
    "price": 65700,
    "discountPrice": 21900,
    "category": "BAGS",
    "subCategory": "Backpack",
    "brand": "Michael Kors",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768910656/products/z6gtpxe7ookppl6uxunv.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768910659/products/jfn30biht1atajcjz5ys.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768910661/products/q8eiohyi1zkqxkeg0b3s.jpg"
    ],
    "stock": 3,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Brown"],
      "material": "Canvas",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.0,
      "count": 23
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "Ivory The Small Calino Clutch Hand Bag",
    "description": "Ivory The Small Calino Clutch crafted in leather featuring magnetic closure, 1 compartment, solid pattern, organic shape with integrated engraved ring handle. Country Of Origin: Italy\n\nPlease note that the product received might vary slightly in colour from the image depicted on the website due to different screen display settings/calibrations and/or lighting conditions in the product photography.",
    "price": 420000,
    "discountPrice": 140000,
    "category": "BAGS",
    "subCategory": "Hand Bag",
    "brand": "Jacquemus",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768911324/products/e9rqfylfeaccftznzjgk.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768911324/products/tg0mtwh3xnzvftmvmcrs.jpg"
    ],
    "stock": 6,
    "attributes": {
      "size": ["S"],
      "color": ["White"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.7,
      "count": 19
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "RUBBERISED TEXTURE BACKPACK",
    "description": "Backpack with a textured, rubberised finish. Main compartment with zip closure. The inside has a zip pocket. The front has a zip pocket. It has a handle and two adjustable shoulder straps. Padded back with luggage strap.",
    "price": 11850,
    "discountPrice": 3950,
    "category": "BAGS",
    "subCategory": "Backpack",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912436/products/ctrh2jiailzigwrsnu2o.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912435/products/gnrjzy0qpvnyonu1jmyl.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912439/products/lhngttapuphsvdz37ub3.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Black"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 3.9,
      "count": 112
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "EXTURED CROSSBODY BAG",
    "description": "Crossbody bag with a rubberised finish. Main compartment with zip closure. The interior features a pocket with zip closure. Two hand straps and an adjustable and detachable shoulder strap.\n\nHeight x Length x Width: 19 x 38 x 19 cm.",
    "price": 11850,
    "discountPrice": 3950,
    "category": "BAGS",
    "subCategory": "Hand Bag",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912616/products/a5l4jypdymgak0wzz9hq.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912618/products/trbxel0citqwetrwkl1z.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768912617/products/hz2k67zlqvueivhhsnkh.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Black"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.1,
      "count": 89
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "LACOPINE Leather Retro Men's Shoulder Messenger Sling Bag,Brown",
    "description": "Dimension: 25cm L X 7cm W X 28cm H. Weight:0.75kg\nComfortable to Wear: The adjustable shoulder strap ensures a comfortable fit, making it easy to carry all day long.\nVersatile Style: The simple yet stylish design makes this bag perfect for both casual and formal occasions.",
    "price": 20997,
    "discountPrice": 6999,
    "category": "BAGS",
    "subCategory": "Shoulder Bag",
    "brand": "LACOPINE",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768921398/products/sopbs6xwvv8fsvjd8f39.jpg"
    ],
    "stock": 5,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Brown"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 3.8,
      "count": 34
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "XL LEATHER TRAVEL BAG",
    "description": "Leather travel bag with a split suede finish. Main compartment with zip and magnetic closure. The interior has a zipped pocket and a flat pocket. Two leather hand straps.\n\nHeight x Length x Width: 30 x 54 x 17 cm. / 11.8 x 21.2 x 6.6″",
    "price": 38850,
    "discountPrice": 12950,
    "category": "BAGS",
    "subCategory": "Travel Bag",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768921875/products/lyu4cakf97jhsfopevsv.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768921876/products/mtmoosw6zr6sfgiogixi.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768921876/products/ed4rufvsa4ka9ghfjpkp.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["M", "L"],
      "color": ["Gray"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.4,
      "count": 56
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "MULTI-POCKET TRAVEL BAG",
    "description": "Travel bag with an engraved finish. Main compartment with magnetic clasp closure. The interior features a zip pocket. The front has three pockets of different sizes with magnetic clasp closure. Two handles.",
    "price": 22650,
    "discountPrice": 7550,
    "category": "BAGS",
    "subCategory": "TRAVEL BAG",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768922126/products/y92xkeqxnno1nkchmff7.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768922126/products/fzxnvbri4kckwumwrt3g.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768922126/products/cjs5yyn6sgnqop9gpsjg.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M"],
      "color": ["Black"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.0,
      "count": 78
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "Joan Sneakers",
    "description": "The cushioned soles and the breathable build make them a reliable piece to carry you wherever you go.",
    "price": 11997,
    "discountPrice": 3999,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "U.S. POLO",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925664/products/n1dcalybjm9qmuubpe21.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925663/products/jv1jdnnks4zetl6ji6mp.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925663/products/l1mpdqfbpoostbqrvyql.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["White"],
      "material": "Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.5,
      "count": 203
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "Men Colourblocked Round Toe Sneakers",
    "description": "A pair of round toe beige sneakers ,has regular styling,\nLace-ups detail\nSynthetic leather upper\nCushioned footbed\nTextured and patterned outsole",
    "price": 4497,
    "discountPrice": 1499,
    "category": "SHOES",
    "subCategory": "sneakers",
    "brand": "ASIAN",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925925/products/vo0sqzlc1u7aco3bs78q.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925928/products/yrevx4pnxbvjhl8msza0.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1768925926/products/hjffipg4ir5glno3dqtv.jpg"
    ],
    "stock": 9,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Green"],
      "material": "Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 3.7,
      "count": 91
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "Women Backstrap Pointed Toe Kitten Pumps",
    "description": "A pair of burgundy sandals ,has regular ankle and backstrap\nSynthetic solid upper with other\nCushioned footbed\nTextured and patterend outsole, has a kitten Upper material: Synthetic\nSole Material:Resin\nWipe with a clean, dry cloth to remove the dustv",
    "price": 8997,
    "discountPrice": 2999,
    "category": "SHOES",
    "subCategory": "heels",
    "brand": "Lavie",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769001964/products/ddo5obrpynhponw6aaed.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769001965/products/gaftjiybkcswxvgntjuz.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769001964/products/qpozfg2owwnq6x8n5mv8.jpg"
    ],
    "stock": 15,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Red"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 127
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "Women Heels Sandal",
    "description": "Women Heels SandalExperience elegance with the Allen Solly women beige heels, crafted from premium vegan leather for a sophisticated look. Featuring a solid pattern, these formal heels perfectly elevate any outfit, making them ideal for special occasions. The lightweight EVA sole ensures comfort throughout the day, allowing you to step out in style without sacrificing ease. Embrace a touch of luxury with these versatile heels, designed to enhance your formal wardrobe beautifully",
    "price": 11997,
    "discountPrice": 3999,
    "category": "SHOES",
    "subCategory": "Heels",
    "brand": "Allen Solly",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769002307/products/edmobnpj0zaf5odm7x4q.webp",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769002307/products/c9tbk12m0g3kk0t2iygt.webp",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769002306/products/nsebe1mb6cstlypiejgd.webp"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["White"],
      "material": "Leather",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.6,
      "count": 88
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "SUEDE EFFECT BOMBER JACKET",
    "description": "Long sleeve bomber jacket with a lapel collar and shoulder tabs. Hem finished with pleats and volume. Front fastening with a fly front and hidden buttons",
    "price": 11997,
    "discountPrice": 3999,
    "category": "WOMEN",
    "subCategory": "Coat",
    "brand": "savana",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003101/products/ckrj7gx38unzyyyy3dop.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003101/products/fscnrjwthz89c1sb7ewa.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003104/products/ihvm3rnnr3xewlwolhva.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Black"],
      "material": "polyester & elastane",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.3,
      "count": 45
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "TRF HIGH-WAIST WIDE-LEG JEANS",
    "description": "HIGH-WAIST - WIDE LEG - FULL LENGTH\n\nHigh-waist, five-pocket jeans. Extra-long wide leg. Front zip and metal button fastening.",
    "price": 8997,
    "discountPrice": 2999,
    "category": "WOMEN",
    "subCategory": "Jeans",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003340/products/trmsz0r3es9b0sjszucb.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003339/products/hnxdajmc4l5mufuyyhwo.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769003341/products/mdqvmkvfxatpuce9jjno.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Black"],
      "material": "cotton & lyocell",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.4,
      "count": 167
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "TRF MID-WAIST TURN-UP WAIST JEANS",
    "description": "TRF MID-WAIST TURN-UP WAIST JEANSMID-WAIST - FULL LENGTH - RIPPED\n\nMid-waist jeans with belt loops and a turn-up waist. Featuring five pockets and ripped detailing. Zip fly and metal top button fastening.",
    "price": 13797,
    "discountPrice": 4599,
    "category": "WOMEN",
    "subCategory": "Jeans",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073328/products/yt5clyouqboyjo5mjcsz.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073330/products/s6krghijakmmalht1xdg.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073333/products/wsgarkh7r4n1av1wahmv.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Blue"],
      "material": "Cotton and polyster",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.1,
      "count": 93
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "WIDE-LEG TROUSERS WITH DOUBLE WAISTBAND",
    "description": "WIDE-LEG TROUSERS WITH DOUBLE WAISTBAND High-waist wide-leg trousers with double elasticated waistband with adjustable drawstring and contrast fabric. Featuring front darts. Front pocket and false back welt pocket. Invisible side zip fastening.",
    "price": 9750,
    "discountPrice": 3250,
    "category": "WOMEN",
    "subCategory": "Jeans",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073632/products/b9ruqcu89kegt3qf8mvj.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073633/products/xn7tf8wukkutwnrb8p1o.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073633/products/ekklgytcdppdoxu0zwyd.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Black"],
      "material": "62% polyester 5% elastane 33% viscose",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.0,
      "count": 78
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "PLAIN POPLIN SHIRT",
    "description": "PLAIN POPLIN SHIRT Plain shirt with main fabric made from 100% cotton yarn. Featuring a lapel collar and long sleeves with cuffs. Button-up front.",
    "price": 7500,
    "discountPrice": 2500,
    "category": "WOMEN",
    "subCategory": "Shirt",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073969/products/q150huplwd0fnqtc9m3n.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073965/products/em3rj4hb89ekvk4slgj9.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073965/products/kvaxm1qquzzqywssgrk7.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769073965/products/dm02ytottau4xllqyuys.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["White"],
      "material": "100% cotton",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 102
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "SUPIMA® LONG SLEEVE T-SHIRT",
    "description": "SLIM FIT - ROUND NECK - REGULAR LENGTH - LONG SLEEVE\n\nT-shirt with main fabric made of 100% Supima® cotton. Round neck and contrasting long sleeves. Straight hem.",
    "price": 7035,
    "discountPrice": 2345,
    "category": "WOMEN",
    "subCategory": "T-Shirt",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074409/products/vouwyulyob8fizwt49df.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074408/products/u44nymdtfvwtobsaooae.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074407/products/r5jqalm8wiko0wqiewma.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Blue"],
      "material": "100% cotton",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.5,
      "count": 189
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "SQUARE NECK POLYAMIDE BODYSUIT",
    "description": "SQUARE NECK POLYAMIDE BODYSUIT Fitted bodysuit made from a polyamide blend yarn. Featuring a square neckline and long sleeves.",
    "price": 5250,
    "discountPrice": 1750,
    "category": "WOMEN",
    "subCategory": "Top",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074648/products/nfl9azgushoq1svz7me8.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074649/products/jwkiua3j5xulcz6oaeh8.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769074649/products/vwlcjonvhtdjxqw7ivas.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Red"],
      "material": "93% polyamide 7% elastane",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.3,
      "count": 76
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "TEXTURED OXFORD SHIRT",
    "description": "Regular fit shirt made from cotton fabric. Featuring a button-down collar and long sleeves with buttoned cuffs. Chest patch pocket. Button-up front.",
    "price": 3777,
    "discountPrice": 1259,
    "category": "MEN",
    "subCategory": "Shirt",
    "brand": "Lavie",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075047/products/rzormrn2znm0ooovnubx.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075047/products/foeuqpluya2wdx8nblab.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075047/products/wq7aqj2qm0qigvkipgut.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Gray"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.4,
      "count": 134
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "STRAIGHT FIT JEANS",
    "description": "STRAIGHT FIT JEANS Straight leg from hip to ankle, with a fit that neither narrows nor widens. Mid-rise. Rigid fabric.\n\nFive pockets. Faded effect. Front button fastening.",
    "price": 8697,
    "discountPrice": 2899,
    "category": "MEN",
    "subCategory": "Jeans",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075606/products/eqif1biwyfkqgjfhvgvi.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075608/products/vwjmpp3leh3xoezksjm9.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075607/products/xfxltcf7hx3b9hrzrbh1.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["White"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.1,
      "count": 98
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "SWEATSHIRT WITH CONTRAST POLO COLLAR",
    "description": "SWEATSHIRT WITH CONTRAST POLO COLLAR Model height: 185 cm | Size: L\n\nRegular fit polo sweatshirt. Lapel collar with a concealed button-up front. Long sleeves. Ribbed trims.",
    "price": 4497,
    "discountPrice": 1499,
    "category": "MEN",
    "subCategory": "T Shirt",
    "brand": "Nubero",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075798/products/fwb5yeeuzxdo9hg8sv1a.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075798/products/aoeex1yahd8lbttihroc.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769075798/products/zkkkcub2hxkvdfnbm5af.jpg"
    ],
    "stock": 15,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Blue"],
      "material": "79% cotton 21% polyester",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.6,
      "count": 156
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "REGULAR FIT TEXTURED POLO SHIRT",
    "description": "REGULAR FIT TEXTURED POLO SHIRT Regular fit polo shirt made of cotton fabric with a vertical texture. Featuring a lapel collar and front button fastening. Short sleeves with ribbed trims.",
    "price": 4197,
    "discountPrice": 1399,
    "category": "MEN",
    "subCategory": "T Shirt",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769076091/products/ezf8j1pmt67wqovi1apn.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769076088/products/skf0becyluprkkwihsec.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769076092/products/kkh8qmcraf5sombl2u7d.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Gray"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 123
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "INTERLOCK POLO SWEATSHIRT WITH ZIP",
    "description": "INTERLOCK POLO SWEATSHIRT WITH ZIP Regular fit polo sweatshirt made from technical interlock cotton fabric with stretch. Featuring a lapel collar with front zip fastening. Long sleeves. Ribbed trims.",
    "price": 5340,
    "discountPrice": 1780,
    "category": "MEN",
    "subCategory": "T Shirt",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077063/products/aw2aqbqpwgkzb6tsrj7k.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077074/products/t2pcm1uhy8qmn2hkz0og.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077066/products/mvqfkqdur12kad2awzya.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["White"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.3,
      "count": 87
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "BAGGY FIT CHINO JEANS",
    "description": "BAGGY FIT CHINO JEANS Model height: 186 cm | Size: M\n\nBaggy fit jeans made from unwashed cotton denim. This gives them a stiff appearance on first wear, which will soften over time with use. Loose and wide fit throughout the leg. Mid-waist. Stiff fabric.\n\nFront pockets and rear patch pocket detail. Contrasting topstitching throughout the garment. Front zip fly and button fastening.",
    "price": 14670,
    "discountPrice": 4890,
    "category": "MEN",
    "subCategory": "Jeans",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077491/products/ma5hmdt0xskl3jvdpt7r.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077493/products/tpcnuoplt8welhjgu1xv.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077492/products/lectlbnalsacn9pvh03a.jpg"
    ],
    "stock": 19,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Black"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.0,
      "count": 65
    },
    "isActive": true,
    "condition": "New",
    "__v": 0
  },
  {
    "name": "BASIC RELAXED FIT JOGGER TROUSERS",
    "description": "Relaxed fit jogger trousers made from cotton fabric with a brushed interior. Featuring wide legs, an elastic waistband with adjustable inner drawstring, side pockets and a rear pocket detail.",
    "price": 8637,
    "discountPrice": 2879,
    "category": "MEN",
    "subCategory": "Jeans",
    "brand": "Nubero",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077678/products/ux2bkggyisbmixnplnay.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077676/products/o1bapv7wuq3lrqtiyhoy.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077681/products/hmnxt2l8q5jpl1upitzc.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Gray"],
      "material": "56% polyester, 44% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.4,
      "count": 142
    },
    "isActive": true,
    "condition": "Winter",
    "__v": 0
  },
  {
    "name": "REGULAR FIT JEANS",
    "description": "REGULAR FIT JEANS Model height: 188 cm | Size: L\n\nNarrower through the leg than our basic straight-leg model. Straight-leg from hip to ankle, with a fit that neither tapers nor widens. Mid-waist. Rigid fabric. Regular fit jeans made from cotton denim. Five pockets. Faded effect. Front button fastening",
    "price": 7167,
    "discountPrice": 2389,
    "category": "MEN",
    "subCategory": "Jeans",
    "brand": "H&M",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077851/products/rgjgawelomfj5xcvbhcm.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077852/products/enqogfv2k9ghd4baqw2y.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769077854/products/umcuvc6denlbpuar0tdw.jpg"
    ],
    "stock": 8,
    "attributes": {
      "size": ["S", "M", "L"],
      "color": ["Blue"],
      "material": "100% cotton",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.1,
      "count": 109
    },
    "isActive": true,
    "condition": "Popular",
    "__v": 0
  },
  {
    "name": "SHORT DRESS WITH BOW DETAIL",
    "description": "SHORT DRESS WITH BOW DETAIL Short round neck dress with a bow detail, square neckline and short sleeves. Featuring a combined inner lining and an invisible back zip fastening.",
    "price": 6699,
    "discountPrice": 3450,
    "category": "WOMEN",
    "subCategory": "Dress",
    "brand": "savana",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353361/products/zqgwjq0vnoksbo47s2nk.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353358/products/oafdeb9vlocage2sb3va.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353360/products/fnpfwp0v4wh2gzxbrdg8.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Black"],
      "material": "92% polyester",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 34
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "DRAPED LONG DRESS",
    "description": "Long dress made from a cotton blend yarn. Features a round neck and short sleeves. Side draped detail. Hem finished in an A-line style.",
    "price": 7899,
    "discountPrice": 3559.99,
    "category": "WOMEN",
    "subCategory": "Dress",
    "brand": "Nubero",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353781/products/nlnb2w4rvzboy51bcsbr.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353782/products/ac5xxiiddbi9tdye9bi9.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353781/products/j6inhltiksezfkcsbyj7.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769353783/products/iycd5d7ymfm59pcezsk3.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Brown"],
      "material": "95% Cotton",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.3,
      "count": 28
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "MAXI HIGH NECK DRESS",
    "description": "MAXI HIGH NECK DRESS Long dress with a high neck and short sleeves.",
    "price": 6399,
    "discountPrice": 3299,
    "category": "WOMEN",
    "subCategory": "Dress",
    "brand": "ZARA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354133/products/pmvgprtzxwtezmmnqbaq.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354130/products/cuh25ozlg75uq6ik5qo5.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354131/products/erqky9cadeyhv3jsimdj.jpg"
    ],
    "stock": 8,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Beige"],
      "material": "89% acrylic, 11% elastane",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.0,
      "count": 22
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "SOFT TOP WITH BUCKLE",
    "description": "SOFT TOP WITH BUCKLE Top featuring a straight neckline, open shoulders and long sleeves. Combination of contrasting fabrics. Metal buckle detail. Straight hem.",
    "price": 4799,
    "discountPrice": 2298.98,
    "category": "WOMEN",
    "subCategory": "Dress",
    "brand": "Dyson",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354500/products/n2oryeogmaqeir1tovkc.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354498/products/b3y0rhnrfcs4tih9soim.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354499/products/hdiyedcvmqj3ybacaufh.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769354500/products/vlmfxbkte7qvge4ez6sc.jpg"
    ],
    "stock": 2,
    "attributes": {
      "size": ["S", "M", "L", "XL"],
      "color": ["Black"],
      "material": "54% polyester, 45% viscose, 1% elastane",
      "gender": "WOMEN"
    },
    "ratings": {
      "average": 4.1,
      "count": 18
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Men Colourblocked Round Toe Mid-Top Sneakers",
    "description": "A pair of round toe beige sneakers ,has regular styling,\r\nLace-ups detail\r\nSynthetic leather upper\r\nCushioned footbed\r\nTextured and patterned outsole",
    "price": 10599,
    "discountPrice": 4599,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "ASIAN",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769943626/products/vkcxzaogg65mfovyeh0s.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769943632/products/kfyv0cg0tcf7wu5zbxvs.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1769943631/products/qleqzjo81ei2wovibwte.jpg"
    ],
    "stock": 10,
    "attributes": {
      "size": ["7", "8", "9", "10"],
      "color": ["Green"],
      "material": "Synthetic Leather",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 45
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Unisex BB480 Colourblocked Leather Sneakers",
    "description": "Unisex BB480 Colourblocked Leather Sneakers Main material: Leather upper / Rubber outsole\r\nBrand colour: MARSH GREEN (386)\r\nBrand logo detail\r\nLace-up closure\r\nCushioned footbed\r\nTextured and patterned outsole",
    "price": 7999,
    "discountPrice": 3599,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "New Balance",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176465/products/wdc6tzgot0yfiwaei2mm.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176466/products/x0ezkxpe5jbydylxibvy.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176466/products/egslhk1ejix69zfqzemh.jpg"
    ],
    "stock": 1,
    "attributes": {
      "size": ["7", "8", "9", "10"],
      "color": ["Green"],
      "material": "Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.5,
      "count": 32
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Unisex Aesthet Everyday Comfor Colourblocked Sneakers",
    "description": "Unisex Aesthet Everyday Comfor Colourblocked Sneakers A pair of round toe white sneakers ,has regular styling\r\nLace-ups detail\r\nSynthetic upper\r\nCushioned footbed\r\nTextured and patterned outsole\r\nWarranty: 3 months\r\nWarranty provided by brand/manufacturer",
    "price": 6999,
    "discountPrice": 3999,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "PUMA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176692/products/ddtoz3z3awsbhrjhelnz.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176692/products/lwoekhurq9br1jfymhm0.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176694/products/hxmzighzfvr01yksx5uf.jpg"
    ],
    "stock": 2,
    "attributes": {
      "size": ["6", "7", "8", "9"],
      "color": ["White"],
      "material": "Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.3,
      "count": 56
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Unisex CA Pro NBK Perforated Leather Sneakers",
    "description": "Unisex CA Pro NBK Perforated Leather Sneakers ",
    "price": 8999,
    "discountPrice": 5999,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "PUMA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176859/products/tyzdilcey9uu3gnsxrgp.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176859/products/tztskctifrynhsaxxrzu.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772176859/products/svzqzxmb5qylamqgwd5n.jpg"
    ],
    "stock": 0,
    "attributes": {
      "size": ["6", "7", "8", "9", "10"],
      "color": ["Red"],
      "material": "Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.4,
      "count": 27
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Unisex Aesthet Everyday Comfort Sneakers",
    "description": "Unisex Aesthet Everyday Comfort Sneakers A pair of round toe white sneakers ,has regular styling,\r\nLace-ups detail\r\nSynthetic upper\r\nCushioned footbed\r\nTextured and patterned outsole\r\nWarranty: 3 months\r\nWarranty provided by brand owner/manufacturer",
    "price": 8999,
    "discountPrice": 3299,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "PUMA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177069/products/umxdsoa2q00trfiuil9n.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177069/products/hjrip5o1rxmlq5znnv7f.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177072/products/pwbn2goxouxw2k9ggiiu.jpg"
    ],
    "stock": 2,
    "attributes": {
      "size": ["6", "7", "8", "9", "10"],
      "color": ["Blue"],
      "material": "Rough Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.2,
      "count": 41
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Caven 2.0 Mid Sneakers",
    "description": "Caven 2.0 Mid Sneakers",
    "price": 6899,
    "discountPrice": 3599,
    "category": "SHOES",
    "subCategory": "Sneakers",
    "brand": "PUMA",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177264/products/fjrvuf17faoadpblzowx.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177263/products/xtnd7ujpeuoouhrwjgwf.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177263/products/qfxlzq5njkkpkehmaini.jpg"
    ],
    "stock": 2,
    "attributes": {
      "size": ["6", "7", "8", "9"],
      "color": ["Black"],
      "material": "Leather",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.1,
      "count": 38
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Unisex Classic 3 Bar Logo 16-Inch Laptop Backpack",
    "description": "Unisex Classic 3 Bar Logo 16-Inch Laptop Backpack Product design details\r\nBeige brand logo backpack\r\nPadded ergonomic shoulder straps, has non-padded haul loop\r\n1 main compartment with zip closure, has non-padded laptop compartment,\r\n1 zip pocket, 2 stash pockets\r\nPadded back\r\nWarranty: 3 months\r\nWarranty provided by brand owner/manufacturer\r\nComes with a pencil case",
    "price": 4999,
    "discountPrice": 1899,
    "category": "BAGS",
    "subCategory": "Backpack",
    "brand": "ADIDAS",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177875/products/xsqrp8blftkm9jte6gh3.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177878/products/jq26uzfw9ymq1icsrhtl.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177881/products/d5luumocefy008jzvo6v.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772177881/products/kgc4yqjf60zeokt536fg.jpg"
    ],
    "stock": 5,
    "attributes": {
      "size": ["one size"],
      "color": ["Beige"],
      "material": "92% polyester",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.3,
      "count": 52
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Heritage Backpack (25L)",
    "description": "Heritage Backpack (25L) Take your gear to go with the Nike Heritage Backpack. Its spacious main compartment features a sleeve that holds up to a 15\" laptop, so your computer is never out of reach. 2 zipped accessories pockets help keep your gear organised and easy to grab. This product is made from at least 65% recycled polyester fibres.",
    "price": 9600,
    "discountPrice": 2399,
    "category": "BAGS",
    "subCategory": "Backpack",
    "brand": "Nike",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772178367/products/xirvbg0czij7o2hn0wre.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772178368/products/hije4slmi0iobngaxmcd.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772178371/products/bvnnxk7jetprkjwgxfcr.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772178371/products/b3gp4z16kknol7zaw1at.jpg"
    ],
    "stock": 5,
    "attributes": {
      "size": ["one size"],
      "color": ["Green"],
      "material": "92% polyester",
      "gender": "UNISEX"
    },
    "ratings": {
      "average": 4.5,
      "count": 63
    },
    "isActive": true,
    "__v": 0
  },
  {
    "name": "Men Colourblocked Backpack",
    "description": "Men Colourblocked Backpack Beige colourblocked fashion backpacks\r\nPadded ergonomic shoulder straps, has 1 main compartment with zip closure, has padded laptop compartment,\r\n1 zip pocket, 2 stash pockets\r\nPadded mesh back\r\nWater Resistance: no\r\nWarranty: 3 months\r\nWarranty provided by brand owner/manufacturer",
    "price": 5899,
    "discountPrice": 2399,
    "category": "BAGS",
    "subCategory": "Backpack",
    "brand": "Jack & Jones",
    "images": [
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772184009/products/mu2zknpbhqxe95qpeza2.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772184009/products/bs3zorqoj9yhnmkucv49.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772184009/products/ggyxgagh32w6ngbgvg5o.jpg",
      "https://res.cloudinary.com/daljst4uc/image/upload/v1772184011/products/oo1t9wicj31md7uc5el9.jpg"
    ],
    "stock": 5,
    "attributes": {
      "size": ["one size"],
      "color": ["Beige"],
      "material": "100% Polyester",
      "gender": "MEN"
    },
    "ratings": {
      "average": 4.2,
      "count": 29
    },
    "isActive": true,
    "__v": 0
  }
];

(async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected");
        await product.insertMany(products_json)
        console.log("data inserted")
        process.exit();
        
    }catch(error){
        console.log(error)
            process.exit(1);
    
    }
})()