
import { BannerCarousel } from "./Components/BannerCarousel";
import { Carousel } from "./Components/Carousel";
// import { ExploreTopBooks } from "./Components/ExploreTopBooks";
import { Heros } from "./Components/Heros";
import { LibraryServices } from "./Components/LibraryServices";

export const HomePage = () => {

    return (
        <>
        {/* <ExploreTopBooks/> */}
            <BannerCarousel/>
        <div className="container">
            <Carousel/>
            <Heros/>
            {/* <LibraryServices/> */}
        </div>
        </>
    );
}