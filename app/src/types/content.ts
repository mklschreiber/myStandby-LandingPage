export type IconName =
  | 'widgets'
  | 'stack'
  | 'layout'
  | 'standby'
  | 'play'
  | 'moon'
  | 'brightness'
  | 'history'
  | 'search'
  | 'edit'
  | 'clock'
  | 'feedback'

export interface Feature {
  id: string
  icon: IconName
  title: string
  description: string
  pro?: boolean
}

export interface Screenshot {
  id: string
  title: string
  description: string
  alt: string
}

export interface Step {
  title: string
  description: string
}

export interface PlanRow {
  label: string
  free: string | boolean
  pro: string | boolean
}

export interface FaqEntry {
  question: string
  answer: string
}
