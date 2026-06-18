/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <div className="min-h-screen bg-brand-950 text-text-main font-sans flex flex-col overflow-hidden relative">
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </ThemeProvider>
  );
}
