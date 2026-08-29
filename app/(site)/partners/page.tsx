import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partner & Referral Program | NoorLink",
  description:
    "Influencer, masjid, and refer-a-friend programs for NoorLink travel eSIMs. Calm, practical rewards — install before you fly.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PolicyPageShell
        title="Partner & referral programs"
        badge="NoorLink community"
        subtitle="Travel advisors, Islamic centers, creators, and customers — same trusted eSIM service."
        sections={[
          {
            title: "Influencers & creators",
            body: [
              "Your audience gets 10% off through your link. You earn 10% cash on net sales (paid monthly once you reach $25).",
            ],
          },
          {
            title: "Masjid & Islamic centers",
            body: [
              "Community links support your center — framed as helping the masjid, not a coupon hunt. Typical rate: 5% community discount and 12–15% to the organization on Umrah/Hajj corridor plans.",
            ],
          },
          {
            title: "Refer a friend (customers)",
            body: [
              "After your purchase, share your personal link. Friends save 10%; you receive 10% off your next order when they complete a trip.",
            ],
          },
          {
            title: "Apply or ask a question",
            body: [
              "Email support@noorlink.co with your name, organization (if any), and audience. We approve partners manually before links go live.",
            ],
          },
        ]}
      />
      <div className="container" style={{ paddingBottom: "3rem" }}>
        <p>
          <Link href="/destinations">Browse destinations</Link>
          {" · "}
          <Link href="/hajj-umrah">Hajj &amp; Umrah plans</Link>
        </p>
      </div>
    </>
  );
}
