import styled from "styled-components";

export const Card1a = styled.div`
  height: 100%;
  width: 100%;
  background-image: url("Assets/Group_3133.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: ${(props) => (props.title === "Robot Mode" ? "0.5" : "1")};

  & {
    color: ${(props) => (props.title === "Robot Mode" ? "black" : "#551A8B")};
  }

  &:hover {
    border: 1px solid orange;
    border-radius: 10px;
    height: 105%;
    width: 110%;
    position: relative;
    left: -10px;
  }
`;
