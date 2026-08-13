import NavBar from "../components/NavBar"
import { useQuery } from "@tanstack/react-query"
import fetchFn from "../fetchFn"
import { useParams } from "react-router-dom"
import TiltedCard from "../components/TiltedCard"
import { Button } from "../components/ui/button"
import { BookmarkIcon } from "lucide-react"
import { Heart } from "lucide-react"
import { useState } from "react"

const DetailsPage = () => {

    const { bookId } = useParams()

    const { data: detailsData, loading, error } = useQuery({
        queryKey: ["bookDetails"],
        queryFn: () => fetchFn(`https://openlibrary.org/works/${bookId}.json`)
    })

    const [toggleRead, setToggleRead] = useState(false)
    const [fillRead, setFillRead] = useState("none")

    const [toggleFavorite, setToggleFavorite] = useState(false)
    const [fillFavorite, setFillFavorite] = useState("none")

    return (
        <div>
            <NavBar/>
            <section className="m-10 flex">
                <div className="m-4">
                    <TiltedCard
                        imageSrc={`https://covers.openlibrary.org/b/id/${detailsData?.covers[0]}-L.jpg`}
                        altText={detailsData?.title}
                        captionText={detailsData?.title}
                        containerHeight="500px"
                        containerWidth="350px"
                        imageHeight="500px"
                        imageWidth="350px"
                        rotateAmplitude={7}
                        scaleOnHover={1.03}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                    />
                </div>
                <div className="flex flex-col gap-2 m-10">
                    <Button variant="secondary" size="lg"
                        onClick={() => {
                            if (toggleRead) {
                                setFillRead("none");
                                setToggleRead(false)
                            } else {
                                setFillRead("fill");
                                setToggleRead(true)
                            }
                        }}>
                        <BookmarkIcon fill={fillRead} />
                        Want to Read
                    </Button>
                    <Button variant="secondary" size="lg"
                        onClick={() => {
                            if (toggleFavorite) {
                                setFillFavorite("none");
                                setToggleFavorite(false)
                            } else {
                                setFillFavorite("fill");
                                setToggleFavorite(true)
                            }
                        }}>
                        <Heart fill={fillFavorite}/>
                        Add to Favorite
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default DetailsPage