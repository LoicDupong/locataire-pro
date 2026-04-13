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
  uploadedFiles: Record<string, File[]>
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
        set((state) => {
          const item = state.checklist.find(i => i.key === key)
          const maxFiles = item?.maxFiles ?? 1
          const currentFiles = state.uploadedFiles[key] ?? []
          const currentNames = item?.fileNames ?? []

          const newFiles = maxFiles > 1
            ? [...currentFiles, file].slice(0, maxFiles)
            : [file]
          const newNames = maxFiles > 1
            ? [...currentNames, fileName].slice(0, maxFiles)
            : [fileName]

          return {
            uploadedFiles: { ...state.uploadedFiles, [key]: newFiles },
            checklist: state.checklist.map(i =>
              i.key === key ? { ...i, status: 'uploaded', fileNames: newNames } : i
            ),
          }
        }),

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
