<script setup lang="ts">
import { controller, FEEDBACK_RELAY_HOST, PRIVACY_LAST_UPDATED } from '@/data/content'

const sections = [
  { id: 'controller', title: 'Controller' },
  { id: 'website', title: 'This website' },
  { id: 'app', title: 'The myStandby app' },
  { id: 'crashlytics', title: 'Firebase Crashlytics' },
  { id: 'analytics', title: 'Google Analytics for Firebase' },
  { id: 'feedback', title: 'In-app feedback (Cloudflare & Jira)' },
  { id: 'purchases', title: 'Google Play & in-app purchases' },
  { id: 'transfers', title: 'Transfers outside the EU' },
  { id: 'rights', title: 'Your rights' },
  { id: 'changes', title: 'Children & changes' },
]
</script>

<template>
  <article class="privacy container">
    <header class="privacy__header">
      <span class="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p class="privacy__lead">
        This policy explains which personal data is processed when you visit this website and when
        you use the myStandby app for Android, why it is processed, and which rights you have under
        the EU General Data Protection Regulation (GDPR).
      </p>
      <p class="privacy__updated">Last updated: {{ PRIVACY_LAST_UPDATED }}</p>
    </header>

    <nav class="privacy__toc" aria-label="Contents">
      <ol>
        <li v-for="section in sections" :key="section.id">
          <a :href="`#${section.id}`">{{ section.title }}</a>
        </li>
      </ol>
    </nav>

    <section id="controller">
      <h2>1. Controller</h2>
      <p>The controller responsible for data processing on this website and in the app is:</p>
      <address>
        {{ controller.name }}<br />
        {{ controller.street }}<br />
        {{ controller.city }}<br />
        {{ controller.country }}<br />
        Email: <a :href="`mailto:${controller.email}`">{{ controller.email }}</a>
      </address>
      <p>
        You can contact me at this address with any question about data protection or to exercise
        your rights.
      </p>
    </section>

    <section id="website">
      <h2>2. This website</h2>
      <h3>Hosting on GitHub Pages</h3>
      <p>
        This website is hosted by GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr.
        Street, San Francisco, CA 94107, USA. When you open the website, GitHub processes your IP
        address and technical request data (such as date and time, requested page, browser and
        operating system) in server log files to deliver the site and to keep it secure. The legal
        basis is Art. 6(1)(f) GDPR; my legitimate interest is a reliable and secure website. See
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's privacy statement</a>.
      </p>
      <h3>No cookies, no tracking</h3>
      <p>
        The website itself sets no cookies, uses no analytics or tracking tools and loads no
        external fonts or scripts. Links to Google Play and other sites only transfer data to
        those providers when you click them.
      </p>
    </section>

    <section id="app">
      <h2>3. The myStandby app</h2>
      <h3>Data that stays on your device</h3>
      <p>
        Your widget layout, the selected widgets and all app settings are stored only on your
        device. To show you which widgets are available, the app reads the list of installed apps
        and their widgets locally; this list is never sent to me or to anyone else. Review
        reminders are local notifications created on your device.
      </p>
      <p>
        myStandby contains no advertising and does not require an account. Data only leaves your
        device for the purposes described in sections 4 to 7.
      </p>
    </section>

    <section id="crashlytics">
      <h2>4. Firebase Crashlytics</h2>
      <p>
        To find and fix errors, the app uses Firebase Crashlytics, a service of Google Ireland
        Limited, Gordon House, Barrow Street, Dublin 4, Ireland, and Google LLC, 1600
        Amphitheatre Parkway, Mountain View, CA 94043, USA ("Google").
      </p>
      <p>
        If the app crashes or a handled error is recorded, a crash report is sent to Google. It
        contains the error details (stack trace), the app version, the Android version, the device
        manufacturer and model, the time of the error and a random Crashlytics installation
        identifier. It does not contain your name, email address or the content of your widgets.
        Crash reports are deleted automatically after 90 days.
      </p>
      <p>
        The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is a stable, error-free app.
        More information:
        <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Privacy and security in Firebase</a>.
      </p>
    </section>

    <section id="analytics">
      <h2>5. Google Analytics for Firebase</h2>
      <p>
        To understand how the app is used and which devices and Android versions it has to
        support, the app uses Google Analytics for Firebase, also provided by Google (see section
        4). The app only uses the automatically collected events; it sends no custom events and no
        widget content.
      </p>
      <p>
        Google Analytics processes usage information such as app opens, screen views, session
        length, first launch and app updates, together with the app instance ID, device model,
        Android version, language, app version and an approximate location (country or region)
        derived from your IP address. Depending on your device settings, the Android advertising
        ID can also be processed. Google provides me only with aggregated statistics; I cannot
        identify you personally from them. Event data is deleted automatically after the retention
        period configured in Google Analytics.
      </p>
      <p>
        The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is improving the app and
        prioritising development. You can reset or delete your advertising ID in the Android
        settings under <em>Privacy → Ads</em>.
      </p>
    </section>

    <section id="feedback">
      <h2>6. In-app feedback (Cloudflare &amp; Jira)</h2>
      <p>
        You can send a bug report, feature request or general feedback from the app's menu. This is
        entirely voluntary. When you tap <em>Send</em>, the following data is transmitted:
      </p>
      <ul>
        <li>the feedback type and your message;</li>
        <li>your email address, only if you enter one because you would like a reply;</li>
        <li>
          diagnostic data: app version, Android version and API level, device manufacturer and
          model.
        </li>
      </ul>
      <h3>Relay server on Cloudflare</h3>
      <p>
        The data is sent encrypted (HTTPS) to my relay server at
        <code>{{ FEEDBACK_RELAY_HOST }}</code>, which runs on Cloudflare Workers, a service of
        Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA. The relay checks the
        request and forwards it to Jira; it does not store the feedback. Your IP address is needed
        to deliver the request and is used only briefly as a key to limit the number of
        submissions; it is not logged or stored by the relay. The relay's own logs contain no
        message, email address or IP address and are deleted after 3 days. As a network provider,
        Cloudflare processes connection data under its own
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>.
      </p>
      <h3>Storage in Jira</h3>
      <p>
        The relay creates a ticket in my Jira Cloud project, a service of Atlassian Pty Ltd, Level
        6, 341 George Street, Sydney, NSW 2000, Australia, and its affiliate Atlassian US, Inc.,
        USA. The ticket contains the data listed above. I keep it until the issue is resolved and
        any reply has been sent, and delete it on request. See
        <a href="https://www.atlassian.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Atlassian's privacy policy</a>.
      </p>
      <h3>Older app versions</h3>
      <p>
        App versions 1.14.2 and earlier send feedback through Formspree (Formspree, Inc., USA),
        which forwards it to me by email. Please update the app to use the current feedback path.
      </p>
      <p>
        The legal basis is Art. 6(1)(f) GDPR (processing your feedback and improving the app)
        and, if you enter your email address, Art. 6(1)(a) GDPR (your consent to be contacted). You
        can withdraw this consent at any time by email.
      </p>
    </section>

    <section id="purchases">
      <h2>7. Google Play &amp; in-app purchases</h2>
      <p>
        The app is distributed through Google Play. The optional PRO upgrade is a one-time purchase
        processed entirely by Google Play Billing. Payment details are handled by Google; I only
        receive the information needed to unlock PRO (the purchase status and a purchase token),
        which lets Google restore PRO after a reinstall. The legal basis is Art. 6(1)(b) GDPR
        (performance of the purchase contract). When you rate the app, the in-app review dialog is
        provided by Google Play. Google processes this data under the
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
      </p>
    </section>

    <section id="transfers">
      <h2>8. Transfers outside the EU</h2>
      <p>
        Google, Cloudflare, Atlassian and GitHub may process data in the USA and other countries
        outside the European Union. These transfers are based on the EU–U.S. Data Privacy
        Framework, where the provider is certified, and on the EU Standard Contractual Clauses
        that the providers include in their data processing terms (Art. 45 and Art. 46 GDPR).
      </p>
    </section>

    <section id="rights">
      <h2>9. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the personal data concerning you (Art. 15);</li>
        <li>have inaccurate data rectified (Art. 16);</li>
        <li>have your data erased (Art. 17);</li>
        <li>restrict processing (Art. 18);</li>
        <li>data portability (Art. 20);</li>
        <li>
          object to processing based on legitimate interests, on grounds relating to your
          particular situation (Art. 21);
        </li>
        <li>withdraw any consent you have given, with effect for the future (Art. 7(3)).</li>
      </ul>
      <p>
        To exercise these rights, email
        <a :href="`mailto:${controller.email}`">{{ controller.email }}</a>. You also have the right
        to lodge a complaint with a supervisory authority, for example the Bavarian State Office
        for Data Protection Supervision (BayLDA), Promenade 18, 91522 Ansbach, Germany.
      </p>
    </section>

    <section id="changes">
      <h2>10. Children &amp; changes to this policy</h2>
      <p>
        myStandby is suitable for all ages, but I do not knowingly collect personal data from
        children. I update this policy when the app or this website changes; the current version
        is always available on this page.
      </p>
    </section>
  </article>
</template>

<style scoped>
.privacy {
  max-width: 820px;
  padding-block: clamp(48px, 8vw, 96px) var(--section-space);
}

.privacy__header h1 {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  font-weight: 800;
}

.privacy__lead {
  margin-top: 20px;
  color: var(--color-text-muted);
  font-size: 1.125rem;
}

.privacy__updated {
  margin-top: 12px;
  color: var(--color-text-subtle);
  font-size: 0.9375rem;
}

.privacy__toc {
  margin-block: 40px 8px;
  padding: 24px 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.privacy__toc ol {
  columns: 2 240px;
  margin: 0;
  padding-left: 20px;
}

.privacy__toc li {
  padding-block: 3px;
  break-inside: avoid;
}

.privacy__toc a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.privacy__toc a:hover {
  color: var(--color-text);
}

.privacy section {
  padding-top: 48px;
}

.privacy h2 {
  font-size: clamp(1.5rem, 3vw, 1.875rem);
}

.privacy h3 {
  margin-top: 28px;
  font-size: 1.1875rem;
}

.privacy p,
.privacy ul,
.privacy address {
  margin-top: 14px;
  color: var(--color-text-muted);
}

.privacy address {
  font-style: normal;
  line-height: 1.7;
}

.privacy ul {
  padding-left: 22px;
}

.privacy li + li {
  margin-top: 6px;
}

.privacy a {
  color: var(--color-brand-light);
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.privacy code {
  padding: 2px 6px;
  border-radius: 6px;
  background: var(--color-surface-hover);
  font-size: 0.9em;
  overflow-wrap: anywhere;
}
</style>
