import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useNavigation } from "./hooks/useNavigation";
import { GlobalSearch } from "./components/GlobalSearch";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { globalSearchOpen, closeGlobalSearch, handleKeyboardShortcuts } =
    useNavigation();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcuts);
    return () =>
      document.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Search */}
      <GlobalSearch isOpen={globalSearchOpen} onClose={closeGlobalSearch} />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
