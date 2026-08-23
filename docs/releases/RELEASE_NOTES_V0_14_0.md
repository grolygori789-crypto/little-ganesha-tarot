# Release Notes — V0.14.0

## Legal & IP Suite

V0.14.0 adds the product’s first complete legal and privacy layer.

### New

- Premium **Legal Center** in Settings.
- Copyright & Intellectual Property Notice.
- Terms of Use.
- Privacy Policy.
- Third-Party Notices.
- Native-quality EN / TH / HI legal UI and legal text.
- Root proprietary `LICENSE.md`.
- Versioned legal text (`1.0.0`).
- One-time local Terms acknowledgement at the title-screen Begin action, with direct access to Terms and Privacy before acceptance.

### Screenshot policy

V0.14.0 deliberately **does not add screenshot blocking**.

Little Ganesha already provides intentional Save/Share outputs, and the current PWA cannot guarantee native secure-window behavior across Android/iOS/browser environments. Instead, the legal terms explicitly allow ordinary personal, non-commercial screenshots and sharing of the user’s own reading while prohibiting unauthorised commercial redistribution, clean-asset distribution, scraping, bulk extraction and competing copies to the extent permitted by law.

No screenshot detector, blur-on-capture, watermark trap or CSS “protection” hack is introduced.

### Privacy clarity

The Privacy Policy documents the current local-first architecture, including optional local profile data, local reading state, Ask semantic persistence, Journal IndexedDB, exact Ask-question opt-in, Save/Share handoff, PromptPay boundaries, ordinary hosting/font requests, deletion controls and local data-loss limitations.

### Protected systems

Reading Engine, Deck Ritual, all reading modes, Lucky Numbers, Tarot Library, Journal, Reading Hub, PromptPay, audio lifecycle, Save/Share and card viewers remain functionally unchanged.

### Deployment risk

Functional risk: **LOW–MEDIUM**  
Operational risk: **HIGH** due to PWA Service Worker/cache build movement.  
Rollback: `f21e6a4c81812276d661d6ebb0a3e6c86c6cf48b`.
