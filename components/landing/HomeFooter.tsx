import Link from "next/link";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { SecureCheckoutTrust } from "@/components/ui/SecureCheckoutTrust";

export function HomeFooter() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo-text" style={{ color: "white" }}>
            Noor<span style={{ color: "var(--accent)" }}>Link</span>
            <sup className="logo-tm">TM</sup>
          </Link>
          <p style={{ marginTop: 20, lineHeight: 1.8 }}>
            Making global travel simple.
            <br />
            Mountain Road Pl NE, Suite R
            <br />
            Albuquerque, NM 87110
          </p>
          <FooterSocialLinks />
          <SecureCheckoutTrust
            variant="marks"
            showSsl={false}
            className="home-pay-badges footer-pay-marks"
          />
        </div>
        <div>
          <h4>Company</h4>
          <nav className="footer-list" aria-label="Company">
            <Link href="/about">About Us</Link>
            <Link href="/newsletter">Newsletter Archive</Link>
            <Link href="/support">Contact Support</Link>
            <Link href="/partners#apply">Partners</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
        </div>
        <div>
          <h4>Legal</h4>
          <nav className="footer-list" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/partners/terms">Partner Program Terms</Link>
            <Link href="/refund">Refund Policy</Link>
            <Link href="/kyc">KYC / AML Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} NoorLink.co. All rights reserved.
      </div>
    </footer>
  );
}
