const Svg = ({ children, size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const Bag = (props) => (
  <Svg {...props}>
    <path d="M5.5 8.5h13l1 11.5h-15l1-11.5Z" />
    <path d="M9 9V7a3 3 0 0 1 6 0v2" />
  </Svg>
);

export const Search = (props) => (
  <Svg {...props}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="m15.5 15.5 4.3 4.3" />
  </Svg>
);

export const Menu = (props) => (
  <Svg {...props}>
    <path d="M4 7.5h16M4 12h16M4 16.5h16" />
  </Svg>
);

export const Close = (props) => (
  <Svg {...props}>
    <path d="m5 5 14 14M19 5 5 19" />
  </Svg>
);

export const ArrowRight = (props) => (
  <Svg {...props}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
  </Svg>
);

export const ArrowLeft = (props) => (
  <Svg {...props}>
    <path d="M19.5 12h-15M10 6.5 4.5 12l5.5 5.5" />
  </Svg>
);

export const ChevronDown = (props) => (
  <Svg {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Svg>
);

export const ChevronRight = (props) => (
  <Svg {...props}>
    <path d="m9.5 6 6 6-6 6" />
  </Svg>
);

export const Plus = (props) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const Minus = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
);

export const Trash = (props) => (
  <Svg {...props}>
    <path d="M4.5 6.5h15M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7M6.5 6.5l.8 13.2h9.4l.8-13.2M10 10.5v5.5M14 10.5v5.5" />
  </Svg>
);

export const Heart = (props) => (
  <Svg {...props}>
    <path d="M12 20s-7-4.1-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.9 12 20 12 20Z" />
  </Svg>
);

export const Gift = (props) => (
  <Svg {...props}>
    <path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13" />
    <path d="M12 7S10.8 3.5 8.3 3.5a2 2 0 0 0 0 4H12ZM12 7s1.2-3.5 3.7-3.5a2 2 0 0 1 0 4H12Z" />
  </Svg>
);

export const Sparkle = (props) => (
  <Svg {...props}>
    <path d="M12 3.5c.5 4.4 2.6 6.5 7 7-4.4.5-6.5 2.6-7 7-.5-4.4-2.6-6.5-7-7 4.4-.5 6.5-2.6 7-7Z" />
    <path d="M19 16.5c.2 1.6 1 2.4 2.6 2.6-1.6.2-2.4 1-2.6 2.6-.2-1.6-1-2.4-2.6-2.6 1.6-.2 2.4-1 2.6-2.6Z" />
  </Svg>
);

export const Star = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...props}
  >
    <path d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.2Z" />
  </svg>
);

export const Truck = (props) => (
  <Svg {...props}>
    <path d="M3.5 6.5h10v10h-10zM13.5 10h4l3 3v3.5h-7" />
    <circle cx="7.3" cy="18" r="1.8" />
    <circle cx="17.3" cy="18" r="1.8" />
  </Svg>
);

export const Package = (props) => (
  <Svg {...props}>
    <path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" />
    <path d="m3.7 7.7 8.3 4.4 8.3-4.4M12 12.1V21" />
  </Svg>
);

export const Leaf = (props) => (
  <Svg {...props}>
    <path d="M20 4.5c-9 0-15 4.2-15 10.2 0 2.4 1.4 4.2 3.7 4.2 5.6 0 11.3-5.3 11.3-14.4Z" />
    <path d="M4.5 20c1.3-4.9 4.2-8.2 8.5-10" />
  </Svg>
);

export const Shield = (props) => (
  <Svg {...props}>
    <path d="M12 3.2 19 6v5.4c0 4.5-3 7.5-7 9.4-4-1.9-7-4.9-7-9.4V6l7-2.8Z" />
    <path d="m9 12 2.1 2.1L15.3 10" />
  </Svg>
);

export const Check = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Svg>
);

export const Mail = (props) => (
  <Svg {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 7 8.2 6 8.2-6" />
  </Svg>
);

export const Phone = (props) => (
  <Svg {...props}>
    <path d="M8 3.5 10.2 8 8.5 9.8c1 2.2 3.5 4.7 5.7 5.7l1.8-1.7 4.5 2.2c.3.2.4.5.3.8-.6 2.1-2.3 3.7-4.6 3.3-3.3-.6-6.7-3.2-8.9-5.4C5.1 12.5 2.5 9.1 1.9 5.8c-.3-2.3 1.3-4 3.4-4.6.3-.1.6 0 .8.3Z" />
  </Svg>
);

export const MapPin = (props) => (
  <Svg {...props}>
    <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.7" r="2.6" />
  </Svg>
);

export const Clock = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.4 2" />
  </Svg>
);

export const Zoom = (props) => (
  <Svg {...props}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="m15.5 15.5 4.3 4.3M8.5 10.8h4.6M10.8 8.5v4.6" />
  </Svg>
);

export const Filter = (props) => (
  <Svg {...props}>
    <path d="M3.5 6.5h17M6.5 12h11M10 17.5h4" />
  </Svg>
);

export const Lock = (props) => (
  <Svg {...props}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
  </Svg>
);

export const Instagram = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.9h.1" />
  </Svg>
);

export const Facebook = (props) => (
  <Svg {...props}>
    <path d="M14.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8.5v3h2.6v8" />
  </Svg>
);

export const Pinterest = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.3 20.3c.7-1.7 1.5-4.5 2-6.5m-.4-2.6c0-1.6 1-2.7 2.3-2.7 1.1 0 1.8.8 1.8 2 0 1.6-.9 3.3-2.1 3.3-1 0-1.5-.7-1.3-1.7" />
  </Svg>
);

export const Quote = (props) => (
  <Svg {...props}>
    <path d="M10 6.5C6.5 7.6 5 10.1 5 13.3c0 2.3 1.4 4.2 3.5 4.2 1.8 0 3.2-1.3 3.2-3.1 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.4-1.8 1.5-3 3.3-3.8L10 6.5Zm8.5 0c-3.5 1.1-5 3.6-5 6.8 0 2.3 1.4 4.2 3.5 4.2 1.8 0 3.2-1.3 3.2-3.1 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.4-1.8 1.5-3 3.3-3.8l-1.5-1.3Z" />
  </Svg>
);

export const CreditCard = (props) => (
  <Svg {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 9.5h18M6.5 14.5h3" />
  </Svg>
);

export const Rotate = (props) => (
  <Svg {...props}>
    <path d="M20 11a8 8 0 1 0-2.3 6.1M20 5.5V11h-5.5" />
  </Svg>
);
