'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'townhall_cookie_consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setIsVisible(true);
    } else {
      const parsed = JSON.parse(stored) as ConsentPreferences;
      setPreferences(parsed);
      if (parsed.analytics) {
        loadAnalytics();
      }
    }
  }, []);

  const loadAnalytics = () => {
    if (typeof window !== 'undefined' && !document.getElementById('plausible-script')) {
      const script = document.createElement('script');
      script.id = 'plausible-script';
      script.defer = true;
      script.dataset.domain = 'townhallnewark.org';
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);
    
    if (prefs.analytics) {
      loadAnalytics();
    }
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-swiss-white border-t-4 border-swiss-red shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-swiss mx-auto px-6 py-6">
        {!showPreferences ? (
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 id="cookie-consent-title" className="text-h4 font-bold text-swiss-black mb-2">
                We value your privacy
              </h2>
              <p id="cookie-consent-description" className="text-body text-swiss-gray">
                We use cookies to enhance your browsing experience and analyze site traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                <Link href="/privacy" className="text-swiss-red hover:underline">
                  Read our Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-6 py-3 text-swiss-black border-2 border-swiss-black hover:bg-swiss-lightgray transition-colors font-medium"
              >
                Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-6 py-3 text-swiss-black border-2 border-swiss-black hover:bg-swiss-lightgray transition-colors font-medium"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-3 bg-swiss-red text-white hover:bg-red-700 transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-h4 font-bold text-swiss-black mb-4">
              Cookie Preferences
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-swiss-lightgray">
                <div>
                  <h3 className="font-bold text-swiss-black">Necessary Cookies</h3>
                  <p className="text-sm text-swiss-gray">Required for the website to function. Cannot be disabled.</p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5"
                  aria-label="Necessary cookies (always enabled)"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-swiss-lightgray">
                <div>
                  <h3 className="font-bold text-swiss-black">Analytics Cookies</h3>
                  <p className="text-sm text-swiss-gray">Help us understand how visitors interact with our website.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 accent-swiss-red"
                  aria-label="Analytics cookies"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-swiss-lightgray">
                <div>
                  <h3 className="font-bold text-swiss-black">Marketing Cookies</h3>
                  <p className="text-sm text-swiss-gray">Used to deliver personalized content and ads.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5 accent-swiss-red"
                  aria-label="Marketing cookies"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-6 py-3 text-swiss-black border-2 border-swiss-black hover:bg-swiss-lightgray transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-3 bg-swiss-red text-white hover:bg-red-700 transition-colors font-medium"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
