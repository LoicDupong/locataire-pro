import type { Profile, ChecklistItem } from '@/types/dossier'

const EMPLOYEE_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { key: 'identity',      label: "Pièce d'identité (CNI ou passeport)",  required: true,  forGuarantor: false },
  { key: 'payslips',      label: '3 dernières fiches de paie',            required: true,  forGuarantor: false },
  { key: 'work-contract', label: 'Contrat de travail',                    required: true,  forGuarantor: false },
  { key: 'tax-notice',    label: "Dernier avis d'imposition",             required: true,  forGuarantor: false },
  { key: 'rib',           label: 'RIB',                                   required: true,  forGuarantor: false },
  { key: 'domicile',      label: 'Justificatif de domicile actuel',       required: true,  forGuarantor: false },
]

const STUDENT_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { key: 'identity',           label: "Pièce d'identité",                           required: true,  forGuarantor: false },
  { key: 'student-card',       label: 'Carte étudiante ou certificat de scolarité', required: true,  forGuarantor: false },
  { key: 'scholarship',        label: 'Justificatif de bourse',                     required: false, forGuarantor: false },
  { key: 'parents-tax-notice', label: "Avis d'imposition des parents",              required: true,  forGuarantor: false },
  { key: 'rib',                label: 'RIB',                                        required: true,  forGuarantor: false },
  { key: 'domicile',           label: 'Justificatif de domicile actuel',            required: true,  forGuarantor: false },
]

const SELF_EMPLOYED_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { key: 'identity',   label: "Pièce d'identité",                      required: true, forGuarantor: false },
  { key: 'accounting', label: "2 derniers bilans ou avis d'imposition", required: true, forGuarantor: false },
  { key: 'kbis',       label: 'Kbis (extrait moins de 3 mois)',         required: true, forGuarantor: false },
  { key: 'rib',        label: 'RIB',                                    required: true, forGuarantor: false },
  { key: 'domicile',   label: 'Justificatif de domicile actuel',        required: true, forGuarantor: false },
]

const GUARANTOR_EMPLOYEE_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { key: 'guarantor-identity',      label: "Garant — Pièce d'identité",           required: true, forGuarantor: true },
  { key: 'guarantor-payslips',      label: 'Garant — 3 dernières fiches de paie',  required: true, forGuarantor: true },
  { key: 'guarantor-work-contract', label: 'Garant — Contrat de travail',          required: true, forGuarantor: true },
  { key: 'guarantor-tax-notice',    label: "Garant — Dernier avis d'imposition",   required: true, forGuarantor: true },
  { key: 'guarantor-rib',           label: 'Garant — RIB',                         required: true, forGuarantor: true },
]

const GUARANTOR_SELF_EMPLOYED_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { key: 'guarantor-identity',   label: "Garant — Pièce d'identité",                      required: true, forGuarantor: true },
  { key: 'guarantor-accounting', label: "Garant — 2 derniers bilans ou avis d'imposition", required: true, forGuarantor: true },
  { key: 'guarantor-rib',        label: 'Garant — RIB',                                    required: true, forGuarantor: true },
]

function toItems(defs: Omit<ChecklistItem, 'status'>[]): ChecklistItem[] {
  return defs.map(d => ({
    ...d,
    status: d.required ? 'pending' : 'optional',
  }))
}

export function generateChecklist(profile: Profile): ChecklistItem[] {
  const { situation, hasGuarantor } = profile

  let applicantItems: ChecklistItem[]
  let guarantorItems: ChecklistItem[] = []

  if (situation === 'employee') {
    applicantItems = toItems(EMPLOYEE_ITEMS)
    if (hasGuarantor) guarantorItems = toItems(GUARANTOR_EMPLOYEE_ITEMS)
  } else if (situation === 'student') {
    applicantItems = toItems(STUDENT_ITEMS)
    guarantorItems = toItems(GUARANTOR_EMPLOYEE_ITEMS) // students always have guarantor
  } else {
    applicantItems = toItems(SELF_EMPLOYED_ITEMS)
    if (hasGuarantor) guarantorItems = toItems(GUARANTOR_SELF_EMPLOYED_ITEMS)
  }

  return [...applicantItems, ...guarantorItems]
}

export function canExport(checklist: ChecklistItem[], hasGuarantor: boolean): boolean {
  if (checklist.length === 0) return false

  const requiredApplicant = checklist.filter(i => i.required && !i.forGuarantor)
  const allApplicantUploaded = requiredApplicant.every(i => i.status === 'uploaded')

  if (!allApplicantUploaded) return false

  if (hasGuarantor) {
    const requiredGuarantor = checklist.filter(i => i.required && i.forGuarantor)
    return requiredGuarantor.every(i => i.status === 'uploaded')
  }

  return true
}
