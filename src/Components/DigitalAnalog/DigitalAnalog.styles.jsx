import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @media (min-height: 950px){
        top: 200px;
    } 

    @media(max-height: 670px){
        @media(max-width: 380px){
            bottom: 100px;
        }
    }

    @media (max-width: 464px){
        @media (max-height: 600px){
            bottom: 120px;
        }
    }
`;

export const InnerDiv = styled.div`
    display:flex;
    width: 60%;
    height: 300px;
    justify-content: space-around;
    transform: scale(1.25);
    position: relative;
    left: 0;
    @media (max-width: 400px){
        width: 100%;
        left: 8.5%;
    }
    @media (max-width: 320px){
        left: 0;
    }
    @media (max-height: 670px){
        @media (max-height: 400px){
            transform: scale(1.1);
            bottom: 50px;
        }  
    }
`;

export const Container = styled.div`
    display: flex;
    width: auto;
    flex-direction: column;
    justify-content: center;
    transform: scale(1.2);
    @media (max-width: 997px){
        transform: scale(0.9)
    }
    @media (max-width: 733px){
        transform: scale(1);
    }
    @media (max-width: 400px){
        width: 156px;
    }
    @media (max-width: 359px){
        width: 100px;
    }
    @media (min-height: 900px){
        padding: 70px;
        padding-top: 0;
    } 
`;

export const DigitalContainerForComponent = styled.div`
    position: relative;
    border: 1px solid #311b92;
    left: 8px;
    border-radius: 20px;
    background: linear-gradient(to right,  #311b92 40%,white 40%);
    color: white;
    width: 178px;
    display: flex;
    justify-content: space-around;
    padding: 14%;
    padding-top: 7%;
    padding-bottom: 7%;
    margin-top: 18px;
    bottom: 10px;    
    box-sizing: border-box;
    @media (max-width: 776px){
        padding: 12px;
    }
    @media (max-width: 666px){
        padding: 7px;
        width: 173px;
        transform: scale(0.95);
    }
    @media (max-width: 464px){
        transform: scale(0.9);
        position: relative;
        top: 32px;
    }
    @media (max-width: 359px){
        width: 173px;

        transform: scale(0.7);
    }
    @media (min-height: 900px){
        transform: scale(1.2)
    } 
    
`;

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    right: 8px;

    @media (max-width: 776px){
        right: 0;
    }
`;




