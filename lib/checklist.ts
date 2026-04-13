import type { Profile, ChecklistItem, Situation } from '@/types/dossier'

type ItemDef = Omit<ChecklistItem, 'status'>

function toItems(defs: ItemDef[]): ChecklistItem[] {
  return defs.map(d => ({ ...d, status: d.required ? 'pending' : 'optional', fileNames: [] }))
}

// ─── BELGIQUE ────────────────────────────────────────────────────────────────

const BE_EMPLOYEE: ItemDef[] = [
  { key: 'be-sal-identity',    label: "Carte d'identité / titre de séjour",                              required: true,  forGuarantor: false },
  { key: 'be-sal-payslips',    label: '3 dernières fiches de paie',                                      required: true,  forGuarantor: false, maxFiles: 3 },
  { key: 'be-sal-contract',    label: 'Contrat de travail ou attestation employeur',                      required: true,  forGuarantor: false },
  { key: 'be-sal-tax',         label: "Dernier avertissement-extrait de rôle",                            required: true,  forGuarantor: false },
  { key: 'be-sal-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'be-sal-household',   label: 'Composition de ménage',                                           required: false, forGuarantor: false },
  { key: 'be-sal-extra',       label: 'Preuve de revenus complémentaires (primes, indépendant partiel…)', required: false, forGuarantor: false },
]

const BE_STUDENT: ItemDef[] = [
  { key: 'be-stu-identity',    label: "Carte d'identité / titre de séjour",                              required: true,  forGuarantor: false },
  { key: 'be-stu-enrollment',  label: "Certificat d'inscription ou carte étudiant",                      required: true,  forGuarantor: false },
  { key: 'be-stu-scholarship', label: 'Justificatif de bourse ou CPAS',                                  required: false, forGuarantor: false },
  { key: 'be-stu-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'be-stu-household',   label: 'Composition de ménage',                                           required: false, forGuarantor: false },
  { key: 'be-stu-gua-identity', label: "Garant — Carte d'identité / titre de séjour",                   required: true,  forGuarantor: true  },
  { key: 'be-stu-gua-payslips', label: 'Garant — 3 dernières fiches de paie',                           required: true,  forGuarantor: true,  maxFiles: 3 },
  { key: 'be-stu-gua-tax',      label: "Garant — Dernier avertissement-extrait de rôle",                 required: true,  forGuarantor: true  },
]

const BE_SELF_EMPLOYED: ItemDef[] = [
  { key: 'be-ind-identity',   label: "Carte d'identité / titre de séjour",                               required: true,  forGuarantor: false },
  { key: 'be-ind-tax',        label: "2 derniers avertissements-extraits de rôle",                        required: true,  forGuarantor: false },
  { key: 'be-ind-onss',       label: 'Attestation ONSS ou INASTI',                                       required: true,  forGuarantor: false },
  { key: 'be-ind-bce',        label: 'Extrait BCE — moins de 3 mois',                                    required: true,  forGuarantor: false },
  { key: 'be-ind-quittances', label: '3 dernières quittances de loyer ou attestation d\'hébergement',    required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'be-ind-household',  label: 'Composition de ménage',                                            required: false, forGuarantor: false },
  { key: 'be-ind-extra',      label: 'Preuve de revenus complémentaires',                                 required: false, forGuarantor: false },
]

const BE_UNEMPLOYED: ItemDef[] = [
  { key: 'be-une-identity',    label: "Carte d'identité / titre de séjour",                              required: true,  forGuarantor: false },
  { key: 'be-une-income',      label: 'Justificatif de revenus : attestation ONEM, CPAS, mutuelle, pension ou rente', required: true, forGuarantor: false },
  { key: 'be-une-tax',         label: "Dernier avertissement-extrait de rôle",                            required: false, forGuarantor: false },
  { key: 'be-une-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'be-une-household',   label: 'Composition de ménage',                                           required: false, forGuarantor: false },
  { key: 'be-une-gua-identity', label: "Garant — Carte d'identité / titre de séjour",                   required: true,  forGuarantor: true  },
  { key: 'be-une-gua-payslips', label: 'Garant — 3 dernières fiches de paie',                           required: true,  forGuarantor: true,  maxFiles: 3 },
  { key: 'be-une-gua-tax',      label: "Garant — Dernier avertissement-extrait de rôle",                 required: true,  forGuarantor: true  },
]

// ─── FRANCE ──────────────────────────────────────────────────────────────────

const FR_EMPLOYEE: ItemDef[] = [
  { key: 'fr-sal-identity',   label: 'Pièce d\'identité (CNI, passeport ou titre de séjour)',             required: true,  forGuarantor: false },
  { key: 'fr-sal-payslips',   label: '3 dernières fiches de paie',                                        required: true,  forGuarantor: false, maxFiles: 3 },
  { key: 'fr-sal-contract',   label: 'Contrat de travail ou attestation employeur',                       required: true,  forGuarantor: false },
  { key: 'fr-sal-tax',        label: "Dernier avis d'imposition",                                         required: true,  forGuarantor: false },
  { key: 'fr-sal-quittances', label: '3 dernières quittances de loyer ou attestation d\'hébergement',     required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'fr-sal-rib',        label: 'Relevé d\'identité bancaire (RIB)',                                  required: true,  forGuarantor: false },
  { key: 'fr-sal-domicile',   label: 'Justificatif de domicile actuel',                                   required: true,  forGuarantor: false },
  { key: 'fr-sal-extra',      label: 'Preuve de revenus complémentaires',                                  required: false, forGuarantor: false },
]

const FR_STUDENT: ItemDef[] = [
  { key: 'fr-stu-identity',    label: 'Pièce d\'identité (CNI, passeport ou titre de séjour)',            required: true,  forGuarantor: false },
  { key: 'fr-stu-enrollment',  label: 'Carte étudiante ou certificat de scolarité',                       required: true,  forGuarantor: false },
  { key: 'fr-stu-scholarship', label: 'Justificatif de bourse CROUS',                                    required: false, forGuarantor: false },
  { key: 'fr-stu-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'fr-stu-rib',         label: 'Relevé d\'identité bancaire (RIB)',                                required: true,  forGuarantor: false },
  { key: 'fr-stu-domicile',    label: 'Justificatif de domicile actuel',                                  required: true,  forGuarantor: false },
  { key: 'fr-stu-gua-identity', label: 'Garant — Pièce d\'identité',                                     required: true,  forGuarantor: true  },
  { key: 'fr-stu-gua-payslips', label: 'Garant — 3 dernières fiches de paie',                            required: true,  forGuarantor: true,  maxFiles: 3 },
  { key: 'fr-stu-gua-tax',      label: "Garant — Dernier avis d'imposition",                              required: true,  forGuarantor: true  },
  { key: 'fr-stu-visale',       label: 'Garantie Visale (alternative au garant)',                          required: false, forGuarantor: false },
]

const FR_SELF_EMPLOYED: ItemDef[] = [
  { key: 'fr-ind-identity',    label: 'Pièce d\'identité (CNI, passeport ou titre de séjour)',            required: true,  forGuarantor: false },
  { key: 'fr-ind-accounting',  label: '2 derniers bilans comptables ou avis d\'imposition',               required: true,  forGuarantor: false },
  { key: 'fr-ind-kbis',        label: 'Kbis de moins de 3 mois',                                         required: true,  forGuarantor: false },
  { key: 'fr-ind-tax',         label: "Dernier avis d'imposition",                                        required: true,  forGuarantor: false },
  { key: 'fr-ind-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'fr-ind-rib',         label: 'Relevé d\'identité bancaire (RIB)',                                required: true,  forGuarantor: false },
  { key: 'fr-ind-domicile',    label: 'Justificatif de domicile actuel',                                  required: true,  forGuarantor: false },
  { key: 'fr-ind-extra',       label: 'Preuve de revenus complémentaires',                                required: false, forGuarantor: false },
]

const FR_UNEMPLOYED: ItemDef[] = [
  { key: 'fr-une-identity',    label: 'Pièce d\'identité (CNI, passeport ou titre de séjour)',            required: true,  forGuarantor: false },
  { key: 'fr-une-income',      label: 'Justificatif de revenus : attestation France Travail, CAF, caisse de retraite ou rente', required: true, forGuarantor: false },
  { key: 'fr-une-tax',         label: "Dernier avis d'imposition",                                        required: false, forGuarantor: false },
  { key: 'fr-une-quittances',  label: '3 dernières quittances de loyer ou attestation d\'hébergement',   required: false, forGuarantor: false, maxFiles: 3 },
  { key: 'fr-une-rib',         label: 'Relevé d\'identité bancaire (RIB)',                                required: true,  forGuarantor: false },
  { key: 'fr-une-domicile',    label: 'Justificatif de domicile actuel',                                  required: true,  forGuarantor: false },
  { key: 'fr-une-gua-identity', label: 'Garant — Pièce d\'identité',                                     required: true,  forGuarantor: true  },
  { key: 'fr-une-gua-payslips', label: 'Garant — 3 dernières fiches de paie',                            required: true,  forGuarantor: true,  maxFiles: 3 },
  { key: 'fr-une-gua-tax',      label: "Garant — Dernier avis d'imposition",                              required: true,  forGuarantor: true  },
  { key: 'fr-une-visale',       label: 'Garantie Visale (alternative au garant)',                          required: false, forGuarantor: false },
]

// ─── Map dispatch ─────────────────────────────────────────────────────────────

const ITEMS: Record<'BE' | 'FR', Record<Situation, ItemDef[]>> = {
  BE: {
    employee:      BE_EMPLOYEE,
    student:       BE_STUDENT,
    'self-employed': BE_SELF_EMPLOYED,
    unemployed:    BE_UNEMPLOYED,
  },
  FR: {
    employee:      FR_EMPLOYEE,
    student:       FR_STUDENT,
    'self-employed': FR_SELF_EMPLOYED,
    unemployed:    FR_UNEMPLOYED,
  },
}

export function generateChecklist(profile: Profile): ChecklistItem[] {
  const defs = ITEMS[profile.country][profile.situation]
  return toItems(defs)
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
