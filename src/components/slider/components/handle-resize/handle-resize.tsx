import { FunctionComponent, LegacyRef, MouseEventHandler } from "react";
import { HandleResizeStyled } from "./handle-resize.styled";
import CdArrow from '../../../../images/svg/cd-arrows.svg'
interface HandleResizeProps {
    isDragStarted: boolean;
    onDragStart?: MouseEventHandler<HTMLSpanElement>;
    onDragStop?: MouseEventHandler<HTMLSpanElement>;
    elementRefference: LegacyRef<HTMLSpanElement>;
    positionLeft?: string | number;
}

export const HandleResize: FunctionComponent<HandleResizeProps> = ({ onDragStart, positionLeft, onDragStop, elementRefference, isDragStarted }) => {
    return (
        <HandleResizeStyled>
            <span
                id="icon-drag" 
                onMouseDown={onDragStart}
                style={{ left: positionLeft, background: ` #dc717d url('${CdArrow}') no-repeat center center` }}
                onMouseUp={onDragStop}
                ref={elementRefference}
                className={`cd-handle ${isDragStarted && 'draggable'}`}>
            </span>
        </HandleResizeStyled>
    )
}
HandleResize.displayName = 'HandleResize'