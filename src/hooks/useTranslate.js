import { useState, useEffect } from "react";
import { translateText } from "../utils/translate";

function useTranslate(text) {
  const [translated, setTranslated] = useState(text || "");
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!text) {
      setTranslated("");
      return;
    }

    let cancelled = false;
    setTranslated(text);
    setTranslating(true);

    translateText(text)
      .then((result) => {
        if (!cancelled) setTranslated(result);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setTranslating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [text]);

  return { translated, translating };
}

export default useTranslate;
