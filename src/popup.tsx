import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Options } from "./options";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
