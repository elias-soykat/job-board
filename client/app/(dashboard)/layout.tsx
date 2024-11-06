export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-2 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
