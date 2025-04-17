import Banner from "../components/Banner/Banner";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLettetBox";
import OurPolicy from "../components/OurPolicy";

export default function Home() {
    return (
        <div>
            <Hero />
            <Banner />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
        </div>
    )
}
