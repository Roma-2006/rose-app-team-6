type StatisticsResponse = {
  status: boolean;
  code: number;
  payload: {
    summary: {
      totalProducts: number;
      totalOrders: number;
      totalCategories: number;
      totalRevenue: number;
      currency: string;
    };

    orderStatus: {
      completed: {
        count: number;
        percent: number;
      };
      inProgress: {
        count: number;
        percent: number;
      };
      canceled: {
        count: number;
        percent: number;
      };
      totalOrders: number;
    };

    revenue: {
      period: string;
      points: {
        period: string;
        label: string;
        revenue: number;
      }[];
    };
  };
};
