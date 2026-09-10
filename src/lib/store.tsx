import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motionValue, type MotionValue } from "framer-motion";

/** Shared cursor motion values (updated by Cursor, read by StatusBar). */
export const mx: MotionValue<number> = motionValue(0);
export const my: MotionValue<number> = motionValue(0);

export interface ToastMsg {
  id: number;
  text: string;
}

interface AppCtx {
  booted: boolean;
  setBooted: (v: boolean) => void;
  section: string;
  setSection: (s: string) => void;
  gridOn: boolean;
  toggleGrid: () => void;
  dynOn: boolean;
  toggleDyn: () => void;
  orthoOn: boolean;
  toggleOrtho: () => void;
  toast: ToastMsg | null;
  showToast: (t: string) => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState("home");
  const [gridOn, setGridOn] = useState(true);
  const [dynOn, setDynOn] = useState(true);
  const [orthoOn, setOrthoOn] = useState(false);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), text });
    timer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const value = useMemo<AppCtx>(
    () => ({
      booted,
      setBooted,
      section,
      setSection,
      gridOn,
      toggleGrid: () => setGridOn((v) => !v),
      dynOn,
      toggleDyn: () => setDynOn((v) => !v),
      orthoOn,
      toggleOrtho: () => setOrthoOn((v) => !v),
      toast,
      showToast,
    }),
    [booted, section, gridOn, dynOn, orthoOn, toast, showToast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
