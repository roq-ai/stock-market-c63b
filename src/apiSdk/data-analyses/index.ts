import axios from 'axios';
import queryString from 'query-string';
import { DataAnalysisInterface, DataAnalysisGetQueryInterface } from 'interfaces/data-analysis';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDataAnalyses = async (
  query?: DataAnalysisGetQueryInterface,
): Promise<PaginatedInterface<DataAnalysisInterface>> => {
  const response = await axios.get('/api/data-analyses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDataAnalysis = async (dataAnalysis: DataAnalysisInterface) => {
  const response = await axios.post('/api/data-analyses', dataAnalysis);
  return response.data;
};

export const updateDataAnalysisById = async (id: string, dataAnalysis: DataAnalysisInterface) => {
  const response = await axios.put(`/api/data-analyses/${id}`, dataAnalysis);
  return response.data;
};

export const getDataAnalysisById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/data-analyses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDataAnalysisById = async (id: string) => {
  const response = await axios.delete(`/api/data-analyses/${id}`);
  return response.data;
};
