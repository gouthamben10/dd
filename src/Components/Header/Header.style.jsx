import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.div`
  text-align: center;
  width: 100vw;
  margin-bottom: 70px;
  padding-top: 12px;
`;

export const HeaderOptions = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-left: 2%;
  @media (max-width: 881px) {
    transform: scale(0.85);
    top: -8px;
  }
  @media (max-width: 749px) {
    transform: scale(0.8);
    top: -15px;
  }
  @media (max-width: 620px) {
    transform: scale(0.75);
    top: -23px;
  }

  @media (max-width: 550px) {
    transform: scale(0.6);
    top: -34px;
  }
  @media (max-width: 460px) {
    transform: scale(0.5);
  }
  @media (max-width: 450px) {
    top: -10px;
  }
  @media (max-width: 407px) {
    transform: scale(0.47);
    margin-left: 4%;
    top: -15px;
  }
  @media (max-width: 360px) {
    transform: scale(0.42);
    top: -25px;
  }
  @media (max-width: 320px) {
    transform: scale(0.39);
  }
`;

export const HeaderLinksContainer = styled(NavLink)`
  margin-right: 4px;
  border: 2px solid #311b92;
  border-radius: 15px;
  text-decoration: none;
  padding: 45px 28px 20px 28px;
  position: relative;
  top: -48px;
  @media (max-width: 520px) {
    top: -55px;
  }
  @media (max-width: 450px) {
    top: -100px;
  }
`;

export const HeaderWifiImage = styled.img`
  width: 54px;
  position: relative;
  top: -15px;
  padding: 0px 28px 28px 28px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 520px) {
    top: -28px;
    width: 68px;
  }
  @media (max-width: 450px) {
    top: -78px;
  }
  @media (max-width: 410px) {
    top: -80px;
  }
`;

export const HeaderBackButton = styled.img`
  display: inline-block;
  width: 50px;
  height: 50px;
  position: fixed;
  left: 0px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    background: red;
  }
  @media (max-width: 412px) {
    width: 60px;
  }
`;

export const HeaderHelp = styled.img`
  display: inline-block;
  width: 70px;
  position: absolute;
  right: 0;
  top: 0.7rem;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 412px) {
    width: 55px;
  }
`;

export const FlowchartHeaderBluetoothButton = styled.img`
  display: inline-block;
  box-sizing: border-box;
  width: 60px;
  bottom: 5px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const OptionSettings = styled.div`
  display: inline-block;
  width: 35%;
`;

export const OptionImage = styled.img`
  width: 60px;
`;
