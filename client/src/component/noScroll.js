import { createGlobalStyle } from "styled-components";
import GangwonEduPowerExtraBoldA from "./font/font1.ttf";

export const GlobalStyle = createGlobalStyle`
#root,
html,
body {overflow: visible},
@font-face {
    font-family: 'GangwonEduPowerExtraBoldA';
    src: local("./font/font1.ttf"), local("./font/font1.ttf");
    font-weight: normal;
    font-style: normal;
    src: url(${GangwonEduPowerExtraBoldA}), format("truetype");
}
`;
