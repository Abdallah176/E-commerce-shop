import NewsLetterBox from "../components/Home/NewsLettetBox";
import AnimatedTitle from "../components/About/AnimatedTitle";
import AboutSection from "../components/About/AboutSection";
import VideoSection from "../components/About/VideoSection";
import TimelineSection from "../components/About/TimeLineSection";
import WhyChooseUs from "../components/About/WhyChooseUs";

export default function About() {
    return (
        <div className="px-4 sm:px-8 md:px-16">
            <AnimatedTitle />
            <AboutSection />
            <VideoSection />
            <TimelineSection />
            <WhyChooseUs />
            <NewsLetterBox />
        </div>
    );
}
