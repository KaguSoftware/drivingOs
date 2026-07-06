const APP_STORE_URL = "https://apps.apple.com/app/example-drivers-license/id0000000000";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.example.driverslicense";

export function StoreBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-background"
      >
        <AppleIcon />
        App Store
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-background"
      >
        <PlayIcon />
        Google Play
      </a>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27-32.1 24.5-61.2 23.7-71.6-23.8 1.4-51.3 16.4-67 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 68.9-35.2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M325.3 234.3 104.1 13.1c-8.2-6.9-18.5-9.9-28.5-8.4L295.9 224l29.4 10.3zM47.6 27.6C34.9 34.3 26 44.8 26 62.1v387.8c0 17.3 8.9 27.8 21.6 34.5L273.5 256zM384.3 209.5l-59.7-33.1L295.9 288l28.7 111.6 59.7-33.1c33.9-19 33.9-124.9 0-157zM104.1 498.9l221.2-221.2-29.4-10.3L75.6 507.3c10 1.5 20.4-1.5 28.5-8.4z" />
    </svg>
  );
}
