import type { SVGProps } from "react";
import type { LicenseClass } from "@/app/admin/(dashboard)/ogrenciler/types";

type IconProps = SVGProps<SVGSVGElement>;

function Icon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

const MotorcycleIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="5.5" cy="17.5" r="2.5" />
    <circle cx="18.5" cy="17.5" r="2.5" />
    <path d="M8 17.5h7l-2-6h-4l-1.5 3M13 11.5l2-3h3M15.5 8.5h2.5l1.5 4.5" />
  </Icon>
);

const CarIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 17V11l2-5h10l4 5v6" />
    <path d="M3 11h16" />
  </Icon>
);

const TruckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 17V7h9v10M12 10h5l3 3v4" />
    <circle cx="7" cy="17.5" r="2" />
    <circle cx="17" cy="17.5" r="2" />
  </Icon>
);

const BusIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M3 11h18M7 17v2M17 17v2" />
    <circle cx="7" cy="17" r="1.2" />
    <circle cx="17" cy="17" r="1.2" />
  </Icon>
);

const TractorIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="6" cy="17" r="3" />
    <circle cx="17" cy="17" r="2" />
    <path d="M9 17h6l-1-6H8l-3 3M9 11V6h5l2 5" />
  </Icon>
);

export const LICENSE_CLASS_ICONS: Record<LicenseClass, (props: IconProps) => React.JSX.Element> = {
  A: MotorcycleIcon,
  A1: MotorcycleIcon,
  A2: MotorcycleIcon,
  M: MotorcycleIcon,
  B: CarIcon,
  B1: CarIcon,
  BE: CarIcon,
  C: TruckIcon,
  C1: TruckIcon,
  D: BusIcon,
  D1: BusIcon,
  F: TractorIcon,
};
