import { Switch, Box, FormGroup, FormControlLabel, FormControl, Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { FunctionComponent } from "react";
import { FORCE_FORMAT, QUALITY_FACTOR } from '../../utils/constant'

export interface ValueOfConditionProps {
    force_format: string;
    ci_info: boolean;
    q?: number | string;
}
interface ConditionProps {
    valueCondition: ValueOfConditionProps;
    updateConditionQualityImage: Function;
    type: string;
}

export const Condition: FunctionComponent<ConditionProps> = ({ valueCondition, updateConditionQualityImage, type }) => {

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateConditionQualityImage({
            type,
            data: {
                ...valueCondition,
                ci_info: event.target.checked,
            }
        })
    }
    const handleUpdateSelect = (event: React.SyntheticEvent<Element, Event>, newValue: number | string | null) => {
        if (newValue) {
            if (parseInt(newValue.toString()) > 0) {
                updateConditionQualityImage({
                    type,
                    data: {
                        ...valueCondition,
                        q: newValue
                    }
                })
            } else {
                updateConditionQualityImage({
                    type,
                    data: {
                        ...valueCondition,
                        force_format: newValue
                    }
                })
            }
        }

    }
    return (
        <Box component={'div'} sx={{ display: 'flex' }}>
            <Autocomplete
                id="forceFormat"
                value={valueCondition.force_format}
                freeSolo
                size="small"
                sx={{ width: 150 }}
                onChange={handleUpdateSelect}
                options={FORCE_FORMAT}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params}
                    size="small"
                    label="Force format" />}
            />
            <Autocomplete
                id="qualityFactor"
                freeSolo
                value={valueCondition.q}
                options={QUALITY_FACTOR}
                sx={{ width: 150, margin: '0 1rem' }}
                onChange={handleUpdateSelect}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params}
                    size="small"
                    label="Quality factor" />}
            />
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel control={<Switch checked={valueCondition.ci_info} onChange={handleSwitchChange} />} label="Ci info" />
                </FormGroup>
            </FormControl>
        </Box >
    )
}

Condition.displayName = 'Condition'
