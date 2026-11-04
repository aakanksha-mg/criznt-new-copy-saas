/**
 * One icon language across every capability list, comparison row and bullet
 * (guidelines s.07): line icons at a consistent 2px stroke, sized to sit inside
 * a blue-600 or cyan-400 chip.
 */
export type IconName =
  | 'check'
  | 'clock'
  | 'eye'
  | 'layers'
  | 'mic'
  | 'shield'
  | 'spark'
  | 'scale'
  | 'network'
  | 'mobile'
  | 'box'
  | 'flask'
  | 'building'
  | 'umbrella'
  | 'arrow'
  | 'alert'
  | 'globe'
  | 'offline'
  | 'chart'
  | 'lock'
  | 'mail'
  | 'chevron'
  | 'wallet'
  | 'chat'
  | 'book'
  | 'plug'
  | 'rocket';

const paths: Record<IconName, React.ReactNode> = {
  check: <polyline points="3.5 12 9 17.5 20.5 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
  eye: (
    <>
      <path d="M1.8 12S5.6 5 12 5s10.2 7 10.2 7-3.8 7-10.2 7S1.8 12 1.8 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2.8 21.5 8 12 13.2 2.5 8" />
      <polyline points="2.5 12.6 12 17.8 21.5 12.6" />
      <polyline points="2.5 16.8 12 22 21.5 16.8" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="21.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 20 6v5.5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6Z" />
      <polyline points="8.6 12 11 14.4 15.6 9.8" />
    </>
  ),
  spark: (
    <>
      <path d="M11 2.6 13.1 8.4 18.9 10.5 13.1 12.6 11 18.4 8.9 12.6 3.1 10.5 8.9 8.4Z" />
      <path d="M18 15.2 18.9 17.6 21.3 18.5 18.9 19.4 18 21.8 17.1 19.4 14.7 18.5 17.1 17.6Z" />
    </>
  ),
  scale: (
    <>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="5" y1="21" x2="19" y2="21" />
      <path d="M12 6 4 9l2.6 5.2a3.6 3.6 0 0 0 5.4-2.6Z" />
      <path d="M12 6l8 3-2.6 5.2a3.6 3.6 0 0 1-5.4-2.6Z" />
    </>
  ),
  network: (
    <>
      <rect x="9" y="2.2" width="6" height="5" rx="1.2" />
      <rect x="2" y="16.8" width="6" height="5" rx="1.2" />
      <rect x="16" y="16.8" width="6" height="5" rx="1.2" />
      <path d="M12 7.2v4.3M5 16.8v-2.1h14v2.1" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2.2" width="12" height="19.6" rx="2.4" />
      <line x1="10.4" y1="18.6" x2="13.6" y2="18.6" />
    </>
  ),
  box: (
    <>
      <path d="M21 8.4v7.2a1.8 1.8 0 0 1-.95 1.6l-7.2 3.9a1.8 1.8 0 0 1-1.7 0l-7.2-3.9A1.8 1.8 0 0 1 3 15.6V8.4a1.8 1.8 0 0 1 .95-1.6l7.2-3.9a1.8 1.8 0 0 1 1.7 0l7.2 3.9A1.8 1.8 0 0 1 21 8.4Z" />
      <polyline points="3.3 7.6 12 12.3 20.7 7.6" />
      <line x1="12" y1="12.3" x2="12" y2="21.4" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 2.5h5M10.5 2.5v6L5 18.2a2.2 2.2 0 0 0 1.9 3.3h10.2a2.2 2.2 0 0 0 1.9-3.3L13.5 8.5v-6" />
      <line x1="7.4" y1="14.6" x2="16.6" y2="14.6" />
    </>
  ),
  building: (
    <>
      <rect x="3.5" y="3" width="11" height="18.5" rx="1" />
      <path d="M14.5 9.5H20a.5.5 0 0 1 .5.5v11.5" />
      <path d="M7 7.5h4M7 11.5h4M7 15.5h4M17 13.5h1M17 17.5h1" />
    </>
  ),
  umbrella: (
    <>
      <path d="M2.5 12a9.5 9.5 0 0 1 19 0Z" />
      <path d="M12 12v7a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  arrow: (
    <>
      <line x1="3.5" y1="12" x2="20" y2="12" />
      <polyline points="13.8 5.6 20.4 12 13.8 18.4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.2 22 20.5H2Z" />
      <line x1="12" y1="9.5" x2="12" y2="14.5" />
      <circle cx="12" cy="17.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <ellipse cx="12" cy="12" rx="4" ry="9.2" />
      <line x1="2.9" y1="9" x2="21.1" y2="9" />
      <line x1="2.9" y1="15" x2="21.1" y2="15" />
    </>
  ),
  offline: (
    <>
      <path d="M4.2 9.2a11 11 0 0 1 15.6 0" />
      <path d="M7.6 12.8a6.2 6.2 0 0 1 8.8 0" />
      <circle cx="12" cy="17.6" r="1" fill="currentColor" stroke="none" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </>
  ),
  chart: (
    <>
      <line x1="3.5" y1="21" x2="21" y2="21" />
      <rect x="5" y="12" width="3.6" height="6" />
      <rect x="10.2" y="7.5" width="3.6" height="10.5" />
      <rect x="15.4" y="4" width="3.6" height="14" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="11" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <polyline points="3 6 12 13 21 6" />
    </>
  ),
  chevron: <polyline points="5 8.5 12 15.5 19 8.5" />,
  wallet: (
    <>
      <rect x="2.5" y="5.5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10.5h19" />
      <circle cx="17" cy="15" r="1.3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12.5a7.5 7.5 0 0 1-7.5 7.5H9l-4.5 2.5V17A7.5 7.5 0 0 1 9 5h4.5A7.5 7.5 0 0 1 21 12.5Z" />
      <path d="M9 12.5h6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13V20H6a2 2 0 0 0-2 2V5.5Z" />
      <path d="M4 18.5A2 2 0 0 1 6 16.5h13" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2.5v5M15 2.5v5" />
      <path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0v-3Z" />
      <path d="M12 16v5.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.5 3.5c4 1 7 4 7 7-2.5 4-6 7-10.5 9l-2.5-2.5C9.5 12.5 11 7.5 13.5 3.5Z" />
      <circle cx="15" cy="9" r="1.6" />
      <path d="M7.5 17 4 20.5" />
    </>
  ),
};

type Props = {
  name: IconName;
  className?: string;
  size?: number;
  title?: string;
};

export function Icon({ name, className, size, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
