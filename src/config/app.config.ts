interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Owner'],
  customerRoles: [],
  tenantRoles: ['System Owner', 'Data Analyst', 'Software Developer'],
  tenantName: 'Organization',
  applicationName: 'Stock Market',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
