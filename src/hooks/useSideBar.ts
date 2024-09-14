import create from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapse: (collapsed: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapse: (collapsed: boolean) => set({ isCollapsed: collapsed }),
}));

export default useSidebarStore;
