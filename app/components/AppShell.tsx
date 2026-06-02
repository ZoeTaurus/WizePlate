export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop-bg">
      <div className="phone-frame">
        {children}
      </div>
    </div>
  );
}
