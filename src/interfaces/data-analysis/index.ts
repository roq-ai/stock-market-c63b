import { StockInterface } from 'interfaces/stock';
import { AlgorithmInterface } from 'interfaces/algorithm';
import { GetQueryInterface } from 'interfaces';

export interface DataAnalysisInterface {
  id?: string;
  name: string;
  description?: string;
  stock_id: string;
  algorithm_id: string;
  created_at?: any;
  updated_at?: any;

  stock?: StockInterface;
  algorithm?: AlgorithmInterface;
  _count?: {};
}

export interface DataAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  stock_id?: string;
  algorithm_id?: string;
}
