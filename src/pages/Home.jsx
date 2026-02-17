import Hero from '../sections/Hero';
import DailySpecials from '../sections/DailySpecials'; // Repurposed as "Taste the Culture"
import HowItWorks from '../sections/HowItWorks';
import Stats from '../sections/Stats';

const Home = () => {
  return (
    <>
      <Hero />

      {/* Taste the Culture Section - Light Background */}
      <section style={{ backgroundColor: '#FDFBF7' }}>
        <DailySpecials />
      </section>

      {/* How It Works - White/Background */}
      <HowItWorks />

      {/* Stats - Full Width Green */}
      <Stats />
    </>
  );
};

export default Home;
