export interface AdminStatisticsSummary {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  currency: string;
}

export interface AdminStatisticsCategory {
  id: string;
  title: string;
  productCount: number;
}

export interface AdminStatisticsTopProduct {
  productId: string;
  title: string;
  unitPrice: number;
  totalSales: number;
}

export interface AdminStatisticsLowStockProduct {
  id: string;
  title: string;
  stock: number;
}

export interface AdminStatisticsPayload {
  summary: AdminStatisticsSummary;
  categories: AdminStatisticsCategory[];
  orderStatus: AdminStatisticsOrderStatus;
  revenue: AdminStatisticsRevenue;
  topSellingProducts: AdminStatisticsTopProduct[];
  lowStockProducts: AdminStatisticsLowStockProduct[];
}

export interface AdminStatisticsResponse {
  status: boolean;
  code: number;
  message?: string;
  payload: AdminStatisticsPayload;
}
