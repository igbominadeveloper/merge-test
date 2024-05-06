import { create } from 'zustand';

interface IMobileSidebar {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
}

const useMobile = create<IMobileSidebar>()(set => ({
  isOpenSidebar: false,
  toggleSidebar: () => {
    set(store => ({
      isOpenSidebar: !store.isOpenSidebar,
    }));
  },
}));

export default useMobile;
