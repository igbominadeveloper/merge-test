import { TextFieldProps } from '@mui/material';
import BasicPasswordInput from '@/shared/Form/BasicPasswordInput';
import PasswordCheckText from '@/shared/Form/password-input/PasswordCheckText';

const PATTERNS = {
  min: `^(?=.{8,})`,
  max: `^(.{1,100})$`,
  lowercase: `^(?=.*[a-z])`,
  uppercase: `^(?=.*[A-Z])`,
  number: `^(?=.*[0-9])`,
  symbol: `^(?=.*[@#$%^&+=])`,
  space: `^(?=^\\S*$)`,
};

type PasswordWithChecksType = {
  isError?: boolean;
  errorMessage?: string;
} & TextFieldProps;

const usePasswordPatterns = (password: string) => {
  const isMinOf8 = !!password?.match(PATTERNS.min);
  const isSymbolIncluded = !!password?.match(PATTERNS.symbol);
  const isNumberIncluded = !!password?.match(PATTERNS.number);
  const isLowerCaseIncluded = !!password?.match(PATTERNS.lowercase);
  const isUppercaseIncluded = !!password?.match(PATTERNS.uppercase);
  const hasSpaceIncluded = !!password?.match(PATTERNS.space);

  return {
    isMinOf8,
    isSymbolIncluded,
    isNumberIncluded,
    isLowerCaseIncluded,
    isUppercaseIncluded,
    hasSpaceIncluded,
  };
};

function PasswordWithChecks(props: PasswordWithChecksType) {
  const { isError, label, value } = props;
  const {
    isLowerCaseIncluded,
    isMinOf8,
    isNumberIncluded,
    isSymbolIncluded,
    isUppercaseIncluded,
    hasSpaceIncluded,
  } = usePasswordPatterns(value as string);

  const passwordInputs = [
    { value: isLowerCaseIncluded, text: 'One lowercase character' },
    { value: isUppercaseIncluded, text: 'One uppercase character' },
    { value: isNumberIncluded, text: 'One number' },
    { value: isSymbolIncluded, text: 'One special character (@#$%^&+=)' },
    { value: isMinOf8, text: 'A minimum of 8 characters' },
    { value: hasSpaceIncluded, text: 'No whitespace allowed' },
  ];

  return (
    <div>
      <BasicPasswordInput value={value} label={label} error={isError} {...props} />
      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-4 font-primary">
        {passwordInputs.map(input => (
          <PasswordCheckText
            key={input.text}
            isCorrect={input.value}
            text={input.text}
            isEmpty={!value}
          />
        ))}
      </div>
    </div>
  );
}

export default PasswordWithChecks;
