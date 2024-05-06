import Image from 'next/image';
import Cancel from '@/assets/icons/cancel.svg';
import Mark from '@/assets/icons/mark.svg';

interface IconProps {
  isEmpty: boolean;
  isCorrect: boolean;
}
function Icon({ isEmpty, isCorrect }: IconProps) {
  if (isEmpty) {
    return <div className="h-2 w-2 rounded-md bg-[#212B36]" />;
  }
  if (isCorrect) {
    return <Image src={Mark} alt="Mark" className="w-6" />;
  }
  return <Image src={Cancel} alt="Cancel" className="w-6" />;
}

interface PasswordCheckTextProps {
  isCorrect: boolean;
  text: string;
  isEmpty: boolean;
}

function PasswordCheckText({ isCorrect, isEmpty, text }: PasswordCheckTextProps) {
  return (
    <div className="flex min-w-[180px] items-center gap-1 pl-2">
      <div className="flex h-[18px] w-[18px] items-center justify-center">
        <Icon isCorrect={isCorrect} isEmpty={isEmpty} />
      </div>
      <p className="text-xs tracking-normal text-grey-900">{text}</p>
    </div>
  );
}

export default PasswordCheckText;
