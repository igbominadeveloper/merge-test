'use client';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@/shared/Form/Button';
import TextInput from '@/shared/Form/TextInput';
import { InputAdornment } from '@mui/material';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import useDebounceValue from '@/hooks/useDebouce';
import { Beneficiary } from '@/types/transaction';
import { useBeneficiaries } from '@/services/queries/wallet';
import { prefetchBanks } from '@/services/queries/bank';
import BeneficiaryCard from './beneficiary-card';
import EmptyState from './empty-state';
import LoadingSkeleton from './loading-skeleton';

function Beneficiaries() {
  const [search, setSearch] = useState('');
  const deboucedSearch = useDebounceValue(search, 200);
  const { data, isLoading, isFetching } = useBeneficiaries(`search=${deboucedSearch}`);

  prefetchBanks();

  return (
    <div>
      {(isLoading || isFetching || data?.length || deboucedSearch) && (
        <>
          <h3 className="flex-shrink-0 text-[20px] font-medium sm:text-xl">Saved Beneficiaries</h3>

          <div className="mt-4 flex flex-col justify-between gap-x-8 gap-y-5 md:flex-row md:items-center">
            <TextInput
              placeholder="Search beneficiary by name"
              variant="outlined"
              className="w-full md:max-w-[500px]"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // Remove outline color
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // Remove outline color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // Remove focus outline color
                  },
                },
                '& .MuiInputBase-root': {
                  margin: 0, // Remove margin
                },
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
                borderRadius: 2,
              }}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="light-primary"
              className="w-auto flex-shrink-0"
              text="Add New Beneficiary"
              as="link"
              href={`${ROUTES.AccountManagement}/beneficiaries/add`}
            />
          </div>

          <div
            className={`mt-6 grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] place-content-start items-start gap-6 ${data?.length ? 'min-h-96' : ''}`}
          >
            {isLoading || isFetching
              ? new Array(9)
                  .fill(0) // eslint-disable-next-line react/no-array-index-key
                  .map((_, index) => <LoadingSkeleton key={index} />)
              : data?.map((item: Beneficiary) => <BeneficiaryCard {...item} key={item?.uuId} />)}
          </div>
        </>
      )}

      {data?.length === 0 && deboucedSearch && <EmptyState isSearch={!!deboucedSearch} />}

      {!isLoading && !isFetching && data?.length === 0 && !deboucedSearch && <EmptyState />}
    </div>
  );
}
export default Beneficiaries;
