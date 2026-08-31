import { redirect } from "next/navigation";

const ADMIN_TEAM_URL = "https://api.noorlink.co/admin";

export default function Page() {
  redirect(ADMIN_TEAM_URL);
}
