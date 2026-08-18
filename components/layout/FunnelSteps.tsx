export type FunnelStep = { n: number; label: string };

type Props = {
  steps: FunnelStep[];
  current: number;
};

export function FunnelSteps({ steps, current }: Props) {
  return (
    <ol className="funnel-steps" aria-label="Checkout progress">
      {steps.map((step) => {
        const state =
          step.n < current ? "is-done" : step.n === current ? "is-current" : "";
        return (
          <li key={step.n} className={`funnel-step ${state}`.trim()}>
            <span className="funnel-step__n" aria-hidden="true">
              {step.n < current ? "✓" : step.n}
            </span>
            <span className="funnel-step__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
