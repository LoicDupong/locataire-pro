import { describe, it, expect } from 'vitest'
import { generateChecklist, canExport } from '../lib/checklist'
import type { Profile, ChecklistItem } from '../types/dossier'

// ─── generateChecklist ───────────────────────────────────────────────────────

describe('generateChecklist — employee, no guarantor', () => {
  const profile: Profile = { name: 'Alice', situation: 'employee', hasGuarantor: false }
  const items = generateChecklist(profile)

  it('returns 6 items', () => {
    expect(items).toHaveLength(6)
  })

  it('all items are required and not forGuarantor', () => {
    expect(items.every(i => i.required && !i.forGuarantor)).toBe(true)
  })

  it('includes identity', () => {
    expect(items.some(i => i.key === 'identity')).toBe(true)
  })

  it('includes payslips', () => {
    expect(items.some(i => i.key === 'payslips')).toBe(true)
  })

  it('includes work-contract', () => {
    expect(items.some(i => i.key === 'work-contract')).toBe(true)
  })

  it('includes tax-notice', () => {
    expect(items.some(i => i.key === 'tax-notice')).toBe(true)
  })

  it('includes rib', () => {
    expect(items.some(i => i.key === 'rib')).toBe(true)
  })

  it('includes domicile', () => {
    expect(items.some(i => i.key === 'domicile')).toBe(true)
  })

  it('all items start as pending', () => {
    expect(items.every(i => i.status === 'pending')).toBe(true)
  })
})

describe('generateChecklist — employee, with guarantor', () => {
  const profile: Profile = { name: 'Alice', situation: 'employee', hasGuarantor: true }
  const items = generateChecklist(profile)
  const guarantorItems = items.filter(i => i.forGuarantor)
  const applicantItems = items.filter(i => !i.forGuarantor)

  it('returns 6 applicant + 5 guarantor = 11 items', () => {
    expect(items).toHaveLength(11)
  })

  it('has 5 guarantor items', () => {
    expect(guarantorItems).toHaveLength(5)
  })

  it('guarantor items have prefixed keys', () => {
    expect(guarantorItems.every(i => i.key.startsWith('guarantor-'))).toBe(true)
  })

  it('applicant items are not forGuarantor', () => {
    expect(applicantItems.every(i => !i.forGuarantor)).toBe(true)
  })

  it('includes guarantor-identity', () => {
    expect(guarantorItems.some(i => i.key === 'guarantor-identity')).toBe(true)
  })

  it('all guarantor items are required', () => {
    expect(guarantorItems.every(i => i.required)).toBe(true)
  })
})

describe('generateChecklist — student (always has guarantor)', () => {
  const profile: Profile = { name: 'Bob', situation: 'student', hasGuarantor: true }
  const items = generateChecklist(profile)
  const required = items.filter(i => i.required && !i.forGuarantor)
  const optional = items.filter(i => !i.required && !i.forGuarantor)
  const guarantorItems = items.filter(i => i.forGuarantor)

  it('has 5 required applicant + 1 optional + 5 guarantor = 11 items', () => {
    expect(items).toHaveLength(11)
  })

  it('scholarship is optional', () => {
    const scholarship = items.find(i => i.key === 'scholarship')
    expect(scholarship).toBeDefined()
    expect(scholarship?.required).toBe(false)
    expect(scholarship?.status).toBe('optional')
  })

  it('has 5 required applicant items', () => {
    expect(required).toHaveLength(5)
  })

  it('has 1 optional applicant item', () => {
    expect(optional).toHaveLength(1)
  })

  it('has 5 guarantor items', () => {
    expect(guarantorItems).toHaveLength(5)
  })
})

describe('generateChecklist — self-employed, no guarantor', () => {
  const profile: Profile = { name: 'Carol', situation: 'self-employed', hasGuarantor: false }
  const items = generateChecklist(profile)

  it('returns 5 items', () => {
    expect(items).toHaveLength(5)
  })

  it('includes kbis', () => {
    expect(items.some(i => i.key === 'kbis')).toBe(true)
  })

  it('includes accounting', () => {
    expect(items.some(i => i.key === 'accounting')).toBe(true)
  })
})

describe('generateChecklist — self-employed, with guarantor', () => {
  const profile: Profile = { name: 'Carol', situation: 'self-employed', hasGuarantor: true }
  const items = generateChecklist(profile)
  const guarantorItems = items.filter(i => i.forGuarantor)

  it('has 5 applicant + 3 guarantor = 8 items', () => {
    expect(items).toHaveLength(8)
  })

  it('guarantor has identity, accounting, rib (3 items)', () => {
    expect(guarantorItems).toHaveLength(3)
    expect(guarantorItems.some(i => i.key === 'guarantor-identity')).toBe(true)
    expect(guarantorItems.some(i => i.key === 'guarantor-accounting')).toBe(true)
    expect(guarantorItems.some(i => i.key === 'guarantor-rib')).toBe(true)
  })
})

// ─── canExport ───────────────────────────────────────────────────────────────

describe('canExport', () => {
  const makeItem = (key: string, required: boolean, forGuarantor: boolean, status: ChecklistItem['status']): ChecklistItem => ({
    key, label: key, required, forGuarantor, status
  })

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
      makeItem('guarantor-identity', true, true, 'pending'),
    ]
    expect(canExport(items, true)).toBe(false)
  })

  it('returns true when all required applicant + guarantor items are uploaded', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('guarantor-identity', true, true, 'uploaded'),
    ]
    expect(canExport(items, true)).toBe(true)
  })

  it('ignores guarantor items when hasGuarantor=false', () => {
    const items: ChecklistItem[] = [
      makeItem('identity', true, false, 'uploaded'),
      makeItem('guarantor-identity', true, true, 'pending'),
    ]
    expect(canExport(items, false)).toBe(true)
  })

  it('returns false when checklist is empty', () => {
    expect(canExport([], false)).toBe(false)
  })
})
