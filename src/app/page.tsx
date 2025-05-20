import { getHomePage, getServices, getSiteConfig } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ContactSection from "@/components/sections/ContactSection";

export default async function Home() {
  // Strapiからデータをフェッチする
  const homeData = await getHomePage();
  console.log('Debug - homeData:', JSON.stringify(homeData, null, 2));
  const services = await getServices();
  const siteConfig = await getSiteConfig();

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <Header siteConfig={siteConfig} />

      {/* TOP画像セクション */}
      <HeroSection homeData={homeData} siteConfig={siteConfig} />

      {/* About セクション */}
      <AboutSection homeData={homeData} />

      {/* Services セクション */}
      <ServiceSection homeData={homeData} services={services} />

      {/* Contact セクション */}
      <ContactSection homeData={homeData} />

      {/* フッター */}
      <Footer siteConfig={siteConfig} />
    </div>
  );
}
