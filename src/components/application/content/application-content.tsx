import ApplicationSidebar from "@/components/application/sidebar/application-sidebar";

export function ApplicationContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className={"bg-gray-200 dark:bg-gray-900 h-[calc(100vh-5rem)]"}>
      <div className={"container w-full h-full max-w-6xl flex px-6 py-6"}>
        <ApplicationSidebar />

        <div className={"flex-1 ml-6"}>{children}</div>
      </div>
    </section>
  );
}
