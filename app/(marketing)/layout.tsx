import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/** Public site shell: header + footer around every marketing page. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
