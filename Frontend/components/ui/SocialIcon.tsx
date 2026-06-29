import { LinkedInIcon, ResearchGateIcon, MailIcon, GlobeIcon } from "@/components/ui/icons";

interface SocialIconProps {
  icon?: string | null;
  iconUrl?: string | null;
  label: string;
  className?: string;
}

/**
 * Renders a social link's icon: a custom uploaded logo if present, otherwise a
 * built-in icon by name, falling back to a generic globe icon.
 */
export default function SocialIcon({ icon, iconUrl, label, className = "w-4 h-4" }: SocialIconProps) {
  if (iconUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={iconUrl} alt={label} className={`${className} rounded object-contain`} />;
  }
  switch ((icon || "").toLowerCase()) {
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "researchgate":
      return <ResearchGateIcon className={className} />;
    case "email":
    case "mail":
      return <MailIcon className={className} />;
    default:
      return <GlobeIcon className={className} />;
  }
}
