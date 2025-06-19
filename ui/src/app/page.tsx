import HomeHero from '@/components/HomeHero';
import SuccessCases from '@/components/SuccessCases';
import UpcomingTrips from '@/components/UpcomingTrips';
import Footer from '@/components/Footer';
import DailyLuckyNumber from '@/components/DailyLuckyNumber';
import OnlineMerit from '@/components/OnlineMerit';

export default function Home() {
  return (
    <>
      <HomeHero />
      <DailyLuckyNumber />
      <OnlineMerit />
      <SuccessCases />
      <UpcomingTrips />
      <Footer />
    </>
  );
}