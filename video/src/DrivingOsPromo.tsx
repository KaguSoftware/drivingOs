import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { StudentsScene } from "./scenes/StudentsScene";
import { SchedulingScene } from "./scenes/SchedulingScene";
import { PaymentsScene } from "./scenes/PaymentsScene";
import { ExamsScene } from "./scenes/ExamsScene";
import { OutroScene } from "./scenes/OutroScene";

const TRANSITION_FRAMES = 12;

export const DrivingOsPromo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={195}>
        <StudentsScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={195}>
        <SchedulingScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={195}>
        <PaymentsScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={195}>
        <ExamsScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={75}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const TOTAL_DURATION = 60 + 195 * 4 + 75 - TRANSITION_FRAMES * 5;
