import { AuthGuard } from "@/components/layout/auth-guard";
import { NavigationApp } from "@/components/layout/navigation-app";

const Layout = ({
  children,
  noPadding,
  fullScreen,
  fullScreenOnMobile,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
  fullScreen?: boolean;
  fullScreenOnMobile?: boolean;
}) => {
  return (
    <AuthGuard>
      <div className="flex h-screen flex-col md:flex-row">
        <div className={`${fullScreenOnMobile ? "hidden md:block" : ""}`}>
          {!fullScreen && <NavigationApp />}
        </div>
        <main
          className={`bg-slate-900 ${
            noPadding ? "" : "px-3 md:px-12 md:py-5"
          } relative h-full w-full overflow-y-auto`}
        >
          {!fullScreenOnMobile && <div className="pt-3 md:pt-0" />}
          {children}
        </main>
      </div>
    </AuthGuard>
  );
};

export { Layout };
