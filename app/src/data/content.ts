import type { FaqEntry, Feature, PlanRow, Screenshot, Step } from '@/types/content'

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.software_lab.mystandby'
export const HOME_PATH = import.meta.env.BASE_URL
export const PRIVACY_PATH = `${import.meta.env.BASE_URL}privacy/`
export const IMPRINT_URL = 'https://michaelschreiber.net/impressum'
export const DEVELOPER_URL = 'https://michaelschreiber.net'
export const FEEDBACK_RELAY_HOST = 'feedback-mystandby.michaelschreiber.net'
export const PRIVACY_LAST_UPDATED = '4 October 2026'

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
    id: 'flexible-layout',
    icon: 'layout',
    title: 'Flexible layout',
    description:
      'Two widget slots out of the box. Go PRO to choose one, two or three slots and fit the screen to your needs.',
    pro: true,
  },
  {
    id: 'native-standby',
    icon: 'standby',
    title: 'Native standby integration',
    description:
      'myStandby plugs into the official Android screensaver, so it starts automatically while your phone charges.',
  },
  {
    id: 'simulate',
    icon: 'play',
    title: 'Simulate standby',
    description:
      'Preview your standby screen instantly with one tap — no need to plug in your phone while you design it.',
  },
  {
    id: 'alpha-channel',
    icon: 'moon',
    title: 'Alpha channel mode',
    description:
      'Render all widgets using only their alpha channel for a calm, monochrome look that is easy on the eyes at night.',
  },
  {
    id: 'dimming',
    icon: 'brightness',
    title: 'Adjustable dimming',
    description:
      'Dim the screensaver exactly as much as you like with a simple slider — perfect for your nightstand.',
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
      'Long-press a widget to change its settings or remove it. Adding a new one is a single tap.',
  },
  {
    id: 'flip-clock',
    icon: 'clock',
    title: 'Built-in flip clock',
    description:
      'A minimal flip clock widget made for standby, with 12-hour, 24-hour or system time format.',
    pro: true,
  },
  {
    id: 'feedback',
    icon: 'feedback',
    title: 'Feedback built in',
    description:
      'Report a bug or request a feature right from the app — myStandby keeps evolving with its users.',
  },
]

export const screenshots: Screenshot[] = [
  {
    id: 'standby',
    title: 'Your standby screen',
    description: 'A calm, dimmed smart display with clock, date and your to-dos while the phone charges.',
    alt: 'myStandby standby screen showing the date, a large clock and a to-do list widget in alpha channel mode',
  },
  {
    id: 'home',
    title: 'Design your slots',
    description: 'Stack widgets in each slot and swipe between them. Delete or add widgets in a tap.',
    alt: 'myStandby main screen with two widget slots containing a clock and a to-do list',
  },
  {
    id: 'widget-apps',
    title: 'Pick any app',
    description: 'All apps that offer widgets in one tidy list — from calendar to shopping and recipes.',
    alt: 'Widget picker in myStandby listing apps such as Amazon Shopping, Audible, Calendar, Calm and Chrome',
  },
  {
    id: 'widget-previews',
    title: 'Preview every widget',
    description: 'Expand an app to see live previews and descriptions of each of its widgets.',
    alt: 'Expanded Calendar entry in the widget picker showing previews of the schedule and month view widgets',
  },
  {
    id: 'settings',
    title: 'Fine-tune the look',
    description: 'Alpha channel, dimming and state restore — plus a shortcut to the system screensaver.',
    alt: 'myStandby settings with alpha channel, dimming slider, save last widget state and screensaver options',
  },
]

export const steps: Step[] = [
  {
    title: 'Install myStandby',
    description: 'Get the app for free on Google Play. It runs on Android 10 and newer.',
  },
  {
    title: 'Add your widgets',
    description: 'Tap the add button in a slot and choose from every widget on your phone.',
  },
  {
    title: 'Set it as screensaver',
    description: 'Open Settings → Screensaver and select myStandby as your system screensaver.',
  },
  {
    title: 'Charge and enjoy',
    description: 'Plug in your phone and your personal smart display appears automatically.',
  },
]

export const planRows: PlanRow[] = [
  { label: 'Any Android widget on standby', free: true, pro: true },
  { label: 'Swipeable widget stacks', free: true, pro: true },
  { label: 'Alpha channel mode & dimming', free: true, pro: true },
  { label: 'Simulate standby', free: true, pro: true },
  { label: 'Widget slots', free: '2', pro: '1 – 3' },
  { label: 'Flip clock widget', free: false, pro: true },
  { label: 'Supports the developer', free: false, pro: true },
]

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
    question: 'Is myStandby free?',
    answer:
      'Yes. The app is free and contains no ads. An optional one-time PRO purchase unlocks extra features — there is no subscription.',
  },
  {
    question: 'What happens to PRO if I reinstall the app?',
    answer:
      'Your PRO purchase is linked to your Google account and is restored automatically from Google Play.',
  },
  {
    question: 'How do I start standby?',
    answer:
      'Set myStandby as your screensaver in the app settings under System → Screensaver. It then starts while charging, according to your system screensaver settings. Use “Simulate” to preview it at any time.',
  },
]
