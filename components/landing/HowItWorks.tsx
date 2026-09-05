import Image from "next/image";
import { TrustProofBanner } from "@/components/landing/TrustProofBanner";
import { HOW_IT_WORKS_STEPS } from "@/lib/how-it-works-steps";

export function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <TrustProofBanner className="trust-proof-banner--steps" />
        <div className="steps-header">
          <h2>How it works</h2>
          <p>Install before you fly — three calm steps to data on arrival.</p>
        </div>
        <div className="steps-grid">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article key={step.id} className="step-card">
              <div className="step-thumb">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={88}
                  height={88}
                  className="step-thumb__image"
                />
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
