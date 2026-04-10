// types/dossier.ts

export type Situation = 'employee' | 'student' | 'self-employed'

export type Profile = {
  name: string
  situation: Situation
  hasGuarantor: boolean
}

export type ItemStatus = 'pending' | 'uploaded' | 'optional'

export type ChecklistItem = {
  key: string
  label: string
  required: boolean
  forGuarantor: boolean
  status: ItemStatus
  fileName?: string
}

// Note: the store's full type is defined locally in store/dossierStore.ts as FullStore
