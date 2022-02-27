import React from 'react';
import {Main, InnerDiv, Container, Left, DigitalContainerForComponent} from './DigitalAnalog.styles';
import BottomContainer from '../BottomContainer/BottomContainer';
import DigitalContainer from '../DigitalContainer/DigitalContainer';
import './DigitalAnalog.styles.scss';
import useLocalStorage from '../LocalStorage/LocalStorage';

function DigitalAnalog() {
    const A1DIGI = JSON.parse(sessionStorage.getItem('A1'));
    const A2DIGI = JSON.parse(sessionStorage.getItem('A2'));
    const B1DIGI = JSON.parse(sessionStorage.getItem('B1'));
    const B2DIGI = JSON.parse(sessionStorage.getItem('B2'));
    const C1DIGI = JSON.parse(sessionStorage.getItem('C1'));
    const C2DIGI = JSON.parse(sessionStorage.getItem('C2'));
    const D1DIGI = JSON.parse(sessionStorage.getItem('D1'));
    const D2DIGI = JSON.parse(sessionStorage.getItem('D2'));
    const SPI = JSON.parse(sessionStorage.getItem('spi'));
    const I2C = JSON.parse(sessionStorage.getItem('i2c'));
    const UART = JSON.parse(sessionStorage.getItem('uart'));

    const [a1Digi, setA1Digi] = useLocalStorage('A1DIGI', false);
    const [b1Digi, setB1Digi] = useLocalStorage('B1DIGI', false);
    const [c1Digi, setC1Digi] = useLocalStorage('C1DIGI', false);
    const [d1Digi, setD1Digi] = useLocalStorage('D1DIGI', false);
    const [a2Digi, setA2Digi] = useLocalStorage('A2DIGI', false);
    const [b2Digi, setB2Digi] = useLocalStorage('B2DIGI', false);
    const [c2Digi, setC2Digi] = useLocalStorage('C2DIGI', false);
    const [d2Digi, setD2Digi] = useLocalStorage('D2DIGI', false);

    const [pwmA1, setPwmA1] = useLocalStorage('PWMA1', (JSON.parse(sessionStorage.getItem('a1-I/O')) && JSON.parse(sessionStorage.getItem('A1'))));
    const [pwmD1, setPwmD1] = useLocalStorage('PWMD1', (JSON.parse(sessionStorage.getItem('d1-I/O')) && JSON.parse(sessionStorage.getItem('D1'))));
   
   
    const toggleA1 = () => {
        if(JSON.parse(sessionStorage.getItem('a1-I/O')) === true){
            setPwmA1(!pwmA1);
        }
        setA1Digi(!a1Digi);
    }
    const toggleA2 = () => {
        setA2Digi(!a2Digi);
    }
    const toggleB1 = () => {
        setB1Digi(!b1Digi);
    }
    const toggleB2 = () => {
        setB2Digi(!b2Digi);
    }
    const toggleC1 = () => {
        setC1Digi(!c1Digi);
    }
    const toggleC2 = () => {
        setC2Digi(!c2Digi);
    }

    const toggleD1 = () => {
        if(JSON.parse(sessionStorage.getItem('d1-I/O')) === true){
            setPwmD1(!pwmD1);
        }
        setD1Digi(!d1Digi);
    }
    const toggleD2 = () => {
        setD2Digi(!d2Digi);
    }
    const togglePWMA1 = () => {
        if(a1Digi === true){
            setPwmA1(!pwmA1);
        }
    }
    // const togglePWMD1 = () => {
    //     setPwmD1(!pwmD1);
    // }
    
    return (<>
        <Main>
            <InnerDiv>
                <Container>
                    <DigitalContainer text="A1" text1="A2"
                    changeToggle1={toggleA1}
                    checked={a1Digi}
                    checked1={a2Digi}
                    changeToggle2={toggleA2}
                    disable1={!A1DIGI || false} 
                    disable2={!A2DIGI|| false}
                    togglePWM1={togglePWMA1}
                    checkedPWM1={JSON.parse(sessionStorage.getItem('a1-I/O')) ? pwmA1 : null}
                    isTrue={true}
                        />
                        
                    <DigitalContainer text="B1" text1="B2"
                    changeToggle1={toggleB1}
                    checked={b1Digi}
                    checked1={b2Digi}
                    changeToggle2={toggleB2}
                    disable1={!B1DIGI} 
                    disable2={!B2DIGI}
                    uart={UART}
                        />
                </Container>
                <Container>
                    {SPI? (<DigitalContainerForComponent>
                <Left>
                    <div className="left-spi">
                        <label>SPI</label>
                        <input type="checkbox" className="circle spicircle" 
                        onChange={() => true}
                        checked={JSON.parse(sessionStorage.getItem('spi')) || false} />
                    </div>
                    <div className="right-spi">
                        <p>C1 &rarr; MOSI</p>
                        <p>C2 &rarr; CLK</p>
                        <p>D1 &rarr; MISO</p>
                        <p className="left-para">D2 &rarr; CS</p>
                    </div>
                </Left>
            </DigitalContainerForComponent>): 
                    <>
                    <DigitalContainer text="C1" text1="C2"
                    disable1={!C1DIGI} 
                    disable2={!C2DIGI}
                    changeToggle1={toggleC1}
                    checked={c1Digi}
                    checked1={c2Digi}
                    changeToggle2={toggleC2} 
                    />
                        
                    {I2C ? <DigitalContainerForComponent className="lower-digital">
                <Left>
                    <label>I2C</label>
                    <input type="checkbox" className="circle" 
                    onChange={() => true}
                    checked={JSON.parse(sessionStorage.getItem('i2c')) || false} />
                </Left>
                <div className="right-ic2">
                    <p>D1 &rarr; SCL</p>
                    <p className="left-para">D2 &rarr; SDA</p>
                </div>
            </DigitalContainerForComponent>: <DigitalContainer text="D1" text1="D2" 
                    disable1={!D1DIGI} 
                    disable2={!D2DIGI}
                    changeToggle1={toggleD1}
                    checked={d1Digi}
                    checked1={d2Digi}
                    changeToggle2={toggleD2}
                    togglePWM1={() => true}
                    isTrue={true}
                    checkedPWM1={JSON.parse(sessionStorage.getItem('d1-I/O')) ? pwmD1 : null}
                    />
                            }
                    </>}
                    
                </Container>
                <div></div>
            </InnerDiv>
        </Main>
        <br/>
        <BottomContainer to="/flowchart" prev="/input-output"/>
        </>
    );
}

export default DigitalAnalog;
