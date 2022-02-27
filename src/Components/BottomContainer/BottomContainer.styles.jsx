import styled from "styled-components";
// import {Redirect} from 'react-router-dom';
export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const Container = styled.div`
  border: 1px solid blue;
  border-radius: 15px;
  padding: 15px;
  width: 50%;
  display: none;
  margin-top: 1%;
  height: 50px;
  @media (max-width: 724px) {
    margin-top: 5px;
  }
  @media (max-width: 644px) {
    width: 30%;
  }
  @media (max-width: 644px) {
    width: 30%;
  }
  @media (max-width: 409px) {
    font-size: 0.8rem;
  }
  @media (max-width: 328px) {
    font-size: 0.7rem;
  }
`;

export const LeftButton = styled.button`
  margin-top: 5%;
  height: 40px;
  padding: 5px;
  margin-left: 1%;
  padding-right: 40px;
  padding-left: 40px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-color: #311b92;
  color: white;
  font-size: 1.2rem;
  @media (max-width: 644px) {
    right: 70%;
    padding: 3px;
    padding-right: 30px;
    padding-left: 30px;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export const RightButton = styled.button`
  margin-top: 5%;
  height: 40px;
  margin-right: 1%;
  padding: 5px;
  padding-right: 40px;
  padding-left: 40px;
  outline: none;
  border: none;
  border-radius: 25px;
  background-color: #311b92;
  color: white;
  font-size: 1.2rem;
  @media (max-width: 644px) {
    left: 70%;
    padding: 3px;
    padding-right: 30px;
    padding-left: 30px;
  }
  &:hover {
    opacity: 0.9;
  }
`;
