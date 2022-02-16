import { FunctionComponent } from "react";
import { ImageStyled } from "./image.styled";

interface ImageProps {
    src: string;
    updateLoading: Function;
    type?: string
}

export const Image: FunctionComponent<ImageProps> = ({ src, updateLoading, type }) => {
    const imageUrl = `https://doc.cloudimg.io/${src}`;
    const onLoadingImage = () => {
        updateLoading(type)
    }
    return (
        <>
            <ImageStyled>
                <img className="comparing-image" src={imageUrl} alt='' onLoad={onLoadingImage}/>
            </ImageStyled>

        </>

    )
}

Image.displayName = 'Image'