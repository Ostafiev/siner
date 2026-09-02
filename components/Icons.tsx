/* Иконки макета одним файлом. Все — stroke-based, наследуют currentColor. */

type P = { className?: string };

export const HeartIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 22 20" fill="none" aria-hidden="true">
    <path
      d="M11 18.2 3.3 10.7A4.6 4.6 0 0 1 11 5.4a4.6 4.6 0 0 1 7.7 5.3L11 18.2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const CartIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 22" fill="none" aria-hidden="true">
    <path
      d="M1 1.6h3.1l2.6 11.7h11l2.6-8.3H6"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.6" cy="18.6" r="1.7" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="17.4" cy="18.6" r="1.7" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const UserIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 21" fill="none" aria-hidden="true">
    <circle cx="10" cy="6.4" r="4.1" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M2 19.6c0-3.7 3.6-6.1 8-6.1s8 2.4 8 6.1"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export const ChevronIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path
      d="m1.5 1.8 4.5 4.4 4.5-4.4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WhatsappIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M8.9 19.4 9.8 16a5.6 5.6 0 1 1 2.1 2.1l-3 1.3Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path
      d="M12 12c.3 1.2 1.4 2.4 2.7 2.8l.7-.8 1.4.6-.3 1.1c-1.3.3-2.9-.4-4-1.5-1-1.1-1.7-2.6-1.4-3.9l1.1-.3.6 1.4-.8.6Z"
      fill="currentColor"
    />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="26" height="26" rx="8" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="14" cy="14" r="5.4" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="20.6" cy="7.6" r="1.2" fill="currentColor" />
  </svg>
);

export const TelegramIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="m7.6 14.2 12.2-4.8-2.1 11-3.6-2.9-2 2v-3.2l5-4.7-6.3 3.8-3.2-1.2Z"
      fill="currentColor"
    />
  </svg>
);

export const YoutubeIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="26" height="18" rx="5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M11.8 10.2 17.4 14l-5.6 3.8v-7.6Z" fill="currentColor" />
  </svg>
);

export const socialIcons: Record<string, (p: P) => React.ReactElement> = {
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  youtube: YoutubeIcon,
};
