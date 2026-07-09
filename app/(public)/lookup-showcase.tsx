import { CarIcon } from "./car-icon";

const FEATURES = [
  "Sınav tarihi ve yerinizi anında görün",
  "Sınav yerinin haritasını inceleyin",
  "Sınav tanıtım videosunu izleyin",
];

export function LookupShowcase({ driving = false }: { driving?: boolean }) {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 lg:flex-col bg-primary">
      <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
        <span className="mb-8 flex h-28 w-28 items-center justify-center rounded-3xl bg-primary-foreground/10 text-4xl font-bold text-primary-foreground">
          DO
        </span>
        <h2 className="mb-4 max-w-md text-3xl font-semibold tracking-tight text-primary-foreground">
          Sınavınıza hazır olun
        </h2>
        <ul className="mx-auto flex flex-col items-start gap-3 text-left">
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
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 mt-8.5 border-t-2 border-dashed border-primary-foreground/20" />
        <CarIcon
          className={`h-20 w-44 transition-transform duration-700 ease-in ${
            driving ? "translate-x-[-700%]" : ""
          }`}
        />
      </div>
    </div>
  );
}
