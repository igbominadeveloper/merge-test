import Link from 'next/link';

type FooterTextTypes = {
  text: string;
  linkText: string;
  link: string;
  className?: string;
  linkStyle?: string;
};

function FooterText({ text, linkText, link, className, linkStyle }: FooterTextTypes) {
  return (
    <div className="text-sm sm:text-base">
      <p className={`text-grey-900 ${className}`}>
        {text}{' '}
        <Link className={`font-bold text-primary-main ${linkStyle}`} href={link}>
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default FooterText;
