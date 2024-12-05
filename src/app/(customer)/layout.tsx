import Navbar from "@/components/Navbar";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
}
