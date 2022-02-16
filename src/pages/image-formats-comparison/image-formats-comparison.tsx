import { Autocomplete, Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import Slider from "../../components/slider";
import { ImageProperties } from "../../components/slider/slider";
import { FetchResponseProps } from "../../hocs/withFetch";
import { usePrevious } from "../../hooks/usePrevious";

interface ImageFormatsComparisonContextProps {
    previousOrigin: ImageProperties | undefined;
}

export const ImageFormatsComparisonContext = createContext<Partial<ImageFormatsComparisonContextProps>>({})

export const ImageFormatComparison: FunctionComponent<FetchResponseProps> = ({ data, isLoading, isError }) => {

    const [originUrl, setOriginUrl] = useState<ImageProperties>();
    useEffect(() => {
        setOriginUrl(data[0])
    }, [data])
    const previousOrigin = usePrevious(originUrl)

    const handleUpdateSelect = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
        setOriginUrl(newValue)
    }

    if (isLoading) return <><Typography align="center" gutterBottom component="div">Loading ...</Typography></>
    if (isError) return <><Typography align="center" gutterBottom component="div">Have something wrong</Typography></>

    return (
        <ImageFormatsComparisonContext.Provider value={{
            previousOrigin
        }}>
            <Typography variant="h4" align="center" gutterBottom component="div">Image formats comparison</Typography>
            {originUrl && (
                <>
                    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                        <Autocomplete
                            id="listImage"
                            freeSolo
                            value={originUrl}
                            options={data}
                            getOptionLabel={(option) => option.title}
                            onChange={handleUpdateSelect}
                            sx={{ width: 240, margin: '0 1rem' }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params}
                                size="small"
                                label="Select Image"
                            />}
                        />
                    </Box>
                    <Slider originUrl={originUrl} />
                </>
            )}
        </ImageFormatsComparisonContext.Provider>
    )
}

ImageFormatComparison.displayName = 'ImageFormatComparison'

