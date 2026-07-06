import type { SVGProps } from "react";
import type { DASHBOARD_PATH_PREFIXES } from "@/lib/routes";

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

const StudentsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
  </Icon>
);

const VehiclesIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 17V11l2-5h10l4 5v6" />
    <path d="M3 11h16" />
  </Icon>
);

const VehicleChecksIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9 12 2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </Icon>
);

const ScheduleIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </Icon>
);

const TutorsIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </Icon>
);

const PaymentsIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </Icon>
);

const ExamPlacesIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

const ExamsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9 3h6l3 3v15H6V6l3-3Z" />
    <path d="M9 12h6M9 16h6M9 8h2" />
  </Icon>
);

export const NAV_ICONS: Record<(typeof DASHBOARD_PATH_PREFIXES)[number], (props: IconProps) => React.JSX.Element> = {
  "/admin/students": StudentsIcon,
  "/admin/vehicles": VehiclesIcon,
  "/admin/vehicle-checks": VehicleChecksIcon,
  "/admin/schedule": ScheduleIcon,
  "/admin/tutors": TutorsIcon,
  "/admin/payments": PaymentsIcon,
  "/admin/exam-places": ExamPlacesIcon,
  "/admin/exams": ExamsIcon,
};
