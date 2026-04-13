import { describe, it, expect } from 'vitest'
import { generateChecklist, canExport } from '../lib/checklist'
import type { Profile, ChecklistItem } from '../types/dossier'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeProfile(overrides: Partial<Profile>): Profile {
  return {
    name: 'Test',
    country: 'BE',
    situation: 'employee',
    hasGuarantor: false,
    ...overrides,
  }
}

function makeItem(key: string, required: boolean, forGuarantor: boolean, status: ChecklistItem['status']): ChecklistItem {
  return { key, label: key, required, forGuarantor, status }
}

// ─── BE — Salarié ────────────────────────────────────────────────────────────

describe('BE — Salarié', () => {
  const items = generateChecklist(makeProfile({ country: 'BE', situation: 'employee', hasGuarantor: false }))
  const required = items.filter(i => i.required && !i.forGuarantor)
  const optional = items.filter(i => !i.required && !i.forGuarantor)
  const guarantor = items.filter(i => i.forGuarantor)

  it('returns 7 items total', () => {
    expect(items).toHaveLength(7)
  })

  it('has 4 required applicant items', () => {
    expect(required).toHaveLength(4)
  })

  it('has 3 optional items', () => {
    expect(optional).toHaveLength(3)
  })

  it('has no guarantor items', () => {
    expect(guarantor).toHaveLength(0)
  })

  it('all required items start as pending', () => {
    expect(required.every(i => i.status === 'pending')).toBe(true)
  })

  it('optional items start as optional', () => {
    expect(optional.every(i => i.status === 'optional')).toBe(true)
  })

  it('keys are prefixed with be-sal-', () => {
    expect(items.every(i => i.key.startsWith('be-sal-'))).toBe(true)
  })

  it('payslips has maxFiles 3', () => {
    const payslips = items.find(i => i.key === 'be-sal-payslips')
    expect(payslips?.maxFiles).toBe(3)
  })

  it('quittances is optional with maxFiles 3', () => {
    const quittances = items.find(i => i.key === 'be-sal-quittances')
    expect(quittances?.required).toBe(false)
    expect(quittances?.maxFiles).toBe(3)
  })

  it('household is optional', () => {
    const household = items.find(i => i.key === 'be-sal-household')
    expect(household?.required).toBe(false)
  })

  it('has no guarantee item', () => {
    expect(items.some(i => i.key === 'be-sal-guarantee')).toBe(false)
  })
})

// ─── BE — Étudiant ───────────────────────────────────────────────────────────

describe('BE — Étudiant', () => {
  const items = generateChecklist(makeProfile({ country: 'BE', situation: 'student', hasGuarantor: true }))
  const applicant = items.filter(i => !i.forGuarantor)
  const guarantor = items.filter(i => i.forGuarantor)
  const optional = applicant.filter(i => !i.required)

  it('returns 8 items total (5 applicant + 3 guarantor)', () => {
    expect(items).toHaveLength(8)
  })

  it('has 5 applicant items', () => {
    expect(applicant).toHaveLength(5)
  })

  it('has 3 guarantor items', () => {
    expect(guarantor).toHaveLength(3)
  })

  it('scholarship is optional', () => {
    const scholarship = items.find(i => i.key === 'be-stu-scholarship')
    expect(scholarship).toBeDefined()
    expect(scholarship?.required).toBe(false)
    expect(scholarship?.status).toBe('optional')
  })

  it('has 3 optional applicant items', () => {
    expect(optional).toHaveLength(3)
  })

  it('all guarantor items are required', () => {
    expect(guarantor.every(i => i.required)).toBe(true)
  })

  it('guarantor keys start with be-stu-gua-', () => {
    expect(guarantor.every(i => i.key.startsWith('be-stu-gua-'))).toBe(true)
  })

  it('has no guarantee item', () => {
    expect(items.some(i => i.key === 'be-stu-guarantee')).toBe(false)
  })
})

// ─── BE — Indépendant ────────────────────────────────────────────────────────

describe('BE — Indépendant', () => {
  const items = generateChecklist(makeProfile({ country: 'BE', situation: 'self-employed', hasGuarantor: false }))
  const guarantor = items.filter(i => i.forGuarantor)
  const optional = items.filter(i => !i.required)

  it('returns 7 items total', () => {
    expect(items).toHaveLength(7)
  })

  it('has no guarantor items', () => {
    expect(guarantor).toHaveLength(0)
  })

  it('has 3 optional items', () => {
    expect(optional).toHaveLength(3)
  })

  it('includes ONSS item', () => {
    expect(items.some(i => i.key === 'be-ind-onss')).toBe(true)
  })

  it('includes BCE item', () => {
    expect(items.some(i => i.key === 'be-ind-bce')).toBe(true)
  })

  it('has no guarantee item', () => {
    expect(items.some(i => i.key === 'be-ind-guarantee')).toBe(false)
  })
})

// ─── BE — Sans emploi ────────────────────────────────────────────────────────

describe('BE — Sans emploi', () => {
  const items = generateChecklist(makeProfile({ country: 'BE', situation: 'unemployed', hasGuarantor: true }))
  const applicant = items.filter(i => !i.forGuarantor)
  const guarantor = items.filter(i => i.forGuarantor)
  const optional = applicant.filter(i => !i.required)

  it('returns 8 items total (5 applicant + 3 guarantor)', () => {
    expect(items).toHaveLength(8)
  })

  it('has 5 applicant items', () => {
    expect(applicant).toHaveLength(5)
  })

  it('has 3 guarantor items', () => {
    expect(guarantor).toHaveLength(3)
  })

  it('tax is optional for applicant', () => {
    const tax = items.find(i => i.key === 'be-une-tax')
    expect(tax).toBeDefined()
    expect(tax?.required).toBe(false)
    expect(tax?.status).toBe('optional')
  })

  it('has 3 optional applicant items', () => {
    expect(optional).toHaveLength(3)
  })

  it('all guarantor items are required', () => {
    expect(guarantor.every(i => i.required)).toBe(true)
  })

  it('has no guarantee item', () => {
    expect(items.some(i => i.key === 'be-une-guarantee')).toBe(false)
  })
})

// ─── FR — Salarié ────────────────────────────────────────────────────────────

describe('FR — Salarié', () => {
  const items = generateChecklist(makeProfile({ country: 'FR', situation: 'employee', hasGuarantor: false }))
  const required = items.filter(i => i.required && !i.forGuarantor)
  const optional = items.filter(i => !i.required)
  const guarantor = items.filter(i => i.forGuarantor)

  it('returns 8 items total', () => {
    expect(items).toHaveLength(8)
  })

  it('has 6 required applicant items', () => {
    expect(required).toHaveLength(6)
  })

  it('has 2 optional items', () => {
    expect(optional).toHaveLength(2)
  })

  it('has no guarantor items', () => {
    expect(guarantor).toHaveLength(0)
  })

  it('includes RIB', () => {
    expect(items.some(i => i.key === 'fr-sal-rib')).toBe(true)
  })

  it('keys are prefixed with fr-sal-', () => {
    expect(items.every(i => i.key.startsWith('fr-sal-'))).toBe(true)
  })

  it('quittances is optional with maxFiles 3', () => {
    const quittances = items.find(i => i.key === 'fr-sal-quittances')
    expect(quittances?.required).toBe(false)
    expect(quittances?.maxFiles).toBe(3)
  })
})

// ─── FR — Étudiant ───────────────────────────────────────────────────────────

describe('FR — Étudiant', () => {
  const items = generateChecklist(makeProfile({ country: 'FR', situation: 'student', hasGuarantor: true }))
  const applicant = items.filter(i => !i.forGuarantor)
  const guarantor = items.filter(i => i.forGuarantor)

  it('returns 10 items total (7 applicant + 3 guarantor)', () => {
    expect(items).toHaveLength(10)
  })

  it('has 7 applicant items', () => {
    expect(applicant).toHaveLength(7)
  })

  it('has 3 guarantor items', () => {
    expect(guarantor).toHaveLength(3)
  })

  it('scholarship is optional', () => {
    const scholarship = items.find(i => i.key === 'fr-stu-scholarship')
    expect(scholarship?.required).toBe(false)
  })

  it('Visale is optional and not forGuarantor', () => {
    const visale = items.find(i => i.key === 'fr-stu-visale')
    expect(visale).toBeDefined()
    expect(visale?.required).toBe(false)
    expect(visale?.forGuarantor).toBe(false)
  })

  it('all guarantor items are required', () => {
    expect(guarantor.every(i => i.required)).toBe(true)
  })

  it('quittances is optional with maxFiles 3', () => {
    const quittances = items.find(i => i.key === 'fr-stu-quittances')
    expect(quittances?.required).toBe(false)
    expect(quittances?.maxFiles).toBe(3)
  })
})

// ─── FR — Indépendant ────────────────────────────────────────────────────────

describe('FR — Indépendant', () => {
  const items = generateChecklist(makeProfile({ country: 'FR', situation: 'self-employed', hasGuarantor: false }))
  const guarantor = items.filter(i => i.forGuarantor)

  it('returns 8 items total', () => {
    expect(items).toHaveLength(8)
  })

  it('has no guarantor items', () => {
    expect(guarantor).toHaveLength(0)
  })

  it('includes Kbis', () => {
    expect(items.some(i => i.key === 'fr-ind-kbis')).toBe(true)
  })

  it('includes accounting', () => {
    expect(items.some(i => i.key === 'fr-ind-accounting')).toBe(true)
  })
})

// ─── FR — Sans emploi ────────────────────────────────────────────────────────

describe('FR — Sans emploi', () => {
  const items = generateChecklist(makeProfile({ country: 'FR', situation: 'unemployed', hasGuarantor: true }))
  const applicant = items.filter(i => !i.forGuarantor)
  const guarantor = items.filter(i => i.forGuarantor)

  it('returns 10 items total (7 applicant + 3 guarantor)', () => {
    expect(items).toHaveLength(10)
  })

  it('has 7 applicant items', () => {
    expect(applicant).toHaveLength(7)
  })

  it('has 3 guarantor items', () => {
    expect(guarantor).toHaveLength(3)
  })

  it('tax is optional', () => {
    const tax = items.find(i => i.key === 'fr-une-tax')
    expect(tax?.required).toBe(false)
  })

  it('Visale is optional and not forGuarantor', () => {
    const visale = items.find(i => i.key === 'fr-une-visale')
    expect(visale).toBeDefined()
    expect(visale?.required).toBe(false)
    expect(visale?.forGuarantor).toBe(false)
  })

  it('all guarantor items are required', () => {
    expect(guarantor.every(i => i.required)).toBe(true)
  })
})

// ─── canExport ───────────────────────────────────────────────────────────────

describe('canExport', () => {
  it('returns true when all required applicant items are uploaded, no guarantor', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('rib', true, false, 'uploaded'),
      makeItem('scholarship', false, false, 'optional'),
    ]
    expect(canExport(items, false)).toBe(true)
  })

  it('returns false when a required applicant item is pending', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('rib', true, false, 'pending'),
    ]
    expect(canExport(items, false)).toBe(false)
  })

  it('returns false when a required guarantor item is pending and hasGuarantor=true', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('gua-identity', true, true, 'pending'),
    ]
    expect(canExport(items, true)).toBe(false)
  })

  it('returns true when all required applicant + guarantor items are uploaded', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('gua-identity', true, true, 'uploaded'),
    ]
    expect(canExport(items, true)).toBe(true)
  })

  it('ignores guarantor items when hasGuarantor=false', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('gua-identity', true, true, 'pending'),
    ]
    expect(canExport(items, false)).toBe(true)
  })

  it('returns false when checklist is empty', () => {
    expect(canExport([], false)).toBe(false)
  })
})
