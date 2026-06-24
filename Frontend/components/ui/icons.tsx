import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MailIcon(props: IconProps) {
  const { width, height, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      width={width ?? 20}
      height={height ?? 20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  const { stroke, strokeWidth, fill, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" width={props.width ?? 20} height={props.height ?? 20} {...rest} fill="none">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
    </svg>
  );
}

export function ResearchGateIcon(props: IconProps) {
  const { stroke, strokeWidth, fill, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" width={props.width ?? 20} height={props.height ?? 20} {...rest} fill="none">
      <path d="M19.586 0c2.275 0 4.144 1.94 4.144 4.331v15.338c0 2.39-1.869 4.331-4.144 4.331H4.414C2.139 24 0 22.06 0 19.669V4.331C0 1.94 2.139 0 4.414 0h15.172zM7.227 18.06c1.332 0 2.383-.348 3.155-1.045.772-.697 1.157-1.666 1.157-2.909v-1.127h-4.041v1.54h2.158v.48c-.287.545-.884.818-1.792.818-1.048 0-1.85-.357-2.405-1.071-.555-.714-.833-1.698-.833-2.95 0-1.298.267-2.315.803-3.05.535-.736 1.341-1.103 2.417-1.103 1.054 0 1.838.307 2.353.92.515.614.773 1.458.773 2.531h1.838c-.023-1.654-.482-2.934-1.378-3.839C10.536 6.35 9.155 5.9 7.292 5.9c-1.823 0-3.23.504-4.223 1.513-.993 1.009-1.489 2.433-1.489 4.272 0 1.83.5 3.255 1.498 4.277.999 1.021 2.38 1.532 4.149 1.532v-.435h-.001zm11.238.163v-3.76h-2.365v3.76h-1.858v-8.81h3.313c1.385 0 2.443.344 3.175 1.033.731.688 1.096 1.637 1.096 2.846 0 1.098-.328 1.95-.985 2.557-.657.606-1.579.91-2.766.91h-1.468v1.464h1.858v-.001z" fill="#00CCBB"/>
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function DnaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4c0 6 10 10 10 16M17 4c0 6-10 10-10 16M8 7h8M8.5 10h7M8.5 14h7M8 17h8" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14M5 19c2-4 5-6 9-7" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9Z" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 1 2-2h13" />
    </svg>
  );
}
