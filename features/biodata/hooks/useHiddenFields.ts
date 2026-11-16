import { useCallback, useState } from "react";

export function useHiddenFields(initial: string[] = []) {
  const [hidden, setHidden] = useState<Set<string>>(() => new Set(initial));

  const toggle = useCallback((key: string) => {
    setHidden((prev) => {
      const next = new Set(prev); // never mutate the old Set; React needs a new one
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const reset = useCallback(() => setHidden(new Set()), []);

  return { hidden, toggle, reset };
}