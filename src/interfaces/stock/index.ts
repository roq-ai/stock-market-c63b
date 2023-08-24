import { DataAnalysisInterface } from 'interfaces/data-analysis';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface StockInterface {
  id?: string;
  name: string;
  open_price: number;
  close_price: number;
  high: number;
  low: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  data_analysis?: DataAnalysisInterface[];
  organization?: OrganizationInterface;
  _count?: {
    data_analysis?: number;
  };
}

export interface StockGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
