const ActionsTopbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between border-b border-slate-100 bg-slate-900 px-3 py-2 shadow-sm shadow-slate-500">
      {children}
    </div>
  );
};

export { ActionsTopbar };
