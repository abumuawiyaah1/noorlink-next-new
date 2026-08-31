import { redirect } from "next/navigation";

const ADMIN_SOCIAL_URL = "https://api.noorlink.co/admin/social-media";

export default function Page() {
  redirect(ADMIN_SOCIAL_URL);
}
