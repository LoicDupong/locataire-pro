// types/dossier.ts

export type Country = 'BE' | 'FR'

export type Situation = 'employee' | 'student' | 'self-employed' | 'unemployed'

export type Profile = {
  name: string
  country: Country
  situation: Situation
  hasGuarantor: boolean
  email?: string
  phone?: string
}

export type ItemStatus = 'pending' | 'uploaded' | 'optional'

export type ChecklistItem = {
  key: string
  label: string
  required: boolean
  forGuarantor: boolean
  status: ItemStatus
  maxFiles?: number
  fileNames?: string[]
}

// Note: the store's full type is defined locally in store/dossierStore.ts as FullStore
