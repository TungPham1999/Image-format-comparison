import styled from 'styled-components';

export const HandleResizeStyled = styled.span`
.cd-handle {
	position: absolute;
	height: 44px;
	width: 44px;
	left: 50%;
	top: 50%;
	margin-left: -22px;
	margin-top: -22px;
	border-radius: 50%;
	cursor: move;
	box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
	opacity: 0;
	transform: translate3d(0, 0, 0) scale(0);
}
.cd-handle.draggable {
	background-color: #445b7c;
}
`;
