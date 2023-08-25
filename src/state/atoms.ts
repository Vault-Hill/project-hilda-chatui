import { atom } from 'jotai';

export const sessionAtom = atom<{ connected: boolean }>({ connected: false });
