import Image from 'next/image';
import Button from '@/shared/Form/Button';
import emailSent from '@/assets/icons/email-sent.svg';

interface Props {
  subHeading: string;
  heading: string;
  buttonLabel: string;
  onButtonClick?: () => void;
}
export default function Success(props: Props) {
  const { buttonLabel, heading, subHeading, onButtonClick } = props;

  return (
    <div className="flex flex-col">
      <Image className="mx-auto mb-5 mt-4" width={80} height={80} src={emailSent} alt="mail icon" />
      <p className="mb-2 text-center text-[24px] font-semibold text-grey-800">{heading}</p>
      <p className="text-body1 mb-5 text-center text-grey-900">{subHeading}</p>

      <Button
        className="h-[48px] w-full justify-center rounded-lg"
        type="button"
        text={buttonLabel}
        handleClick={onButtonClick}
      />
    </div>
  );
}
