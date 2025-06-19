import HomeHero from '@/components/HomeHero';
import SuccessCases from '@/components/SuccessCases';
import UpcomingTrips from '@/components/UpcomingTrips';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HomeHero />
      <SuccessCases />
      <UpcomingTrips />
      <Footer />
    </>
  );
}