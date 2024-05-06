'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MuiSelectComponent from '@/shared/Form/FormSubcomponent/SelectComponent';
import { MenuItem } from '@mui/material';
import TextInput from '@/shared/Form/TextInput';
import Button from '@/shared/Form/Button';
import { useFetchProductTypes } from '@/services/queries/loan';
import { loanType, productUnit } from '@/utils/loans';
import SearchSelectComponent from '@/shared/Form/FormSubcomponent/autocomplete';
import AmountInput from '@/shared/Form/AmountInput';

import { CommodityFinancingType } from './types';
import { CommodityFinancingSchema, CommodityFinancingSchemaType } from '../../_validation';

interface Props {
  onNext: () => void;
  setData: React.Dispatch<React.SetStateAction<CommodityFinancingType>>;
  defaultData: CommodityFinancingType;
}

function CommodityFinancingApplicationForm({ onNext, defaultData, setData }: Props) {
  const { data: productTypes } = useFetchProductTypes();

  const {
    formState: { errors, isDirty, isValid },
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = useForm<CommodityFinancingSchemaType>({
    mode: 'all',
    resolver: zodResolver(CommodityFinancingSchema),
    defaultValues: {
      loanTenor: defaultData?.loanTenor ?? '',
      productQuantity: defaultData?.productQuantity ?? '',
      productType: defaultData?.productType ?? '',
      product: defaultData?.product ?? '',
      productUnit: defaultData?.productUnit ?? '',
      productUnitPurchasePrice: defaultData?.productUnitPurchasePrice ?? '',
      productUnitSellingPrice: defaultData?.productUnitSellingPrice ?? '',
      requestAmount: defaultData?.requestAmount ?? '',
      transactionType: defaultData?.transactionType ?? '',
      logisticCostPerTruck: defaultData?.logisticCostPerTruck ?? '',
      logisticsNumberOfTrucks: defaultData?.logisticsNumberOfTrucks ?? '',
      offTakerAddress: defaultData?.offTakerAddress ?? '',
      offTakerEmailAddress: defaultData?.offTakerEmailAddress ?? '',
      offTakerName: defaultData?.offTakerName ?? '',
      otherCostAmount: defaultData?.otherCostAmount ?? '',
      otherCostDescription: defaultData?.otherCostDescription ?? '',
      otherProduct: defaultData?.otherProduct ?? '',
    },
  });

  const values = watch();

  const products =
    productTypes?.find(item => values.productType.toLowerCase() === item?.category?.toLowerCase())
      ?.products || [];

  const onSubmit: SubmitHandler<CommodityFinancingSchemaType> = data => {
    setData({ ...defaultData, ...data });
    onNext();
  };

  const gridClass = 'grid grid-cols-2 gap-5';
  const titleClass = 'mb-4 text-2xl font-semibold';

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h4 className={titleClass}>Product information</h4>
        <div className={gridClass}>
          <Controller
            control={control}
            name="productType"
            render={({ field }) => (
              <MuiSelectComponent
                {...field}
                isError={!!errors.productType}
                errorMessage={errors.productType?.message}
                value={field.value ? field.value : ''}
                variant="filled"
                label="Product Type"
                onChange={e => {
                  setValue('product', '');
                  field.onChange(e);
                }}
              >
                {productTypes?.map((productType, id) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem value={productType.category} key={`${productType?.category}-${id}`}>
                    {productType.category}
                  </MenuItem>
                ))}
              </MuiSelectComponent>
            )}
          />
          <Controller
            control={control}
            name="transactionType"
            render={({ field }) => (
              <MuiSelectComponent
                {...field}
                isError={!!errors.transactionType}
                errorMessage={errors.transactionType?.message}
                value={field.value ? field.value : ''}
                variant="filled"
                label="Transaction Type"
              >
                {loanType.map(type => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </MuiSelectComponent>
            )}
          />

          {values.productType.toLowerCase() === 'other' ? (
            <Controller
              control={control}
              name="product"
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  fullWidth
                  isError={!!errors.product}
                  label="Product"
                  variant="filled"
                  errorMessage={errors?.product?.message || ''}
                />
              )}
            />
          ) : (
            <SearchSelectComponent<string>
              isError={!!errors.product}
              errorMessage={errors.product?.message}
              value={values.product ? values.product : null}
              getOptionLabel={option => option || ''}
              label="Product"
              options={products ?? []}
              onChange={(_, value) => {
                setValue('product', value || '');
                clearErrors('product');
                setValue('otherProduct', '');
              }}
            />
          )}

          <Controller
            control={control}
            name="productUnit"
            render={({ field }) => (
              <MuiSelectComponent
                {...field}
                isError={!!errors.productUnit}
                errorMessage={errors.productUnit?.message}
                value={field.value ? field.value : ''}
                variant="filled"
                label="Product Unit"
              >
                {productUnit.map((unit, id) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem value={unit} key={`${unit}-${id}`}>
                    {unit}
                  </MenuItem>
                ))}
              </MuiSelectComponent>
            )}
          />

          {values.product.toLowerCase() === 'other' && (
            <Controller
              control={control}
              name="otherProduct"
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  fullWidth
                  isError={!!errors.otherProduct}
                  label="Enter other product"
                  variant="filled"
                  errorMessage={errors?.otherProduct?.message || ''}
                />
              )}
            />
          )}

          <Controller
            control={control}
            name="productQuantity"
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                fullWidth
                isError={!!errors.productQuantity}
                label="Product Quantity"
                variant="filled"
                errorMessage={errors?.productQuantity?.message || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="productUnitPurchasePrice"
            render={({ field }) => (
              <AmountInput
                {...field}
                fullWidth
                isError={!!errors.productUnitPurchasePrice}
                label="Product unit purchase price"
                errorMessage={errors?.productUnitPurchasePrice?.message || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="productUnitSellingPrice"
            render={({ field }) => (
              <AmountInput
                {...field}
                fullWidth
                isError={!!errors.productUnitSellingPrice}
                label="Product unit selling price"
                errorMessage={errors?.productUnitSellingPrice?.message || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="requestAmount"
            render={({ field }) => (
              <AmountInput
                {...field}
                fullWidth
                label="Request amount"
                isError={!!errors.requestAmount}
                errorMessage={errors?.requestAmount?.message || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="loanTenor"
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                fullWidth
                isError={!!errors.loanTenor}
                label="Loan tenor (days)"
                variant="filled"
                errorMessage={errors?.loanTenor?.message || ''}
              />
            )}
          />
        </div>
      </div>

      <hr className="my-8 w-full bg-[#919EAB]/20" />

      <div>
        <h4 className={titleClass}>Logistics</h4>
        <div className={gridClass}>
          <Controller
            control={control}
            name="logisticCostPerTruck"
            render={({ field }) => (
              <AmountInput
                {...field}
                fullWidth
                isError={!!errors.logisticCostPerTruck}
                label="Logistics cost per truck"
                errorMessage={errors?.logisticCostPerTruck?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="logisticsNumberOfTrucks"
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                fullWidth
                isError={!!errors.logisticsNumberOfTrucks}
                label="Logistics number of trucks"
                variant="filled"
                errorMessage={errors?.logisticsNumberOfTrucks?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="otherCostAmount"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.otherCostAmount}
                label="Other Costs Amount (optional)"
                variant="filled"
                errorMessage={errors?.otherCostAmount?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="otherCostDescription"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.otherCostDescription}
                label="Other Costs Description (optional)"
                variant="filled"
                errorMessage={errors?.otherCostDescription?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="offTakerName"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.offTakerName}
                label="Off-taker’s name"
                variant="filled"
                errorMessage={errors?.offTakerName?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="offTakerAddress"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                fullWidth
                isError={!!errors.offTakerAddress}
                label="Off-taker’s address"
                variant="filled"
                errorMessage={errors?.offTakerAddress?.message || ''}
              />
            )}
          />
          <Controller
            control={control}
            name="offTakerEmailAddress"
            render={({ field }) => (
              <TextInput
                {...field}
                type="email"
                fullWidth
                isError={!!errors.offTakerEmailAddress}
                label="Off-taker’s email"
                variant="filled"
                errorMessage={errors?.offTakerEmailAddress?.message || ''}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-6 flex w-full justify-end">
        <Button
          text="Continue"
          ariaLabel="Continue"
          type="submit"
          className="min-w-[236px]"
          disabled={!isValid || (Object.values(defaultData! || {}).length < 0 && !isDirty)}
        />
      </div>
    </form>
  );
}

export default CommodityFinancingApplicationForm;
