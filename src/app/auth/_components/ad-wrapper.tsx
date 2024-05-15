import Image, { StaticImageData } from 'next/image';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  image: StaticImageData;
};

function AdWrapper({ children, className = '', image }: LayoutProps) {
  return (
    <div className={`flex w-full items-center justify-center gap-20 ${className}`}>
      <div className="w-full max-w-[480px]">{children}</div>
      <div className="hidden w-full self-center overflow-hidden rounded-xl xl:flex xl:max-w-[37%]">
        <Image
          src={image}
          alt="ad-image"
          quality={50}
          placeholder="blur"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default AdWrapper;
