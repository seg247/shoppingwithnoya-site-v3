// Category keywords — match against deal title AND category field
// since most deals have category "Today's Deal", we need title-based matching
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Electronics': ['electronics', 'computer', 'laptop', 'tablet', 'phone', 'speaker', 'headphone', 'smart home', 'amazon device', 'fire tv', 'kindle', 'echo', 'ring', 'camera', 'tv', 'monitor', 'charger', 'cable', 'bluetooth'],
  'Home & Kitchen': ['home', 'kitchen', 'furniture', 'lamp', 'shelf', 'rack', 'organizer', 'mattress', 'bedding', 'pillow', 'towel', 'cleaning', 'vacuum', 'appliance', 'tool', 'garden', 'decor', 'curtain', 'rug'],
  'Beauty': ['beauty', 'skin', 'hair', 'makeup', 'cosmetic', 'lotion', 'serum', 'shampoo', 'conditioner', 'face', 'nail', 'lipstick', 'mascara', 'perfume', 'fragrance', 'moisturizer'],
  'Fashion': ['fashion', 'clothing', 'shirt', 'dress', 'pant', 'shorts', 'jacket', 'coat', 'shoes', 'sneaker', 'boot', 'sandal', 'hat', 'watch', 'jewelry', 'sunglasses', 'bag', 'purse', 'wallet'],
  'Toys': ['toy', 'doll', 'lego', 'playset', 'puzzle', 'game', 'baby', 'kids', 'stroller', 'car seat', 'diaper'],
  'Sports': ['sport', 'fitness', 'gym', 'yoga', 'exercise', 'bike', 'outdoor', 'camping', 'hiking', 'fishing', 'golf', 'dumbbell', 'barbell', 'weight'],
  'Pet Supplies': ['pet', 'dog', 'cat', 'puppy', 'kitten', 'leash', 'collar', 'treat', 'litter'],
};
