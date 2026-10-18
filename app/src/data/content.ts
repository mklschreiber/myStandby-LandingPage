import type { FaqEntry, Feature, PlanRow, PricePlan, Screenshot, Step } from '@/types/content'

export { PLAY_STORE_URL, DEVELOPER_URL } from './site'

export const HOME_PATH = import.meta.env.BASE_URL
export const PRIVACY_PATH = `${import.meta.env.BASE_URL}privacy/`
export const IMPRINT_URL = 'https://michaelschreiber.net/impressum'
export const FEEDBACK_RELAY_HOST = 'feedback.mystandby.app'
export const PRIVACY_LAST_UPDATED = '19 October 2026'

export const controller = {
  name: 'Michael Schreiber',
  street: 'Grockelhofen 32',
  city: '89340 Leipheim',
  country: 'Germany',
  email: 'info@michaelschreiber.net',
}

export const features: Feature[] = [
  {
    id: 'any-widget',
    icon: 'widgets',
    title: 'Any widget, on standby',
    description:
      'Add any widget installed on your phone to the standby screen — calendars, to-do lists, weather, media players and more.',
  },
  {
    id: 'widget-stacks',
    icon: 'stack',
    title: 'Swipeable widget stacks',
    description:
      'Every slot holds a whole stack of widgets. Swipe through the pages and keep far more information at a glance.',
  },
  {
    id: 'standby-modes',
    icon: 'modes',
    title: 'Standby modes',
    description:
      'Create up to five standby screens — say, Day and Night — each with its own widgets, slots and look. The free version includes one mode.',
    pro: true,
  },
  {
    id: 'automatic-triggers',
    icon: 'trigger',
    title: 'Automatic mode switching',
    description:
      'Give a mode a start time and myStandby switches to it on its own — Day at 06:00, Night at 22:00.',
    pro: true,
  },
  {
    id: 'flexible-layout',
    icon: 'layout',
    title: 'Flexible layout',
    description:
      'Two widget slots out of the box. Go PRO to choose one, two or three slots for every mode.',
    pro: true,
  },
  {
    id: 'night-mode',
    icon: 'moon',
    title: 'Night mode',
    description:
      'Reduce blue light on the standby screen. Turn it on for the modes you use at night.',
    pro: true,
  },
  {
    id: 'flip-clock',
    icon: 'clock',
    title: 'Built-in flip clock',
    description:
      'A minimal flip clock widget made for standby, with 12-hour, 24-hour or system time format — also on your home screen.',
    pro: true,
  },
  {
    id: 'picture-frame',
    icon: 'photo',
    title: 'Picture frame',
    description:
      'Up to 20 of your own pictures as a polaroid stack, with a new picture every 5 seconds to 5 minutes. Your pictures stay on your phone.',
    pro: true,
  },
  {
    id: 'native-standby',
    icon: 'standby',
    title: 'Native standby integration',
    description:
      'myStandby plugs into the official Android screensaver, so it starts automatically while your phone charges. A setup assistant walks you through it.',
  },
  {
    id: 'simulate',
    icon: 'play',
    title: 'Simulate standby',
    description:
      'Preview a mode instantly with one tap — no need to plug in your phone while you design it.',
  },
  {
    id: 'alpha-channel',
    icon: 'contrast',
    title: 'Alpha channel mode',
    description:
      "Render a mode's widgets using only their alpha channel for a calm, monochrome look.",
  },
  {
    id: 'transparency',
    icon: 'brightness',
    title: 'Adjustable transparency',
    description:
      'Fade the widgets of each mode from 0 to 90 % with a simple slider — perfect for your nightstand.',
  },
  {
    id: 'interactive-widgets',
    icon: 'touch',
    title: 'Interactive widgets',
    description:
      'Allow touches for single widgets — tick off a to-do or skip a song right on the standby screen.',
  },
  {
    id: 'remember-state',
    icon: 'history',
    title: 'Picks up where you left off',
    description:
      'Optionally reopen every slot on the widget page you viewed last, every time standby starts.',
  },
  {
    id: 'widget-browser',
    icon: 'search',
    title: 'Widget browser with previews',
    description:
      'Widgets are grouped by app with previews and descriptions, so you find the right one in seconds.',
  },
  {
    id: 'manage-widgets',
    icon: 'edit',
    title: 'Manage with a long-press',
    description:
      'Long-press a widget to change its settings, allow interaction or remove it. Adding a new one is a single tap.',
  },
  {
    id: 'feedback',
    icon: 'feedback',
    title: 'Feedback built in',
    description:
      'Report a bug, request a feature or share your thoughts right from the app — myStandby keeps evolving with its users.',
  },
]

export const screenshots: Screenshot[] = [
  {
    id: 'standby',
    title: 'Your standby screen',
    description:
      'A calm, dimmed smart display with a flip clock and your photos while the phone charges.',
    alt: 'myStandby standby screen showing a dimmed flip clock at 21:29 above a polaroid stack with a photo of a cat',
  },
  {
    id: 'modes',
    title: 'Modes for day and night',
    description:
      'Keep several standby modes and let them switch automatically at the times you choose.',
    alt: 'Standby modes list in myStandby with the active mode Day, daily at 06:00, and the inactive mode Night, daily at 22:00',
  },
  {
    id: 'mode-editor',
    title: 'Design every mode',
    description:
      'Stack widgets in each slot, set alpha channel and transparency, and preview it with one tap.',
    alt: 'myStandby mode editor for the Day mode with a flip clock and a picture frame in two slots and the mode settings sheet',
  },
  {
    id: 'choose-widget',
    title: 'Pick any widget',
    description:
      "Choose from the widgets of all your apps — or from myStandby's own flip clock and picture frame.",
    alt: 'Choose widget screen in myStandby showing the PRO group myStandby widgets with the flip clock and picture frame',
  },
  {
    id: 'feedback',
    title: 'Feedback built in',
    description: 'Report a bug, request a feature or share an idea directly with the developer.',
    alt: 'Send feedback screen in myStandby with a mailbox illustration and the types Bug, Feature request and Feedback',
  },
]

export const steps: Step[] = [
  {
    title: 'Install myStandby',
    description: 'Get the app for free on Google Play. It runs on Android 10 and newer.',
  },
  {
    title: 'Set it as screensaver',
    description:
      'The setup assistant opens the system settings and helps you select myStandby as your screensaver.',
  },
  {
    title: 'Add your widgets',
    description: 'Open a standby mode, tap a slot and choose from every widget on your phone.',
  },
  {
    title: 'Charge and enjoy',
    description: 'Plug in your phone and your active standby mode appears automatically.',
  },
]

export const planRows: PlanRow[] = [
  { label: 'Any Android widget on standby', free: true, pro: true },
  { label: 'Swipeable widget stacks', free: true, pro: true },
  { label: 'Alpha channel & transparency', free: true, pro: true },
  { label: 'Interactive widgets', free: true, pro: true },
  { label: 'Simulate standby', free: true, pro: true },
  { label: 'Widget slots per mode', free: '2', pro: '1 – 3' },
  { label: 'Standby modes', free: '1', pro: '1 – 5' },
  { label: 'Automatic mode switching', free: false, pro: true },
  { label: 'Night mode', free: false, pro: true },
  { label: 'Flip clock & picture frame widgets', free: false, pro: true },
  { label: 'Supports the developer', free: false, pro: true },
]

export const pricePlans: PricePlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '€0.99',
    period: 'per month',
    note: '7-day free trial, cancel anytime',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '€7.99',
    period: 'per year',
    note: '7-day free trial, save 33%',
  },
  { id: 'lifetime', name: 'Lifetime', price: '€19.99', period: 'one-time', note: 'No subscription' },
]

export const PRICE_NOTE =
  'Prices in Germany incl. VAT. Google Play shows the price for your country.'

export const faq: FaqEntry[] = [
  {
    question: 'What is Android standby mode?',
    answer:
      'Android can show a screensaver while your phone is charging. myStandby is such a screensaver — one that displays the widgets you choose instead of a fixed clock.',
  },
  {
    question: 'Which devices are supported?',
    answer: 'myStandby runs on Android devices with Android 10 or newer.',
  },
  {
    question: 'What are standby modes?',
    answer:
      'A standby mode is a complete standby screen with its own widgets, slots, transparency and night mode. The active mode is shown while your phone charges. The free version includes one mode; with PRO you create up to five and let them switch automatically at set times.',
  },
  {
    question: 'Is myStandby free?',
    answer:
      'Yes. The app is free and contains no ads. PRO is optional: €0.99 per month or €7.99 per year, both with a 7-day free trial, or €19.99 once for lifetime access. Prices in Germany incl. VAT; Google Play shows the price for your country.',
  },
  {
    question: 'What happens to PRO if I reinstall the app?',
    answer:
      'Your PRO purchase or subscription is linked to your Google account and is restored automatically from Google Play.',
  },
  {
    question: 'What happens if my PRO subscription ends?',
    answer:
      'Nothing is deleted. Extra modes, slots and PRO widgets are locked and come back as soon as you unlock PRO again.',
  },
  {
    question: 'How do I start standby?',
    answer:
      'On first start, the setup assistant helps you select myStandby as your system screensaver. It then starts while charging, according to your system screensaver settings. Tap the play button in a mode to preview it at any time.',
  },
]
