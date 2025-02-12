
export interface PriceTrend {
  average_price: number;
  price_change_percentage: number;
  date_group: string;
}

export interface LocationPrice {
  location: string;
  trends: PriceTrend[];
}
