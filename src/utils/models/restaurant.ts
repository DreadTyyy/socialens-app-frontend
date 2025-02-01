export type Restaurant = {
  restaurant_id: number;
  userId: number;
  urlMaps: string;
  title: string;
  created_at: string;
}

export type RestaurantSentiment = Restaurant & {
  positive: number;
  negative: number;
}