import NavBar from "../components/NavBar"
import { useQuery } from "@tanstack/react-query"
import fetchFn from "../fetchFn"
import { useParams } from "react-router-dom"
import TiltedCard from "../components/TiltedCard"
import { Button } from "../components/ui/button"
import { BookmarkIcon } from "lucide-react"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const DetailsPage = () => {

    
    const [toggleRead, setToggleRead] = useState(false)
    const [fillRead, setFillRead] = useState("none")
    const [toggleFavorite, setToggleFavorite] = useState(false)
    const [fillFavorite, setFillFavorite] = useState("none")

    const { bookId } = useParams()

    const { data: detailsData, loading, error } = useQuery({
        queryKey: ["bookDetails"],
        queryFn: () => fetchFn(`https://openlibrary.org/works/${bookId}.json`)
    })

    useEffect(() => {
        const checkWantToRead = async () => {
            const { data, error } = await supabase
            .from("Want To Read")
            .select("wanted")
            .eq("book_id", bookId)
            .maybeSingle()

            if (error) {
                console.log("error at checkin read list")
            } else {
                console.log("book in readlist?", data?.wanted)
                if (data?.wanted) {
                    setToggleRead(true)
                    setFillRead("fill")
                } else {
                    setToggleRead(false)
                    setFillRead("none")
                }
            }

        }


        const checkFavorite = async () => {
            const { data, error } = await supabase
            .from("Favorite Books")
            .select("favorite")
            .eq("book_id", bookId)
            .maybeSingle()

            if (error) {
                console.log("error at checkin favorite")
            } else {
                console.log("book in favorites?", data?.favorite)
                if (data?.favorite) {
                    setToggleFavorite(true)
                    setFillFavorite("fill")
                } else {
                    setToggleFavorite(false)
                    setFillFavorite("none")
                }
            }

        }

        checkWantToRead()
        checkFavorite()

    }, [bookId])

    const handleAddWantToRead = async () => {
        if (!detailsData) return;
        
        const dataWantToRead = {
            book_name: detailsData?.title,
            book_id: bookId,
            wanted: true
        }

        const { data, error } = await supabase
        .from("Want To Read")
        .insert([dataWantToRead])
        .select()
        .single()

        if (error) {
            console.log("error at adding in read list")
        } else {
            console.log(`added to read list!`, data)
        }
    }

    const handleDeleteWantToRead = async () => {
        if (!detailsData) return;

        const { error } = await supabase
        .from("Want To Read")
        .delete()
        .eq("book_id", bookId)

        if (error) {
            console.log("error at deleting from read list")
        } else {
            console.log(`deleted from read list!`)
        }
    }

    
    const handleAddFavorite = async () => {
        if (!detailsData) return;
        
        const dataFavorite = {
            book_name: detailsData?.title,
            book_id: bookId,
            favorite: true
        }

        const { data, error } = await supabase
        .from("Favorite Books")
        .insert([dataFavorite])
        .select()
        .single()

        if (error) {
            console.log("error at adding in favorite")
        } else {
            console.log(`added to favorite!`, data)
        }
    }

    const handleDeleteFavorite = async () => {
        if (!detailsData) return;

        const { error } = await supabase
        .from("Favorite Books")
        .delete()
        .eq("book_id", bookId)

        if (error) {
            console.log("error at deleting from favorite")
        } else {
            console.log(`deleted from favorite!`)
        }
    }


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
                            if (!toggleRead) {
                                setToggleRead(true)
                                handleAddWantToRead()
                                setFillRead("fill");
                            } else {
                                setToggleRead(false)
                                handleDeleteWantToRead()
                                setFillRead("none");
                            }
                        }}>
                        <BookmarkIcon fill={fillRead} />
                        Want to Read
                    </Button>
                    <Button variant="secondary" size="lg"
                        onClick={() => {
                            if (!toggleFavorite) {
                                setFillFavorite("fill");
                                handleAddFavorite()
                                setToggleFavorite(true)
                            } else {
                                setFillFavorite("none");
                                handleDeleteFavorite()
                                setToggleFavorite(false)
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