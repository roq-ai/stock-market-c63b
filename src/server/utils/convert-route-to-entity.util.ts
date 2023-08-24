const mapping: Record<string, string> = {
  algorithms: 'algorithm',
  'data-analyses': 'data_analysis',
  organizations: 'organization',
  stocks: 'stock',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
