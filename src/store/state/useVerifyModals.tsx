import { create } from 'zustand';

interface Props {
  isModalOpen: boolean;
  setModal: () => void;
}

export const usePhoneNumberModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useNinModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useVerifyCodeModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useBvnModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useIdentifyDocumentsModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useRegistationDocumentModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));

export const useBusinessAddressModal = create<Props>()(set => ({
  isModalOpen: false,
  setModal: () => {
    set(store => ({
      isModalOpen: !store.isModalOpen,
    }));
  },
}));
