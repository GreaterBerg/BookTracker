import TiltedCard from "./TiltedCard"

interface BookCard {
    name: string,
    author: string | undefined,
    cover: string | undefined
}

const BookCard = ({ name, author, cover }: BookCard) => {
    return (
        <div className="m-4">
            <TiltedCard
                imageSrc={cover}
                altText={`${author} - ${name}`}
                captionText={`${author} - ${name}`}
                containerHeight="350px"
                containerWidth="250px"
                imageHeight="350px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                    <p className="bg-[var(--gray)] rounded p-2">
                    {`${author} - ${name}`}
                    </p>
                }
            />
        </div>
    )
}

export default BookCard