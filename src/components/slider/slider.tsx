import { FunctionComponent, useContext, useEffect, useRef, useState } from "react"
import HandleResize from "./components/handle-resize";
import { SliderStyled } from './slider.styled'
import Image from '../image'
import { Box, Grid } from "@mui/material";
import Condition from "../condition";
import { FORCE_FORMAT } from "../../utils/constant";
import { ValueOfConditionProps } from "../condition/condition";
import LoadingIndicator from "../loading-indicator";
import { ImageFormatsComparisonContext } from "../../pages/image-formats-comparison/image-formats-comparison";

interface SliderProps {
    originUrl: ImageProperties
}
export interface ImageProperties {
    title: string;
    src: string;
}
export interface newConditionQualityImage {
    type: string;
    data: ValueOfConditionProps;
}

interface ImageLinks {
    left: string;
    right: string;
}
interface Sizes {
    minLeft: number;
    dragWidth: number;
    maxLeft: number;
    containerOffset: number;
    containerWidth: number;
    resizableImageWidth: number | string;
    xPosition: string | number;
}

export const Slider: FunctionComponent<SliderProps> = ({ originUrl }) => {
    const [isDragStarted, setDragStarted] = useState(false);
    const [loading, setLoading] = useState({
        left: true,
        right: true
    });
    const [sizes, setSizes] = useState<Partial<Sizes>>({});
    const dragElement = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const { previousOrigin } = useContext(ImageFormatsComparisonContext)
    const [imageUrl, setImageUrl] = useState<ImageLinks>({
        left: '',
        right: ''
    });
    useEffect(() => {
        setLoading({
            left: true,
            right: true
        })
    }, [originUrl])
    const [conditionQualityImage, setConditionQualityImage] = useState<any>({
        left: {
            force_format: FORCE_FORMAT[0],
            ci_info: true,
            q: null
        },
        right: {
            force_format: FORCE_FORMAT[0],
            ci_info: true,
            q: null
        }
    })

    useEffect(() => {
        handlePathImage(conditionQualityImage.left)
    }, [])

    const onDragStart = (e: { preventDefault: () => void; pageX: any; }) => {
        e.preventDefault();
        if (dragElement.current && container.current) {
            const dragWidth = dragElement.current.offsetWidth,
                xPosition = e.pageX,
                containerOffset = container.current.offsetLeft,
                containerWidth = container.current.offsetWidth,
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            setSizes({
                ...sizes,
                dragWidth,
                xPosition,
                containerOffset,
                containerWidth,
                minLeft,
                maxLeft
            });
            setDragStarted(true);
        }
    }

    const onDragStop = () => {
        setDragStarted(false);
    }
    const handlePathImage = (condtion: ValueOfConditionProps, type?: string) => {
        let path = '?'
        if (condtion.force_format) {
            path = path.concat(`force_format=${condtion.force_format}`)
        }
        if (condtion.ci_info) {
            path = path.concat(`&ci_info=1`)
        }
        if (condtion.q) {
            path = path.concat(`&q=${condtion.q}`)
        }
        if (type) {
            setImageUrl({
                ...imageUrl,
                [`${type}`]: path
            })
        } else {
            setImageUrl({
                left: path,
                right: path
            })
        }

    }

    const containerOnMouseMove = (e: { pageX: number; }) => {
        if (!isDragStarted || !e.pageX) {
            return
        };
        if (sizes.dragWidth && sizes.minLeft && sizes.maxLeft && sizes.containerOffset && sizes.containerWidth) {
            let leftValue = e.pageX - sizes.dragWidth / 2;

            if (leftValue < sizes.minLeft) {
                leftValue = sizes.minLeft;
            } else if (leftValue > sizes.maxLeft) {
                leftValue = sizes.maxLeft;
            }

            let widthValue = (leftValue + sizes.dragWidth / 2 - sizes.containerOffset) * 100 / sizes.containerWidth + '%';

            setSizes({
                ...sizes,
                resizableImageWidth: widthValue
            })
        }
    }
    const updateConditionQualityImage = (newConditionQualityImage: newConditionQualityImage) => {
        setConditionQualityImage({
            ...conditionQualityImage,
            [`${newConditionQualityImage.type}`]: newConditionQualityImage.data
        })
        handlePathImage(newConditionQualityImage.data, newConditionQualityImage.type)
    }
    const updateLoading = (type: string) => {
        if (type) {
            setLoading({
                ...loading,
                [`${type}`]: false
            })
        }

    }

    return (
        <SliderStyled>
            <Box className="cd-image-container" sx={{ padding: '1rem !important' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Condition valueCondition={conditionQualityImage.right} type="right" updateConditionQualityImage={updateConditionQualityImage} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Condition valueCondition={conditionQualityImage.left} type="left" updateConditionQualityImage={updateConditionQualityImage} />
                    </Grid>
                </Grid>
            </Box>
            <Box onMouseMove={containerOnMouseMove}
                onClick={onDragStop}
                className={`cd-image-container ${(!loading.left && !loading.right) && 'is-visible'}`}
                ref={container}>
                {(loading.left || loading.right) && (
                    <>
                        <LoadingIndicator />
                        {previousOrigin && (<Image src={previousOrigin.src} updateLoading={updateLoading} />)}
                    </>
                )}

                <Box className="image-origin">
                    <Image src={originUrl.src + imageUrl.left} type='left' updateLoading={updateLoading} />
                </Box>

                <Box style={{ width: sizes.resizableImageWidth }}
                    className={`cd-resize-img ${isDragStarted && 'resizable'}`}>
                    <Image src={originUrl.src + imageUrl.right} type='right' updateLoading={updateLoading} />
                </Box>

                <HandleResize
                    isDragStarted={isDragStarted}
                    onDragStart={onDragStart}
                    onDragStop={onDragStop}
                    positionLeft={sizes.resizableImageWidth}
                    elementRefference={dragElement} />
            </Box>
        </SliderStyled>
    )

}

Slider.displayName = 'Slider'
