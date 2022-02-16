import styled from 'styled-components';

export const SliderStyled = styled.div`
.cd-image-container {
	position: relative;
	max-width: 80vw;
	margin: 0em auto;
}
.cd-resize-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 100%;
	overflow: hidden;
	transform: translateZ(0);
	backface-visibility: hidden;
	border-right: 1px dotted white;
	img {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		height: 100%;
		width: auto;
		max-width: none;
	}
	.cd-image-label {
		right: auto;
		left: 0;
	}
}
.image-origin {
	width: 0;
}
.is-visible {
	.image-origin {
		width: 100%;
	}
	.cd-resize-img { 
		width: 50%;
	}
}
.cd-handle {
	opacity: 1;
	transform: translate3d(0, 0, 0) scale(1);
	transition: transform 0.3s 0.7s, opacity 0s 0.7s;
}

`;
