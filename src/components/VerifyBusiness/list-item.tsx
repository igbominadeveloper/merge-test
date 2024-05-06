import Button from '@/shared/Form/Button';
import { DataProps } from '@/store/state/useVerifyStore';
import { VerificationLineItem } from '@/utils/verify';
import { Checkbox } from '@mui/material';

export function ListItem({
  data,
  checklist,
  disabled,
}: {
  data: VerificationLineItem;
  checklist?: DataProps;
  disabled?: boolean;
}) {
  return (
    <div
      className="mt-10 flex justify-between gap-2 border-b border-primary-900 pb-[35px] last-of-type:border-0 max-sm:flex-col max-sm:gap-5"
      key={data.id}
    >
      <div className="flex items-center gap-5">
        <Checkbox
          checked={checklist?.completed}
          sx={{
            '&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
              background: 'rgba(24, 144, 255, 0.12)',
              color: '#1890FF',
            },
          }}
        />
        <div>
          <p className="font-[500] max-md:text-[14px]">{data.name}</p>
          <p className="text-[12px] text-textColor-main">{data.details}</p>
        </div>
      </div>
      <Button
        disabled={checklist?.completed || !!disabled}
        className="h-9 text-sm font-semibold"
        variant="secondary"
        text={checklist?.completed ? 'Done' : 'Get Started'}
        handleClick={data.onClick}
      />
    </div>
  );
}
