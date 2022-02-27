import styled from 'styled-components';

export const BorderDiv = styled.div`
    border: 1px solid #311b92;
    padding: 9%;
    padding-top: 7%;
    padding-bottom: 7%;
    border-radius: 20px;
    margin: 5%;
    margin-bottom: 10%
    background-color: white;
    color: #311b92;
    font-weight: 600;
    width: 178px;
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
        padding: auto;
        transform: scale(0.9);
        position: relative;
        top: 40px;
    }
    @media (max-width: 359px){
        width: 173px;
        display: flex;
        flex-direction: column;
        transform: scale(0.7);
    }
    @media (min-height: 900px){
        transform: scale(1.2)
    } 
`;

export const DigitalContainerForComponent = styled.div`
    border: 1px solid #311b92;
    position: relative;
    left: 8px;
    border-radius: 20px;
    -color: #311b92;
    background: linear-gradient(to right,  #311b92 45%,white 45%);
    color: white;
    width: 178px;
    display: flex;
    justify-content: space-around;
    padding: 14%;
    padding-top: 7%;
    padding-bottom: 7%;
    margin-top:18px;
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
    justify-content: center;
    align-items: center;
    position: relative;
    right: 8px;

    @media (max-width: 776px){
        right: 0;
    }
`;

export const Big = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;