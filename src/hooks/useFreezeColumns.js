import { useState } from "react";

export function useFreezeColumns() {
  const [freezeUpto, setFreezeUpto] = useState(null);

  function getCellStyle(index) {
    if (freezeUpto === null || index > freezeUpto) return {};

    return {
      position: "sticky",
      left: `${index * 140}px`,
      background: "#fff",
      zIndex: 3,
      boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
    };
  }

  return { freezeUpto, setFreezeUpto, getCellStyle };
}
