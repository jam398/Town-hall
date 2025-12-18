# Web Analytics Evaluation Report

## Executive Summary

This document evaluates analytics solutions for Town Hall Newark, with a focus on GDPR compliance and privacy. After evaluation, **Plausible Analytics** is recommended as the primary solution.

---

## Analytics Options Evaluated

1. **Plausible Analytics** (Recommended)
2. **Google Analytics 4**
3. **Umami**

---

## Comparison Table

| Criteria | Plausible | Google Analytics 4 | Umami |
|----------|-----------|-------------------|-------|
| **GDPR Compliance** | ⭐⭐⭐⭐⭐ No cookies, no consent needed | ⭐⭐ Requires consent | ⭐⭐⭐⭐⭐ No cookies |
| **Cookie Requirements** | None | Multiple cookies | None |
| **Cost** | $9/month or self-host free | Free | Free (self-hosted) |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ Single script | ⭐⭐⭐ Complex setup | ⭐⭐⭐ Requires hosting |
| **Privacy Focus** | ⭐⭐⭐⭐⭐ Privacy-first | ⭐⭐ Data collection heavy | ⭐⭐⭐⭐⭐ Privacy-first |
| **Integration** | ⭐⭐⭐⭐⭐ Simple script tag | ⭐⭐⭐⭐ gtag.js | ⭐⭐⭐⭐ Script tag |
| **Data Ownership** | EU servers or self-host | Google servers | Self-hosted |
| **Consent Banner Needed** | No | Yes | No |

---

## Detailed Evaluation

### 1. Plausible Analytics (Recommended)

**Overview:** Plausible is a lightweight, privacy-focused analytics tool that doesn't use cookies and is GDPR compliant by default.

**Pros:**
- **No Cookies**: Doesn't set any cookies, no consent banner legally required
- **GDPR Compliant**: EU-based, privacy-first design
- **Lightweight**: <1KB script, no performance impact
- **Simple Dashboard**: Clean, easy-to-understand metrics
- **Open Source**: Can self-host for free
- **Goal Tracking**: Track form submissions as events

**Cons:**
- **Paid Service**: $9/month for hosted version
- **Less Detailed**: No user-level tracking (by design)
- **No Free Hosted Tier**: Must pay or self-host

**GDPR Compliance:**
- ✅ No cookies
- ✅ No personal data collection
- ✅ EU data processing
- ✅ No consent required
- ✅ Compliant without cookie banner

**Integration with Next.js:**
```html
<script defer data-domain="townhallnewark.org" src="https://plausible.io/js/script.js"></script>
```

**Event Tracking:**
```javascript
// Track form submission
plausible('Form Submission', { props: { form: 'volunteer' } });
```

### 2. Google Analytics 4

**Overview:** Google's latest analytics platform with machine learning insights and cross-platform tracking.

**Pros:**
- **Free**: No cost for standard usage
- **Powerful**: Advanced segmentation, funnels, attribution
- **Integration**: Works with Google Ads, Search Console
- **Real-time**: Live visitor data

**Cons:**
- **GDPR Issues**: Requires explicit consent
- **Cookie Heavy**: Sets multiple tracking cookies
- **Complex**: Steep learning curve
- **Data Sharing**: Data used by Google
- **Legal Risk**: Some EU countries have banned GA4

**GDPR Compliance:**
- ❌ Sets cookies (requires consent)
- ❌ Transfers data to US (legal uncertainty)
- ⚠️ Requires cookie consent banner
- ⚠️ Must implement consent mode

**Why Not Selected:**
- Requires cookie consent banner implementation
- Legal uncertainty in EU regarding data transfers
- Overkill for nonprofit community site
- Privacy concerns for community members

### 3. Umami

**Overview:** Open-source, self-hosted analytics focused on privacy and simplicity.

**Pros:**
- **Free**: Open source, no cost
- **No Cookies**: Privacy-friendly
- **Self-Hosted**: Full data ownership
- **Simple**: Clean interface
- **GDPR Compliant**: No personal data

**Cons:**
- **Requires Hosting**: Need server infrastructure
- **Maintenance**: Updates, security, backups
- **Setup Complexity**: Database + server needed

**GDPR Compliance:**
- ✅ No cookies
- ✅ No personal data
- ✅ Self-hosted = full control
- ✅ No consent required

**Why Not Selected as Primary:**
- Hosting adds operational complexity
- Maintenance burden for nonprofit
- Plausible offers same benefits without infrastructure

---

## Final Selection: Plausible Analytics

### Justification

Plausible Analytics is selected for Town Hall Newark because:

1. **GDPR Compliant by Default**: No cookies means no consent banner legally required for analytics

2. **Privacy-First**: Aligns with community values and builds trust

3. **Simple Implementation**: Single script tag, works with Next.js

4. **Lightweight**: <1KB, no performance impact

5. **Event Tracking**: Can track form submissions, registrations

6. **Reasonable Cost**: $9/month is sustainable for nonprofit

### Implementation Plan

#### 1. Add Plausible Script (Consent-Gated for Best Practice)

Even though Plausible doesn't require consent, we implement consent-gated loading as a best practice:

```tsx
// components/Analytics.tsx
'use client';

import Script from 'next/script';
import { useConsent } from '@/hooks/useConsent';

export function Analytics() {
  const { analyticsConsent } = useConsent();
  
  if (!analyticsConsent) return null;
  
  return (
    <Script
      defer
      data-domain="townhallnewark.org"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
```

#### 2. Track Key Events

```typescript
// Track form submissions
declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, string> }) => void;
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, props ? { props } : undefined);
  }
}

// Usage
trackEvent('Volunteer Signup', { interest: 'content-creation' });
trackEvent('Event Registration', { event: 'ai-workshop' });
trackEvent('Newsletter Subscribe');
```

#### 3. Key Metrics to Track

| Metric | Type | Purpose |
|--------|------|---------|
| Page Views | Automatic | Traffic analysis |
| Volunteer Signup | Event | Conversion tracking |
| Event Registration | Event | Engagement measurement |
| Contact Form Submit | Event | Lead generation |
| Newsletter Subscribe | Event | Community growth |

---

## Cookie Consent Banner

Even with Plausible (no cookies required), we implement a consent banner for:
1. **Transparency**: Users know what data is collected
2. **Best Practice**: Demonstrates privacy commitment
3. **Future-Proofing**: Ready if we add cookie-based features

### Banner Requirements

- Accept / Reject / Preferences options
- Link to Privacy Policy
- Remembers user preference (localStorage, not cookie)
- Analytics only loads after acceptance

---

## Conclusion

Plausible Analytics provides the optimal balance of insights and privacy for Town Hall Newark. Its cookie-free, GDPR-compliant approach aligns with community values while still providing actionable metrics for measuring impact.

---

*Document created: December 2024*
*Last updated: December 2024*
