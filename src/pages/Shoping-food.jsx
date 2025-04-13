import Banner from "../layouts/Banner"
import { Container } from "react-bootstrap"
import Footer from "../layouts/Footer"
import NavigationBar from "../layouts/NavbarHome"
import SlideBar from "../features/home/SlideBar"
import NowShowingSlide from "../features/home/Now-showing"
import SpecialCombo from "../features/home/SepcialCombo"
import ComingSoon from "../features/home/CommingSoon"
import HighlightedNews from "../features/home/Hotnew"


const ShoppingFood = () => {
    return(
        <>
            <Banner />
            <NavigationBar />
            <Container >
                {/* content */}
                <SpecialCombo />
                <HighlightedNews />
            </Container>
            <Footer />
        </>
    )
}

export default ShoppingFood