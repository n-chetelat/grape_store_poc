import MerchantNavbar from "@/components/MerchantNavbar";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MerchantNavbar />
      <div className="p-4">{children}</div>
    </div>
  );
}
