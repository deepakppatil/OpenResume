import { profile } from "@/data/profile";
import { prettyUrl } from "@/utils/assets";

/** Compact CV header that only appears when printing (the interactive hero is hidden in print). */
export function PrintHeader() {
  return (
    <div className="print-only border-b-2 border-ink pb-3">
      <p className="text-3xl font-extrabold tracking-tight">{profile.name}</p>
      <p className="mt-0.5 text-lg font-semibold text-accent">{profile.title}</p>
      <p className="mt-1.5 text-sm">
        {profile.email} · {profile.phone} · {profile.location} · {prettyUrl(profile.social.linkedin)} ·{" "}
        {prettyUrl(profile.social.github)}
      </p>
    </div>
  );
}
