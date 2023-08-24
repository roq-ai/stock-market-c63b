import { DataAnalysisInterface } from 'interfaces/data-analysis';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AlgorithmInterface {
  id?: string;
  name: string;
  description?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  data_analysis?: DataAnalysisInterface[];
  user?: UserInterface;
  _count?: {
    data_analysis?: number;
  };
}

export interface AlgorithmGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
}
