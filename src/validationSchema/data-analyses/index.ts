import * as yup from 'yup';

export const dataAnalysisValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  stock_id: yup.string().nullable().required(),
  algorithm_id: yup.string().nullable().required(),
});
