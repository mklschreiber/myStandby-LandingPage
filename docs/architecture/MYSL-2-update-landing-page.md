---
type: Architecture Concept
title: MYSL-2 Update Landing Page (current features and screenshots)
description: Replaces the outdated screenshots with five new app screenshots (standby, modes, mode editor, widget picker, feedback) and updates features, Free/PRO table, PRO prices (€0.99/month, €7.99/year with 7-day trial, €19.99 lifetime), steps, FAQ, SEO description, JSON-LD screenshots and the privacy purchase paragraph to the myStandby app 1.30.0 (live on Google Play); no new libraries.
tags: [MYSL-2, story, data-modules, types, components, icons, screenshots, pricing, seo, privacy, tests]
timestamp: 2026-10-19T07:00:00+07:00
status: approved
---

## Story

As a user, I want the myStandby landing page (mystandby.app) to show the latest information —
the newest screenshots and the current features of the app — so that I see what myStandby can
do today.

Original issue text: "As user I want to have the latest information available on the landing
page. Therefore the outdated information of the landing page need to be updated with the newest
screenshots and features. Latest information about the features can be collected from the
documentation available in the myStandby application (Project directory)."

Jira: MYSL-2 — <https://mklschreiber.atlassian.net/browse/MYSL-2>

**Screenshots (source of truth for the images):** [docs/design/MYSL-2/README.md](../design/MYSL-2/README.md)
— five raw 1280 × 2856 PNGs of app version ~1.30.0, dark theme, English UI.

Builds on [landing-page](landing-page.md) (typed content, PixelPhone, pre-sized WebP) and
[MYSL-1](MYSL-1-seo-optimization.md) (SEO data module, JSON-LD, `SCREENSHOT_IDS`).

## Sources and Verification

Facts were taken from the Android project `/Users/schreiber/Projekte/myStandby` (read only),
**branch `main`** (head `a319d94`, version 1.30.0 in `app/build.gradle.kts`), via `git show main:…`:

| Fact | Source on `main` |
|---|---|
| Android 10+ | `app/build.gradle.kts` `minSdk = 29` |
| Free: 1 mode, PRO: up to 5 modes | `mode/ModeRules.kt` `FREE_MAX_MODES = 1`, `PRO_MAX_MODES = 5` |
| Free: exactly 2 slots, PRO: 1–3 | MYS-70 concept, `WidgetSlot.FREE_SLOT_COUNT = 2` |
| PRO benefits: slots, modes, myStandby widgets (flip clock, picture frame), night mode, triggers | `proad/ProBenefits.kt`, `strings.xml` `pro_ad_benefit_*` |
| Plans monthly / yearly (7-day free trial, one subscription) and lifetime (one-time, no trial) | MYS-67 concept, `strings.xml` `pro_ad_plan_*`, `pro_ad_fine_print_*` |
| Time trigger is the only trigger type ("Daily at …"), PRO; kept but ignored without PRO | MYS-68 concept, `strings.xml` `mode_trigger_type_time_*` |
| Night mode = per-mode PRO switch, "Reduces blue light on the standby screen." | MYS-71 concept, `strings.xml` `mode_settings_night_mode_*` |
| Transparency 0–90 % per mode replaced dimming; alpha channel per mode | MYS-61 concept, `strings.xml` `mode_settings_summary*` |
| Picture frame: up to 20 pictures, polaroid stack, interval 5 s – 5 min, stored app-private, home-screen widget PRO | MYS-50 concept, `PictureImportMath.MAX_PICTURES = 20`, `picture_frame_interval_*` |
| Flip clock 12 h / 24 h / system, also as home-screen widget (PRO) | `strings.xml` `flip_clock_*`, `launcher_flip_clock_description` |
| Interaction per widget, Free and PRO | MYS-69 concept Decision 13 |
| Setup assistant guides to select myStandby as screensaver on first start | MYS-54 concept |
| "Save last displayed widget state" and "Screensaver" still in Settings | `res/xml/settings.xml` |
| Long-press to edit/remove a widget | `strings.xml` `tooltip_widget_edit_hint_text` |
| Losing PRO deletes nothing (locks extra modes, slots, built-in widgets) | MYS-59 Decision 12, MYS-63/65, MYS-70 |
| Feedback types Bug / Feature request / Feedback | `strings.xml` `feedback_category_*` |
| No ads | no ads SDK in `gradle/libs.versions.toml` |

**Release state:** the user confirmed on 2026-10-19 that app 1.30.0 (`main`) is live on Google
Play.

**Prices:** €0.99 per month, €7.99 per year, €19.99 lifetime — confirmed by the user on
2026-10-19 and consistent with the MYS-67 story (0,99 € / 7,99 € / 19,99 €, 7-day trial on both
subscriptions, no trial for lifetime) and the paywall test fixtures on `main`
(`ProAdScreenTest`, `ProAdActivityTest`: `"0,99 €"`, `"7,99 €"`, `"19,99 €"`, trial 7 days,
yearly "Save 33 %"). The app itself reads prices from Google Play at runtime; the Play Console
values are not in the repository.

## Architecture Decisions

### Decision 1 — Content change, structure stays

All copy stays in `app/src/data/content.ts`, types in `app/src/types/content.ts`; no new
component, library or section. The `IconName` union grows and one type `PricePlan` is added for
the price list (Decision 4). **Why:** the landing-page concept already separates data from
rendering; the story is about content.

### Decision 2 — Screenshots: five new images, all old ones removed

Old screenshots, checked visually:

| Old id | Shows | Verdict |
|---|---|---|
| `standby` | old standby (text clock + to-do, alpha) | outdated → **replaced** by the new `standby` image (same id) |
| `home` | old main screen with delete buttons and "myStandby" app bar | outdated (mode list + mode editor replaced it) → **removed** |
| `settings` | old settings with Alpha channel and Dimming | outdated (alpha/transparency moved into the mode settings sheet, dimming is gone) → **removed** |
| `widget-apps` | old widget picker without title | outdated (picker has the "Choose widget" title now) → **removed** |
| `widget-previews` | old picker with expanded Calendar | outdated → **removed** (replaced by `choose-widget`) |

New gallery (this order, five items as before so the ≥1100 px layout stays unchanged):

| id | Source PNG | Output files |
|---|---|---|
| `standby` | `Standby-Mode.png` | `standby-480.webp`, `standby-960.webp` (overwrite) |
| `modes` | `Mode-Overview.png` | `modes-480.webp`, `modes-960.webp` |
| `mode-editor` | `Mode-Details.png` | `mode-editor-480.webp`, `mode-editor-960.webp` |
| `choose-widget` | `Choose-Widget.png` | `choose-widget-480.webp`, `choose-widget-960.webp` |
| `feedback` | `Feedback.png` | `feedback-480.webp`, `feedback-960.webp` |

Delete `home-*.webp`, `settings-*.webp`, `widget-apps-*.webp`, `widget-previews-*.webp`
(8 files). **Why keep the id `standby`:** it is the hero image and the first JSON-LD
screenshot; the name still fits. The PNG sources are not copied into `app/`.

**Conversion** (reproducible; widths and aspect ratio as the existing files:
480 × 1071 and 960 × 2142; verified in a trial run, 12–37 KB per file):

```sh
cd /Users/schreiber/Projekte/myStandby-LandingPage
SRC=docs/design/MYSL-2; OUT=app/public/screenshots
for pair in Standby-Mode:standby Mode-Overview:modes Mode-Details:mode-editor \
            Choose-Widget:choose-widget Feedback:feedback; do
  png=${pair%%:*}; id=${pair##*:}
  for w in 480 960; do
    cwebp -quiet -q 80 -m 6 -resize "$w" 0 "$SRC/$png.png" -o "$OUT/$id-$w.webp"
  done
done
rm "$OUT"/home-*.webp "$OUT"/settings-*.webp "$OUT"/widget-apps-*.webp "$OUT"/widget-previews-*.webp
```

`-resize W 0` keeps the aspect ratio. No cropping: the status bar stays visible as in the
real app; `PixelPhone` already uses the 1280 × 2856 ratio.

### Decision 3 — Device images in hero and PRO section

- **Hero:** front phone `standby` (unchanged), back phone `widget-previews` → **`mode-editor`**
  (shows the same flip clock and picture frame in the editor; pairs visually with the front).
- **PRO section:** hard-coded `screenshot="settings"` → **`choose-widget`** (shows the
  "myStandby widgets PRO" group). Take id and alt from the `screenshots` entry
  (`screenshots.find((shot) => shot.id === 'choose-widget')!`) instead of the hard-coded
  alt `"myStandby settings screen"`.

### Decision 4 — Pricing: three plans with prices (user decision 2026-10-19)

The page shows the three plans with their prices: **€0.99 per month** and **€7.99 per year**
(both with a 7-day free trial) and **€19.99 lifetime** (one-time). The previous claim
"one-time purchase … no subscription" is false since MYS-67 and is removed everywhere
(PRO section, FAQ, privacy policy).

- **Where:** (a) a typed price list `pricePlans` rendered as three small cards in the PRO
  section, between the intro paragraph and the Free/PRO table, followed by the price note;
  (b) FAQ "Is myStandby free?" repeats the prices in one sentence. **Not** in the Free/PRO
  table: it compares features, and a price row does not fit the 72 px value columns. Not in
  the hero (its facts stay "Free download · No ads · Android 10+"), not in feature cards.
- **Number format `€0.99`:** the page is English (`lang="en"`, `og:locale` `en_US`), and
  English (en-US/en-GB/en-IE) formatting puts the euro sign first with a decimal point, as
  Google Play does for English-language users. "0,99 €" is the German format used in the app's
  German paywall; mixing it into English copy would look like a typo. Format: `€` + amount with
  two decimals, no space (`€0.99`, `€7.99`, `€19.99`); periods are written out ("per month",
  "per year", "one-time").
- **Price note (exact):** "Prices in Germany incl. VAT. Google Play shows the price for your
  country." **Why:** the amounts are the German Play prices; Play sets local prices and taxes
  per country, so the page must not promise them elsewhere. The note is short and appears
  directly below the price list (and in the FAQ answer).
- **Savings:** the yearly card says "Save 33 %" (€7.99 vs. 12 × €0.99 = €11.88 → 32.7 %,
  rounded as the app's paywall does). Written as "Save 33%" (English, no space).
- **JSON-LD `offers` stays one `Offer` with `price: '0'`, `priceCurrency: 'EUR'`.** **Why:**
  `offers` on a `MobileApplication` describes the price of the app (the download is free);
  listing in-app purchases or subscriptions as offers would make search engines show the app as
  paid. Schema.org has no well-supported in-app-purchase property, and an app rich result is
  not a goal (MYSL-1 log). The meta description does not mention prices either (stays about
  features; "Free on Google Play" stays true).
- **Maintenance:** the prices live only in `content.ts` (`pricePlans`, `PRICE_NOTE`, FAQ 4).
  If the Play Console prices change, these three places change.

### Decision 5 — Privacy policy: purchase paragraph only

Section 7 of `PrivacyPolicy.vue` still says "a one-time purchase". It is changed to cover
subscriptions; nothing else in the policy changes (picture-frame pictures stay on the device
and are not transmitted, so no new processing). `PRIVACY_LAST_UPDATED` → `'19 October 2026'`. Text approved by the user on 2026-10-19. **Why in this story:** otherwise the page
contradicts itself; the change is factual, not a new legal basis.

### Decision 6 — Feature list order and PRO flags

Grouped: core widgets → modes & PRO → standby integration → look → handling → feedback.
PRO flag = the feature is unavailable or limited in the free version (same rule as the
existing `flexible-layout`).

## Affected Components

| File | Change |
|---|---|
| `app/public/screenshots/*.webp` | 10 new/overwritten files, 8 deleted (Decision 2) |
| `app/src/types/content.ts` | `IconName` += `'modes' \| 'trigger' \| 'contrast' \| 'photo' \| 'touch'`; new `PricePlan` |
| `app/src/components/icons/FeatureIcon.vue` | 5 new paths (Interfaces) |
| `app/src/data/content.ts` | `features`, `screenshots`, `steps`, `planRows`, `faq`, `PRIVACY_LAST_UPDATED`; new `pricePlans`, `PRICE_NOTE` |
| `app/src/components/HeroSection.vue` | back phone `mode-editor`; lead text |
| `app/src/components/ProSection.vue` | intro paragraph; price list + price note; device screenshot `choose-widget` from content |
| `app/src/components/PrivacyPolicy.vue` | section 7 paragraph |
| `app/src/data/seo.ts` | `SCREENSHOT_IDS`, `pages.home.description` |
| `app/src/__tests__/content.spec.ts` | feature ids, PRO ids, price plans |
| `app/src/__tests__/seo.spec.ts` | five screenshot URLs |

Unchanged: `App.vue`, `FeatureGrid.vue`, `ScreenshotGallery.vue`, `StepsSection.vue`,
`FaqSection.vue`, `PixelPhone.vue`, `vite-plugin-seo.ts`, `og-image.jpg`, h1, page title.
`PixelPhone.spec.ts` uses `'home'` only as a prop string (no file check) and may stay.

## Data Flow

Unchanged:

```
content.ts ──▶ FeatureGrid / ScreenshotGallery / StepsSection / ProSection / FaqSection
          └──▶ HeroSection, ProSection ──▶ PixelPhone (id ─▶ /screenshots/<id>-480|960.webp)
seo.ts (SCREENSHOT_IDS, pages.home.description) ──▶ vite-plugin-seo ──▶ meta + JSON-LD
```

## Interfaces

### `IconName` and `FeatureIcon.vue` paths

Same 24 × 24 stroke style as the existing icons. The developer may fine-tune coordinates for
visual balance, but keeps the names and meaning.

```ts
modes: ['M7 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M9 21h8a4 4 0 0 0 4-4V9', 'M9 7h6', 'M9 11h6'],
trigger: ['M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M12 9v4l2.5 1.5', 'M5 3 2 6', 'm22 6-3-3'],
contrast: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M12 7.5h7', 'M12 12h9', 'M12 16.5h7'],
photo: ['M4 5h16v14H4z', 'm4 16 5-5 4 4 2-2 5 5', 'M15 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z'],
touch: ['M9 11V5a2 2 0 0 1 4 0v6', 'M13 10a2 2 0 0 1 4 0v1', 'M17 11a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L4 14.5a2 2 0 0 1 3.2-2.4L9 14'],
```

### `features` (exact, in this order)

| id | icon | title | description | pro |
|---|---|---|---|---|
| `any-widget` | `widgets` | Any widget, on standby | Add any widget installed on your phone to the standby screen — calendars, to-do lists, weather, media players and more. | – |
| `widget-stacks` | `stack` | Swipeable widget stacks | Every slot holds a whole stack of widgets. Swipe through the pages and keep far more information at a glance. | – |
| `standby-modes` | `modes` | Standby modes | Create up to five standby screens — say, Day and Night — each with its own widgets, slots and look. The free version includes one mode. | true |
| `automatic-triggers` | `trigger` | Automatic mode switching | Give a mode a start time and myStandby switches to it on its own — Day at 06:00, Night at 22:00. | true |
| `flexible-layout` | `layout` | Flexible layout | Two widget slots out of the box. Go PRO to choose one, two or three slots for every mode. | true |
| `night-mode` | `moon` | Night mode | Reduce blue light on the standby screen. Turn it on for the modes you use at night. | true |
| `flip-clock` | `clock` | Built-in flip clock | A minimal flip clock widget made for standby, with 12-hour, 24-hour or system time format — also on your home screen. | true |
| `picture-frame` | `photo` | Picture frame | Up to 20 of your own pictures as a polaroid stack, with a new picture every 5 seconds to 5 minutes. Your pictures stay on your phone. | true |
| `native-standby` | `standby` | Native standby integration | myStandby plugs into the official Android screensaver, so it starts automatically while your phone charges. A setup assistant walks you through it. | – |
| `simulate` | `play` | Simulate standby | Preview a mode instantly with one tap — no need to plug in your phone while you design it. | – |
| `alpha-channel` | `contrast` | Alpha channel mode | Render a mode's widgets using only their alpha channel for a calm, monochrome look. | – |
| `transparency` | `brightness` | Adjustable transparency | Fade the widgets of each mode from 0 to 90 % with a simple slider — perfect for your nightstand. | – |
| `interactive-widgets` | `touch` | Interactive widgets | Allow touches for single widgets — tick off a to-do or skip a song right on the standby screen. | – |
| `remember-state` | `history` | Picks up where you left off | Optionally reopen every slot on the widget page you viewed last, every time standby starts. | – |
| `widget-browser` | `search` | Widget browser with previews | Widgets are grouped by app with previews and descriptions, so you find the right one in seconds. | – |
| `manage-widgets` | `edit` | Manage with a long-press | Long-press a widget to change its settings, allow interaction or remove it. Adding a new one is a single tap. | – |
| `feedback` | `feedback` | Feedback built in | Report a bug, request a feature or share your thoughts right from the app — myStandby keeps evolving with its users. | – |

Removed id: `dimming` (replaced by `transparency`; dimming no longer exists in the app).
`moon` moves from `alpha-channel` to `night-mode`.

### `screenshots` (exact, in this order)

| id | title | description | alt |
|---|---|---|---|
| `standby` | Your standby screen | A calm, dimmed smart display with a flip clock and your photos while the phone charges. | myStandby standby screen showing a dimmed flip clock at 21:29 above a polaroid stack with a photo of a cat |
| `modes` | Modes for day and night | Keep several standby modes and let them switch automatically at the times you choose. | Standby modes list in myStandby with the active mode Day, daily at 06:00, and the inactive mode Night, daily at 22:00 |
| `mode-editor` | Design every mode | Stack widgets in each slot, set alpha channel and transparency, and preview it with one tap. | myStandby mode editor for the Day mode with a flip clock and a picture frame in two slots and the mode settings sheet |
| `choose-widget` | Pick any widget | Choose from the widgets of all your apps — or from myStandby's own flip clock and picture frame. | Choose widget screen in myStandby showing the PRO group myStandby widgets with the flip clock and picture frame |
| `feedback` | Feedback built in | Report a bug, request a feature or share an idea directly with the developer. | Send feedback screen in myStandby with a mailbox illustration and the types Bug, Feature request and Feedback |

### `steps` (exact)

1. **Install myStandby** — Get the app for free on Google Play. It runs on Android 10 and newer.
2. **Set it as screensaver** — The setup assistant opens the system settings and helps you select myStandby as your screensaver.
3. **Add your widgets** — Open a standby mode, tap a slot and choose from every widget on your phone.
4. **Charge and enjoy** — Plug in your phone and your active standby mode appears automatically.

### `planRows` (exact)

| label | free | pro |
|---|---|---|
| Any Android widget on standby | `true` | `true` |
| Swipeable widget stacks | `true` | `true` |
| Alpha channel & transparency | `true` | `true` |
| Interactive widgets | `true` | `true` |
| Simulate standby | `true` | `true` |
| Widget slots per mode | `'2'` | `'1 – 3'` |
| Standby modes | `'1'` | `'1 – 5'` |
| Automatic mode switching | `false` | `true` |
| Night mode | `false` | `true` |
| Flip clock & picture frame widgets | `false` | `true` |
| Supports the developer | `false` | `true` |

### `ProSection.vue` intro paragraph (exact)

> All core features are free and without ads. Unlock PRO with a monthly or yearly subscription
> — both start with a 7-day free trial — or with a one-time lifetime purchase. PRO is restored
> automatically from Google Play when you reinstall.

Heading unchanged.

### `PricePlan`, `pricePlans`, `PRICE_NOTE` (exact)

```ts
// types/content.ts
export interface PricePlan {
  id: 'monthly' | 'yearly' | 'lifetime'
  name: string
  price: string
  period: string
  note: string
}

// data/content.ts
export const pricePlans: PricePlan[] = [
  { id: 'monthly', name: 'Monthly', price: '€0.99', period: 'per month', note: '7-day free trial, cancel anytime' },
  { id: 'yearly', name: 'Yearly', price: '€7.99', period: 'per year', note: '7-day free trial, save 33%' },
  { id: 'lifetime', name: 'Lifetime', price: '€19.99', period: 'one-time', note: 'No subscription' },
]

export const PRICE_NOTE = 'Prices in Germany incl. VAT. Google Play shows the price for your country.'
```

### `ProSection.vue` price list markup

Directly after the intro `<p>`, before the table:

```html
<ul class="pro__plans" aria-label="PRO plans">
  <li v-for="plan in pricePlans" :key="plan.id" class="pro__plan">
    <span class="pro__plan-name">{{ plan.name }}</span>
    <span class="pro__plan-price">{{ plan.price }}</span>
    <span class="pro__plan-period">{{ plan.period }}</span>
    <span class="pro__plan-note">{{ plan.note }}</span>
  </li>
</ul>
<p class="pro__price-note">{{ PRICE_NOTE }}</p>
```

Styles (scoped, existing tokens only): `.pro__plans` grid `repeat(3, minmax(0, 1fr))`, gap
12px, margin-top 28px, no list padding/style; below 520px one column. `.pro__plan` flex column,
gap 2px, padding 16px, `1px solid var(--color-border)`, `border-radius: var(--radius-md)`,
background `var(--color-surface)`, centered text. Name: 0.8125rem, 700, uppercase,
letter-spacing 0.08em, `--color-text-muted`. Price: 1.5rem, 800, `--color-text`. Period:
0.875rem, `--color-text-muted`. Note: 0.8125rem, `--color-text-subtle`, margin-top 6px.
`.pro__price-note`: margin-top 10px, 0.8125rem, `--color-text-subtle`. The table's margin-top
stays 32px.

### `HeroSection.vue` lead (exact)

> myStandby turns your phone into a smart display while it charges. Put any widget you love on
> the native standby screen and create standby modes for day and night that are uniquely yours.

h1, eyebrow and hero facts (Free download, No ads, Android 10+) unchanged.

### `faq` (exact, in this order)

1. **What is Android standby mode?** — unchanged.
2. **Which devices are supported?** — unchanged.
3. **What are standby modes?** (new) — A standby mode is a complete standby screen with its own widgets, slots, transparency and night mode. The active mode is shown while your phone charges. The free version includes one mode; with PRO you create up to five and let them switch automatically at set times.
4. **Is myStandby free?** — Yes. The app is free and contains no ads. PRO is optional: €0.99 per month or €7.99 per year, both with a 7-day free trial, or €19.99 once for lifetime access. Prices in Germany incl. VAT; Google Play shows the price for your country.
5. **What happens to PRO if I reinstall the app?** — Your PRO purchase or subscription is linked to your Google account and is restored automatically from Google Play.
6. **What happens if my PRO subscription ends?** (new) — Nothing is deleted. Extra modes, slots and PRO widgets are locked and come back as soon as you unlock PRO again.
7. **How do I start standby?** — On first start, the setup assistant helps you select myStandby as your system screensaver. It then starts while charging, according to your system screensaver settings. Tap the play button in a mode to preview it at any time.

### `seo.ts`

```ts
export const SCREENSHOT_IDS: readonly string[] = [
  'standby', 'modes', 'mode-editor', 'choose-widget', 'feedback',
]
// pages.home.description (153 characters, within 70–160):
'Turn your charging Android phone into a smart display: any widget on standby, modes for day and night, flip clock and picture frame. Free on Google Play.'
```

`pages.home.title`, `OG_IMAGE`, `operatingSystem: 'Android 10+'`, `offers` unchanged. The
noscript text and JSON-LD `description` follow automatically from `pages.home.description`.

### `PrivacyPolicy.vue` section 7, first sentences (exact replacement)

> The app is distributed through Google Play. The optional PRO upgrade is available as a
> one-time purchase or as a monthly or yearly subscription, processed entirely by Google Play
> Billing. Payment details are handled by Google; I only receive the information needed to
> unlock PRO (the purchase or subscription status and a purchase token), which lets Google
> restore PRO after a reinstall.

The rest of the paragraph (legal basis, in-app review, Google link) stays.

### Tests

- `content.spec.ts`: `'lists every app feature'` → the 17 ids above in order; `'marks only the
  PRO-gated features as PRO'` → `['standby-modes', 'automatic-triggers', 'flexible-layout',
  'night-mode', 'flip-clock', 'picture-frame']`. The existing file-existence test covers the
  new WebP files. New: `pricePlans` has the ids `monthly`, `yearly`, `lifetime` in this
  order with the prices `€0.99`, `€7.99`, `€19.99`.
- `seo.spec.ts`: `'lists absolute URLs of the five 960 px screenshots'` → `standby`, `modes`,
  `mode-editor`, `choose-widget`, `feedback`.
- Recommended for the Tester: a test that `ProSection` renders the `choose-widget` screenshot,
  three `.pro__plan` items and `PRICE_NOTE`, and that `HeroSection` uses `standby` and
  `mode-editor` (ids exist in `screenshots`).
- Manual browser check: icons render legibly; gallery, hero and PRO images load.

## Open Questions

None. Answered by the user on 2026-10-19:

1. ~~Release state~~ — app 1.30.0 is live on Google Play; `main` counts as shipped.
2. ~~Prices on the page~~ — show €0.99/month, €7.99/year (7-day trial) and €19.99 lifetime
   (Decision 4).
3. ~~Privacy policy~~ — section 7 text approved; `PRIVACY_LAST_UPDATED = '19 October 2026'`.
