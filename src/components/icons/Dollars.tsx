import * as React from 'react';
import { memo } from 'react';

interface DollarsProps {
  className?: string;
}

function DollarsComponent({ className }: DollarsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        className={`'w-20 h-20' ${className}`}
        fillRule="evenodd"
        d="M17.756 2.3c-.403-.186-.638-.21-.692-.214A129.74 129.74 0 0 0 12 2c-4.275 0-6.693.143-8.02.276-.939.094-1.61.765-1.704 1.705C2.143 5.307 2 7.725 2 12c0 4.645.169 7.604.31 9.27.065.769.936 1.108 1.53.613L5.5 20.5l1.367 1.367a1 1 0 0 0 1.332.074L10 20.5l1.293 1.293a1 1 0 0 0 1.414 0L14 20.5l1.801 1.44a1 1 0 0 0 1.332-.073L18.5 20.5l1.66 1.383c.594.495 1.465.156 1.53-.614.141-1.665.31-4.624.31-9.269 0-2.127-.035-3.795-.087-5.097C21.475 6.957 20.857 7 20 7c-.63 0-1.13-.023-1.525-.057-.86-.073-1.42-.731-1.452-1.594C17.01 4.992 17 4.55 17 4c0-.886.024-1.5.052-1.914 0 0 .24 0 .703.215ZM11.66 15.268c.544 0 .937-.092 1.18-.276.251-.184.377-.41.377-.676a.697.697 0 0 0-.287-.58c-.192-.147-.479-.276-.862-.386l-.832-.249c-.413-.12-.786-.248-1.118-.386a3.267 3.267 0 0 1-.847-.497 2.087 2.087 0 0 1-.544-.69 2.14 2.14 0 0 1-.197-.952c0-.626.212-1.146.635-1.56.424-.414 1.028-.69 1.815-.828v-.393c0-.408.282-.773.69-.79.053-.003.104-.004.156-.004.373 0 .64.06.801.18.172.12.257.335.257.648v.304c.646.064 1.17.207 1.573.428.403.211.605.492.605.841 0 .156-.042.3-.113.431-.19.348-.663.323-1.038.196a4.93 4.93 0 0 0-.346-.102 4.517 4.517 0 0 0-1.255-.166c-.504 0-.882.079-1.134.235-.242.147-.363.34-.363.58 0 .193.08.35.242.469.171.12.428.23.771.331l.847.235c.907.257 1.602.598 2.086 1.021.494.423.741.994.741 1.711 0 .635-.222 1.174-.665 1.615-.444.433-1.094.723-1.95.87v.379c0 .408-.283.773-.691.79a3.554 3.554 0 0 1-.156.004c-.373 0-.645-.06-.817-.18-.16-.12-.242-.335-.242-.648v-.276c-.735-.074-1.335-.235-1.799-.483-.453-.258-.68-.58-.68-.966 0-.226.087-.422.226-.587.248-.295.692-.222 1.034-.044.147.075.306.147.479.217.413.156.887.234 1.42.234Z"
        clipRule="evenodd"
        opacity={0.32}
      />
      <path
        className={`'w-20 h-20' ${className}`}
        d="M21.913 6.903C21.475 6.957 20.857 7 20 7c-.63 0-1.13-.023-1.525-.057-.86-.073-1.42-.731-1.452-1.594C17.009 4.992 17 4.55 17 4c0-.886.024-1.5.052-1.914 0 0 1.035.002 2.948 1.914 1.913 1.913 1.913 2.903 1.913 2.903ZM11.66 15.267c.544 0 .937-.092 1.18-.276.251-.184.377-.41.377-.676a.697.697 0 0 0-.287-.58c-.192-.147-.479-.276-.862-.386l-.832-.249c-.413-.12-.786-.248-1.118-.386a3.267 3.267 0 0 1-.847-.497 2.087 2.087 0 0 1-.544-.69 2.14 2.14 0 0 1-.197-.952c0-.626.212-1.146.635-1.56.424-.414 1.028-.69 1.815-.828v-.393c0-.408.282-.773.69-.79.053-.003.104-.004.156-.004.373 0 .64.06.801.18.172.12.257.335.257.648v.304c.646.064 1.17.207 1.573.428.403.211.605.492.605.841 0 .156-.042.3-.113.431-.19.348-.663.323-1.038.196a4.93 4.93 0 0 0-.346-.102 4.517 4.517 0 0 0-1.255-.166c-.504 0-.882.079-1.134.235-.242.147-.363.34-.363.58 0 .193.08.35.242.469.171.12.428.23.771.331l.847.235c.907.257 1.602.598 2.086 1.021.494.423.741.994.741 1.711 0 .635-.222 1.174-.665 1.615-.444.433-1.094.723-1.95.87v.379c0 .408-.283.773-.691.79a3.554 3.554 0 0 1-.156.004c-.373 0-.645-.06-.817-.18-.16-.12-.242-.335-.242-.648v-.276c-.735-.074-1.335-.235-1.799-.483-.453-.258-.68-.58-.68-.966 0-.226.087-.422.226-.587.248-.295.692-.222 1.034-.044.147.075.306.147.479.217.413.156.887.234 1.42.234Z"
      />
    </svg>
  );
}
const Dollars = memo(DollarsComponent);
export default Dollars;