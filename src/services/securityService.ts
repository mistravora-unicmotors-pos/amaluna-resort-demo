// =============================================================================
// Security Service — Input sanitization, rate limiting, and bot protection
// =============================================================================

// ---------------------------------------------------------------------------
// Input Sanitization
// ---------------------------------------------------------------------------

/**
 * Sanitize user input by removing potentially dangerous characters
 * Prevents XSS attacks when displaying user content
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
}

/**
 * Sanitize HTML by escaping special characters
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';

  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return '';
  }

  return sanitized;
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';

  // Allow only digits, spaces, dashes, parentheses, and plus sign
  return phone.replace(/[^\d\s\-()+ ]/g, '').trim();
}

// ---------------------------------------------------------------------------
// Rate Limiting (Client-side)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {
  booking: { maxAttempts: 5, windowMs: 60000 }, // 5 attempts per minute
  contact: { maxAttempts: 3, windowMs: 60000 }, // 3 attempts per minute
  enquiry: { maxAttempts: 5, windowMs: 120000 }, // 5 attempts per 2 minutes
  login: { maxAttempts: 5, windowMs: 300000 }, // 5 attempts per 5 minutes
};

type RateLimitAction = keyof typeof RATE_LIMIT_CONFIG;

/**
 * Check if an action is rate limited
 * @returns true if action is allowed, false if rate limited
 */
export function checkRateLimit(action: RateLimitAction): boolean {
  const config = RATE_LIMIT_CONFIG[action];
  const now = Date.now();
  const key = action;

  const entry = rateLimitStore.get(key);

  if (!entry) {
    rateLimitStore.set(key, { count: 1, firstAttempt: now });
    return true;
  }

  // Check if window has expired
  if (now - entry.firstAttempt > config.windowMs) {
    rateLimitStore.set(key, { count: 1, firstAttempt: now });
    return true;
  }

  // Check if limit exceeded
  if (entry.count >= config.maxAttempts) {
    return false;
  }

  // Increment count
  entry.count++;
  return true;
}

/**
 * Get remaining attempts for an action
 */
export function getRemainingAttempts(action: RateLimitAction): number {
  const config = RATE_LIMIT_CONFIG[action];
  const entry = rateLimitStore.get(action);

  if (!entry) return config.maxAttempts;

  const now = Date.now();
  if (now - entry.firstAttempt > config.windowMs) {
    return config.maxAttempts;
  }

  return Math.max(0, config.maxAttempts - entry.count);
}

/**
 * Reset rate limit for an action (use after successful completion)
 */
export function resetRateLimit(action: RateLimitAction): void {
  rateLimitStore.delete(action);
}

// ---------------------------------------------------------------------------
// Bot Protection
// ---------------------------------------------------------------------------

/**
 * Check if honeypot field was filled (indicates bot)
 * @returns true if likely a bot
 */
export function isHoneypotTriggered(honeypotValue: string): boolean {
  return honeypotValue !== undefined && honeypotValue.trim().length > 0;
}

/**
 * Check submission timing (too fast indicates bot)
 * @param formLoadTime - timestamp when form was loaded
 * @param minSeconds - minimum seconds expected for human
 * @returns true if likely a bot
 */
export function isTooFastSubmission(formLoadTime: number, minSeconds: number = 3): boolean {
  const elapsed = (Date.now() - formLoadTime) / 1000;
  return elapsed < minSeconds;
}

// ---------------------------------------------------------------------------
// CSRF Token Generation (for future backend integration)
// ---------------------------------------------------------------------------

/**
 * Generate a simple CSRF token (demo purposes)
 * In production, this should come from the server
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Store CSRF token in session
 */
export function storeCsrfToken(token: string): void {
  try {
    sessionStorage.setItem('csrf_token', token);
  } catch {
    // sessionStorage not available
  }
}

/**
 * Get stored CSRF token
 */
export function getCsrfToken(): string | null {
  try {
    return sessionStorage.getItem('csrf_token');
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Content Security Helpers
// ---------------------------------------------------------------------------

/**
 * Validate URL is safe (no javascript:, data:, etc.)
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  const trimmed = url.trim().toLowerCase();
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];

  return !dangerousProtocols.some(protocol => trimmed.startsWith(protocol));
}

/**
 * Validate URL pattern for external links
 */
export function isValidExternalUrl(url: string): boolean {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
