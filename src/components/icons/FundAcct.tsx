type FundAcctProps = {
  className?: string;
};

function FundAcct({ className = '' }: FundAcctProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.32"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2231 2.6245C21.0674 2.80425 21.6303 3.4839 21.719 4.3425C21.8505 5.6156 22 7.95305 22 12C22 16.0469 21.8505 18.3844 21.719 19.6575C21.6303 20.5161 21.0674 21.1958 20.2231 21.3755C18.8905 21.6592 16.3784 22 12 22C7.6216 22 5.1095 21.6592 3.7769 21.3755C2.9326 21.1958 2.36965 20.5161 2.281 19.6575C2.1495 18.3844 2 16.047 2 12C2 7.95305 2.1495 5.6156 2.281 4.3425C2.36965 3.4839 2.9326 2.80425 3.77685 2.6245C5.1095 2.3408 7.6216 2 12 2C16.3784 2 18.8905 2.3408 20.2231 2.6245ZM7 15.6273L7 8.76395C7.00643 8.40415 7.15366 8.06126 7.41002 7.80908C7.66637 7.55691 8.01135 7.41562 8.37069 7.41562C8.73003 7.41562 9.07501 7.55691 9.33137 7.80908C9.58772 8.06126 9.73496 8.40415 9.74139 8.76395L9.74139 12.3329L14.6504 7.40466C15.1874 6.86558 16.0597 6.86505 16.5974 7.40346C17.1331 7.93995 17.1347 8.80813 16.5991 9.34475C14.876 11.0711 12.3038 13.6375 11.6604 14.2547L15.2242 14.2547C15.5835 14.2611 15.9259 14.4085 16.1777 14.6653C16.4295 14.922 16.5706 15.2675 16.5706 15.6273C16.5706 15.9872 16.4295 16.3327 16.1777 16.5894C15.9259 16.8461 15.5835 16.9936 15.2242 17L8.37069 17C8.0075 16.9989 7.65949 16.8539 7.40267 16.5968C7.14585 16.3396 7.00108 15.991 7 15.6273Z"
        className={className}
      />
      <path
        className={className}
        d="M7 8.76395L7 15.6273C7.00108 15.991 7.14585 16.3396 7.40267 16.5968C7.65949 16.8539 8.0075 16.9989 8.37069 17L15.2242 17C15.5835 16.9936 15.9259 16.8461 16.1777 16.5894C16.4295 16.3327 16.5706 15.9872 16.5706 15.6273C16.5706 15.2675 16.4295 14.922 16.1777 14.6653C15.9259 14.4085 15.5835 14.2611 15.2242 14.2547L11.6604 14.2547C12.3038 13.6375 14.876 11.0711 16.5991 9.34475C17.1347 8.80813 17.1331 7.93995 16.5974 7.40346C16.0597 6.86504 15.1874 6.86558 14.6504 7.40466L9.74139 12.3329L9.74139 8.76395C9.73496 8.40415 9.58772 8.06126 9.33137 7.80908C9.07501 7.55691 8.73003 7.41562 8.37069 7.41562C8.01135 7.41562 7.66638 7.55691 7.41002 7.80908C7.15366 8.06126 7.00643 8.40415 7 8.76395Z"
      />
    </svg>
  );
}

export default FundAcct;