import create, { GetState, SetState } from 'zustand';

type StringField = string | null | undefined;
type NumberField = number | null | undefined;

export interface StoreState {
  name: StringField;
  passcode: StringField;
  autolock: NumberField;
  items: { name: StringField; metadata?: StringField; remove: boolean | null }[];
  groups: { name: StringField; grade: NumberField }[];
  maxDistance: NumberField;
  doorRate: NumberField;
  lockSound: StringField;
  unlockSound: StringField;
  auto: boolean | null;
  state: boolean | null;
  lockpick: boolean | null;
  hideUi: boolean | null;
  doors: boolean | null;
}

interface StateSetters {
  sounds: string[];
  setSounds: (value: string[]) => void;
  setLockSound: (value: StoreState['lockSound']) => void;
  setUnlockSound: (value: StoreState['unlockSound']) => void;
  setName: (value: StoreState['name']) => void;
  setPasscode: (value: StoreState['passcode']) => void;
  setAutolock: (value: StoreState['autolock']) => void;
  setItems: (fn: (state: StoreState['items']) => StoreState['items']) => void;
  setGroups: (fn: (state: StoreState['groups']) => StoreState['groups']) => void;
  toggleCheckbox: (type: 'state' | 'doors' | 'auto' | 'lockpick' | 'hideUi') => void;
  setMaxDistance: (value: StoreState['maxDistance']) => void;
  setDoorRate: (value: StoreState['doorRate']) => void;
}

export const useStore = create<StoreState>(() => ({
  name: '',
  passcode: '',
  autolock: 0,
  items: [{ name: '', metadata: '', remove: false }],
  groups: [{ name: '', grade: undefined }],
  maxDistance: 0,
  doorRate: 0,
  lockSound: '',
  unlockSound: '',
  auto: false,
  state: false,
  lockpick: false,
  hideUi: false,
  doors: false,
}));

export const defaultState = useStore.getState();

export const useSetters = create<StateSetters>((set: SetState<StateSetters>, get: GetState<StateSetters>) => ({
  sounds: [''],
  setSounds: (value) => set({ sounds: value }),
  setLockSound: (value) => useStore.setState({ lockSound: value }),
  setUnlockSound: (value) => useStore.setState({ unlockSound: value }),
  setName: (value) => useStore.setState({ name: value }),
  setPasscode: (value: StoreState['passcode']) => useStore.setState({ passcode: value }),
  setAutolock: (value: StoreState['autolock']) => useStore.setState({ autolock: value }),
  // @ts-ignore
  toggleCheckbox: (type) => useStore.setState((state) => ({ [type]: !state[type] })),
  setMaxDistance: (value: StoreState['maxDistance']) => useStore.setState(() => ({ maxDistance: value })),
  // Returns previous state, works like usual state setter except if you
  // want to set state straight away, you still have to call the function
  setItems: (fn) => useStore.setState(({ items: itemFields }) => ({ items: fn(itemFields) })),
  setGroups: (fn) =>
    useStore.setState(({ groups: groupFields }) => ({
      groups: fn(groupFields),
    })),
  setDoorRate: (value: StoreState['doorRate']) => useStore.setState({ doorRate: value }),
}));
