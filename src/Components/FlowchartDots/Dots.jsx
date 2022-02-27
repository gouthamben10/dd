import React, {useState} from 'react';
import Draggable from 'react-draggable';
// import LineTo from 'react-lineto';
import {useLocalStorage} from '../LocalStorage/LocalStorage';

const Dots = (props) => {
    const [click, setClick] = useLocalStorage('click',0);
    const [val, setVal] = useLocalStorage('val',{})
    const [clas, setClas] = useState(null);
    const [secondClas, setSecondClas] = useState(null);   
     
    const elementPosition = (el) => {
        if (!el) return;
        const pos = {x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y};
        val[el.className] = pos;
        setVal(val);
    }

    // const valueChecker = () => {
        // for (const key in val){
        //     const newArr = [];
        //     newArr.concat(val[key]);
        //     setArr([...newArr])
        // }
    // }

    // valueChecker();
    
    const handleClick = (e) => {
        if(click === 0){
            setClick(click + 1);
            setClas(e.target.className);
            console.log(click, clas,secondClas, 'first')
        }
        if(click === 1){
            setClick(click + 1);
            setSecondClas(e.target.className);
            console.log(click, clas, secondClas, 'second')
        }
        if(click === 2){
            setClick(1);
            setClas(e.target.className);
            console.log(click,clas,secondClas, 'third')
        }
    }

    return (<>
     {/* <LineTo from={click===1 ? JSON.stringify(clas) : JSON.stringify(clas) } to={click===2 ? JSON.stringify(secondClas) : JSON.stringify(secondClas) } /> */}
     {/* <LineTo from="first-bottom-dot" to="third-1603713205288--top-dot" /> */}
     {/* <Line x0={50} y0={0} x1={10} y1={100}/>  */}
        <Draggable
            defaultPosition={props.defaultPosition}
            onStop={props.drag}
            onDrag={props.del}
            >
            
            <div className="drag-box" style={{position: 'absolute'}}>

                {props.top ? (<span 
                className={props.properClass + "-top-dot"}
                style={{position: 'absolute', 
                left: '58px', 
                top: '-9px', 
                height: '8px', 
                width: '10px', 
                backgroundColor: 'black'}}
                onClick={(e) => handleClick(e)}
                // onStop={el => elementPosition(el)}
                ref={(el) => elementPosition(el)}
                >
                    
                </span>) : null}

                {props.right ? (<span 
                className={props.properClass + "-right-dot"}
                style={{position: 'absolute', 
                right: '-9px',  height: '10px', 
                width: '8px', 
                backgroundColor: 'black', top: '15px'}}
                onClick={(e) => handleClick(e)}
                // onStop={el => elementPosition(el)}
                ref={el => elementPosition(el)}
                >
                </span>): null}

                {props.bottom ? (<span 
                className={props.properClass + "-bottom-dot"}
                style={{position: 'absolute', 
                left: '58px', bottom: '-5px', 
                height: '8px', width: '10px', backgroundColor: 'black'}}
                onClick={(e) => handleClick(e)}
                // onStop={el => elementPosition(el)}
                ref={el => elementPosition(el)}
                >
                </span>) : null}

                <img src={props.src} 
                alt="logo" width="120px"
                />
            </div>
        </Draggable>
        </>
    );
}

export default Dots;
