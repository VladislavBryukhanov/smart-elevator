import {createGlobalStyle, styled} from 'styled-components';

interface IAbsoluteCenter {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const AppGlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Nunito', sans-serif;
  }
`;

export const AbsoluteCenter = styled.div<IAbsoluteCenter>`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  ${props => props.top && `top: ${props.top}`};
  ${props => props.left && `left: ${props.left}`};
  ${props => props.right && `right: ${props.right}`};
  ${props => props.bottom && `bottom: ${props.bottom}`};
`;
