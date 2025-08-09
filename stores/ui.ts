
import { create } from 'zustand'

type UIState = {
  disputesTab: 'CURRENT' | 'COMPLETED'
  setDisputesTab: (t: 'CURRENT'|'COMPLETED') => void
}

export const useUI = create<UIState>((set)=>({
  disputesTab: 'CURRENT',
  setDisputesTab: (t)=>set({ disputesTab: t })
}))
