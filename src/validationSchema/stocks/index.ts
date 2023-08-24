import * as yup from 'yup';

export const stockValidationSchema = yup.object().shape({
  name: yup.string().required(),
  open_price: yup.number().required(),
  close_price: yup.number().required(),
  high: yup.number().required(),
  low: yup.number().required(),
  organization_id: yup.string().nullable().required(),
});
