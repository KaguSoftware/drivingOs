import { Composition } from "remotion";
import { DrivingOsPromo, TOTAL_DURATION } from "./DrivingOsPromo";

export const MyComposition = () => {
  return (
    <Composition
      id="DrivingOsPromo"
      component={DrivingOsPromo}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
