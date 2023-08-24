import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createStock } from 'apiSdk/stocks';
import { stockValidationSchema } from 'validationSchema/stocks';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { StockInterface } from 'interfaces/stock';

function StockCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StockInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStock(values);
      resetForm();
      router.push('/stocks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StockInterface>({
    initialValues: {
      name: '',
      open_price: 0,
      close_price: 0,
      high: 0,
      low: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: stockValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Stocks',
              link: '/stocks',
            },
            {
              label: 'Create Stock',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Stock
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Open Price"
            formControlProps={{
              id: 'open_price',
              isInvalid: !!formik.errors?.open_price,
            }}
            name="open_price"
            error={formik.errors?.open_price}
            value={formik.values?.open_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('open_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Close Price"
            formControlProps={{
              id: 'close_price',
              isInvalid: !!formik.errors?.close_price,
            }}
            name="close_price"
            error={formik.errors?.close_price}
            value={formik.values?.close_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('close_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="High"
            formControlProps={{
              id: 'high',
              isInvalid: !!formik.errors?.high,
            }}
            name="high"
            error={formik.errors?.high}
            value={formik.values?.high}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('high', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Low"
            formControlProps={{
              id: 'low',
              isInvalid: !!formik.errors?.low,
            }}
            name="low"
            error={formik.errors?.low}
            value={formik.values?.low}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('low', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/stocks')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'stock',
    operation: AccessOperationEnum.CREATE,
  }),
)(StockCreatePage);
