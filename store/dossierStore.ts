'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Profile, ChecklistItem } from '@/types/dossier'

// uploadedFiles is intentionally NOT in the persisted state —
// File objects can't be serialized to JSON.
type PersistedState = {
  profile: Profile | null
  sessionId: string | null
  checklist: ChecklistItem[]
}

type FullStore = PersistedState & {
  uploadedFiles: Record<string, File>
  setProfile: (profile: Profile) => void
  setSessionId: (id: string) => void
  setChecklist: (items: ChecklistItem[]) => void
  markUploaded: (key: string, file: File, fileName: string) => void
  reset: () => void
}

const initialPersistedState: PersistedState = {
  profile: null,
  sessionId: null,
  checklist: [],
}

export const useDossierStore = create<FullStore>()(
  persist(
    (set) => ({
      ...initialPersistedState,
      uploadedFiles: {},

      setProfile: (profile) => set({ profile }),
      setSessionId: (sessionId) => set({ sessionId }),
      setChecklist: (checklist) => set({ checklist }),

      markUploaded: (key, file, fileName) =>
        set((state) => ({
          uploadedFiles: { ...state.uploadedFiles, [key]: file },
          checklist: state.checklist.map((item) =>
            item.key === key ? { ...item, status: 'uploaded', fileName } : item
          ),
        })),

      reset: () =>
        set({
          ...initialPersistedState,
          uploadedFiles: {},
        }),
    }),
    {
      name: 'locataire-pro-dossier',
      storage: createJSONStorage(() => localStorage),
      // Only persist metadata, not File objects
      partialize: (state) => ({
        profile: state.profile,
        sessionId: state.sessionId,
        checklist: state.checklist,
      }),
    }
  )
)
