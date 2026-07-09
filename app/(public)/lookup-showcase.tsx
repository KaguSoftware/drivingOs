import { CarIllustration } from "./car-illustration";

const FEATURES = [
  "Güncel sınav tarihi ve yeri",
  "Sınav yerine yol tarifi",
  "Sınav tanıtım videosu",
];

export function LookupShowcase({ carHidden = false }: { carHidden?: boolean }) {
  return (
    <div className="relative hidden bg-primary p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
      <h2 className="mb-4 max-w-sm text-3xl font-semibold text-primary-foreground">
        Ehliyet sınavınıza dair her şey tek yerde
      </h2>
      <ul className="flex flex-col gap-3">
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-sm text-primary-foreground/80"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/60" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-x-0 bottom-[20%]">
        <CarIllustration
          className={`mx-auto w-56 transition-opacity duration-150 ${carHidden ? "opacity-0" : "opacity-100"}`}
        />
        <svg className="h-[3px] w-full" aria-hidden="true">
          <line
            x1="0"
            y1="1.5"
            x2="100%"
            y2="1.5"
            stroke="var(--primary-foreground)"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeDasharray="18 14"
          />
        </svg>
      </div>
    </div>
  );
}
