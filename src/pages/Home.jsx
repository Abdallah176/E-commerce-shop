import Banner from "../components/Home/Banner/Banner";
import BestSeller from "../components/Home/BestSeller";
import Hero from "../components/Home/Hero";
import LatestCollection from "../components/Home/LatestCollection";
import NewsLetterBox from "../components/Home/NewsLettetBox";
import OurPolicy from "../components/Home/OurPolicy";

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
