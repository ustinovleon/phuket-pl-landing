// Format number with thousand separators
export function formatNumber(num: number, locale = 'pl-PL'): string {
  return new Intl.NumberFormat(locale).format(num);
}

// FX rate (reference): 1 THB = 0.0275 EUR (01.01.2026)
export const THB_TO_EUR_RATE = 0.0275;

export function thbToEur(thbAmount: number): number {
  return thbAmount * THB_TO_EUR_RATE;
}

// Format EUR with space thousands separator (Polish format: €XX XXX / €X,X mln)
export function formatEUR(amount: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 0;

  // Compact million format
  if (Math.abs(amount) >= 1_000_000) {
    const millions = amount / 1_000_000;
    const rounded = Math.round(millions * 10) / 10;
    return `€${rounded.toFixed(1).replace('.', ',')} mln`;
  }

  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

// Convert THB->EUR and format.
// - mode 'price': use "nice" rounding and the explicit mapping from the brief
// - mode 'fee': preserve detail for small amounts
export function formatEURFromTHB(thbAmount: number, mode: 'price' | 'fee' = 'price'): string {
  const mapping: Record<number, number> = {
    1_000_000: 27_500,
    3_000_000: 85_000,
    5_000_000: 139_000,
    7_000_000: 195_000,
    10_000_000: 275_000,
    15_000_000: 415_000,
    20_000_000: 550_000,
  };

  const mapped = mapping[thbAmount];
  if (typeof mapped === 'number') return formatEUR(mapped);

  const eur = thbToEur(thbAmount);

  if (mode === 'fee') {
    // Fees are often small - keep one decimal below €100
    const decimals = Math.abs(eur) < 100 ? 1 : 0;
    return formatEUR(eur, { decimals });
  }

  // Prices: round to "nice" thousands
  const rounded = eur >= 100_000 ? Math.round(eur / 1_000) * 1_000 : Math.round(eur / 500) * 500;
  return formatEUR(rounded);
}

// Format currency
export function formatCurrency(amount: number, currency: 'EUR' | 'THB' = 'EUR'): string {
  if (currency === 'EUR') {
    return formatEUR(amount);
  }
  return `${formatNumber(amount)} THB`;
}

// Format percentage
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}

// Format date
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pl-PL', options || {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Format completion date (Polish)
export function formatCompletion(completion: string | null): string {
  if (!completion) return 'Dostępne od zaraz';
  const [year, month] = completion.split('-');
  const months = [
    'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
    'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// Validate email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (international format)
export function isValidPhone(phone: string): boolean {
  // Allow various formats with country code
  return /^[+]?[\d\s-()]{8,20}$/.test(phone);
}

// Scroll to element
export function scrollToElement(elementId: string, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// WhatsApp link generator
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

// Category badge styling
export function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case 'READY':
      return 'badge-ready';
    case '2026':
      return 'badge-2026';
    case '2027':
      return 'badge-2027';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

// Category label (Polish)
export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'READY':
      return 'Dostępne od zaraz';
    case '2026':
      return 'Oddanie 2026';
    case '2027':
      return 'Oddanie 2027';
    default:
      return category;
  }
}
