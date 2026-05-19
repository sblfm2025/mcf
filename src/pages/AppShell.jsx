import { NavLink, Outlet } from "react-router-dom";
import { Eye, MonitorCog, ScrollText } from "lucide-react";

export default function AppShell() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <img src="/aset/logo/event/logo-mandar-culture-festival.png" alt="Mandar Culture Festival" />
          <strong>MCF Overlay</strong>
        </div>
        <nav>
          <NavLink to="/control">
            <MonitorCog size={18} />
            Control
          </NavLink>
          <NavLink to="/preview">
            <Eye size={18} />
            Preview
          </NavLink>
          <NavLink to="/docs">
            <ScrollText size={18} />
            Docs
          </NavLink>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
}
