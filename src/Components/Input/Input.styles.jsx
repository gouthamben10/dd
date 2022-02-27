import styled from 'styled-components';


export const MainInputComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    @media (max-width: 411px) {
        @media (max-height: 823px) {
            transform: scale(0.8);
        }
    }
    @media (min-height: 800px){
        transform: scale(1);
        top: 150px;
    } 
    @media (max-height: 670px){
        @media (max-height: 412px){
            transform: scale(0.7);
            bottom: 50px;
        }  
    }
`;