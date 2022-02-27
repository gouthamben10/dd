// import React from 'react';
// // import Card from './Card';
// import {HTML5Backend} from "react-dnd-html5-backend";
// import { DndProvider  } from "react-dnd";
// import Sidebar from './Sidebar';
// // import WorkSpace from './Dropspace';
// // import LogicNew from './Index';
// // import data from './data';



// const Flowchart = (props) => {
//     React.useEffect(() => {
//         console.log(props)
//     })
    
//     const removeCardConnections = (index) => {
//         let { logicNew } = props;
//         logicNew.cards[index].connections.map((connection, portIndex) => {
//           logicNew.cards[connection.to].connections[connection.toPort].to = connection.to
//           logicNew.cards[connection.to].connections[connection.toPort].toPort = connection.toPort
//           connection.to = index
//           connection.toPort = portIndex
//           return connection;
//         })
//         props.update(logicNew)
//     }

//     const removeFromDropspace = (index) => {
//         let { logicNew } = props;
//         removeCardConnections(index);
//         logicNew.cards[index].invalid = true;
//         props.update(logicNew)
//     }
//     return (
//         <DndProvider backend={HTML5Backend}>
//             {/* <Card> */}
//             <Sidebar height={props.height} removeFromDropspace={removeFromDropspace}/>
//             {/* </Card> */}
//             {/* <WorkSpace/> */}
//             {/* <LogicNew /> */}
//       </DndProvider>
//     );
// }

// export default Flowchart;


import React from 'react';
import BottomContainer from '../BottomContainer/BottomContainer';
import {useLocalStorage} from '../LocalStorage/LocalStorage';
import Dots from '../FlowchartDots/Dots';

import './Flowchart.styles.scss';

function Flowchart() {
    const [img, setImg] = useLocalStorage('img1', [{defaultPosition: {x: 0, y: 0}}]);
    const [img2, setImg2] = useLocalStorage('img2',[]);
    const [img3, setImg3] = useLocalStorage('img3',[]);
    const [img4, setImg4] = useLocalStorage('img4',[]);
    const [img5, setImg5] = useLocalStorage('img5',[]);
    const [img6, setImg6] = useLocalStorage('img6',[]);

    const saveState = (x,y) => {
        setImg({x,y})
    }

    const saveState2 = (id) => {
        const index = img2.findIndex(e => e.id === id.id);
        img2[index] = id;
        setImg2(img2);
    }

    const saveState3 = (id) => {
        const index = img3.findIndex(e => e.id === id.id);
        img3[index] = id;
        setImg3(img3);
    }

    const saveState4 = (id) => {
        const index = img4.findIndex(e => e.id === id.id);
        img4[index] = id;
        setImg4(img4);
    }

    const saveState5 = (id) => {
        const index = img5.findIndex(e => e.id === id.id);
        img5[index] = id;
        setImg5(img5);
    }

    const saveState6 = (id) => {
        const index = img6.findIndex(e => e.id === id.id);
        img6[index] = id;
        setImg6(img6);
    }

    const onImage2Concat = () => {
        setImg2(img2 => img2.concat({id: Date.now(),defaultPosition: {x: 0, y: 0}}));
    }
    const onImage3Concat = () => {
        setImg3(img3 => img3.concat({id: Date.now(),defaultPosition: {x: 0, y: 0}}));
    }
    const onImage4Concat = () => {
        setImg4(img4 => img4.concat({id: Date.now(),defaultPosition: {x: 0, y: 0}}));
    }
    const onImage5Concat = () => {
        setImg5(img5 => img5.concat({id: Date.now(),defaultPosition: {x: 0, y: 0}}));
    }
    const onImage6Concat = () => {
        setImg6(img6 => img6.concat({id: Date.now(),defaultPosition: {x: 0, y: 0}}));
    }

    const onDragPosDel = (id) => {
        const index = img2.findIndex(e => e.id === id.id);
        if(img2[index].defaultPosition.x < '-20'){
            const newList = [...img2];
            newList.splice(index,1);
            setImg2([...newList]);
        }
    }

    const onDragPosDel3 = (id) => {
        const index = img3.findIndex(e => e.id === id.id);
        if(img3[index].defaultPosition.x < '-20'){
            const newList = [...img3];
            newList.splice(index,1);
            setImg3([...newList]);
        }
    }

    const onDragPosDel4 = (id) => {
        const index = img4.findIndex(e => e.id === id.id);
        if(img4[index].defaultPosition.x < '-20'){
            const newList = [...img4];
            newList.splice(index,1);
            setImg4([...newList]);
        }
    }

    const onDragPosDel5 = (id) => {
        const index = img5.findIndex(e => e.id === id.id);
        if(img5[index].defaultPosition.x < '-20'){
            const newList = [...img5];
            newList.splice(index,1);
            setImg5([...newList]);
        }
    }

    const onDragPosDel6 = (id) => {
        const index = img6.findIndex(e => e.id === id.id);
        if(img6[index].defaultPosition.x < '-20'){
            const newList = [...img6];
            newList.splice(index,1);
            setImg6([...newList]);
        }
    }

    return (<>
        <div className="main-flowchart">
            <div className="left-flowchart" style={{position:"absolute", top: '8%'}}>
                {/* {img2.length>1 ? setImg2({}) : null} */}
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/if.png'}  
                alt="logo"
                onClick={() => onImage2Concat()}
                />
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/wait.png'}  
                alt="logo"
                onClick={() => onImage3Concat()}
                />
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/loop.png'}  
                alt="logo"
                onClick={() => onImage4Concat()}
                />
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/output.png'}  
                alt="logo"
                onClick={() => onImage5Concat()}
                />
                <img src={process.env.PUBLIC_URL + '/images/flowcharts/flow.png'}  
                alt="logo"
                onClick={() => onImage6Concat()}
                />
                {/* <img src="" alt="yeah" onClick={() => lineHandler()} /> */}
            </div>

            <div className="right-flowchart">
                {<Dots
                defaultPosition={img.x ? img.x.defaultPosition : img.x}
                drag={(e, data) => {
                    saveState({id: img.id,
                    defaultPosition: { x: data.x, y: data.y }})
                }}  
                src={process.env.PUBLIC_URL + '/images/flowcharts/start.png'}
                bottom={true}
                properClass="first"
                />}

                {img2.length>= 1 ? img2.map( img2 => (
                <Dots 
                    defaultPosition={img2.defaultPosition}
                    drag={(e, data) => {
                        saveState2({id: img2.id,
                        defaultPosition: { x: data.x, y: data.y } });
                    }}
                    src={process.env.PUBLIC_URL + '/images/flowcharts/if.png'} 
                    top={true}
                    bottom={true}
                    right={true}
                    properClass={"second-" + img2.id + "-"}
                    del={(e,data) => {
                        onDragPosDel({id: img2.id,
                        defaultPosition: {x:data.x, y: data.y}})
                    }}
                />
                 )) : null}

                {img3.length>= 1 ? img3.map( img3 => (
                <Dots 
                defaultPosition={img3.defaultPosition}
                drag={(e, data) => {
                         saveState3({id: img3.id,
                        defaultPosition: { x: data.x, y: data.y } });
                       }} 
                src={process.env.PUBLIC_URL + '/images/flowcharts/wait.png'}
                top={true}
                bottom={true}
                properClass={"third-" + img3.id + "-"}
                del={(e,data) => {
                    onDragPosDel3({id: img3.id,
                    defaultPosition: {x:data.x, y: data.y}})
                }}
                />
                )) : null}

                {img4.length>= 1 ? img4.map(img4 =>(
                <Dots
                defaultPosition={img4.defaultPosition}
                drag={(e, data) => {
                         saveState4({id: img4.id,  
                         defaultPosition: { x: data.x, y: data.y } });
                       }}
                src={process.env.PUBLIC_URL + '/images/flowcharts/loop.png'} 
                top={true}
                bottom={true}
                right={true}
                properClass={"fourth-" + img4.id + "-"}
                del={(e,data) => {
                    onDragPosDel4({id: img4.id,
                    defaultPosition: {x:data.x, y: data.y}})
                }}
                />
                )) : null}

                {img5.length >= 1 ? img5.map(img5 => (
                <Dots
                defaultPosition={img5.defaultPosition}
                drag={(e, data) => {
                         saveState5({ id: img5.id, 
                        defaultPosition: { x: data.x, y: data.y } });
                    }}
                src={process.env.PUBLIC_URL + '/images/flowcharts/output.png'}
                top={true}
                bottom={true}
                properClass={"fifth-" + img5.id + "-"}
                del={(e,data) => {
                    onDragPosDel5({id: img5.id,
                    defaultPosition: {x:data.x, y: data.y}})
                }}
                />
                )) : null}

                {img6.length >= 1 ? img6.map(img6 => (
                <Dots
                defaultPosition={img6.defaultPosition}
                drag={(e, data) => {
                         saveState6({id: img6.id,  
                        defaultPosition: { x: data.x, y: data.y } });
                       }}
                src={process.env.PUBLIC_URL + '/images/flowcharts/flow.png'}
                top={true}
                properClass={"sixth-" + img6.id + "-"}
                del={(e,data) => {
                    onDragPosDel6({id: img6.id,
                    defaultPosition: {x:data.x, y: data.y}})
                }}
                />
                )): null}
                
            </div>
        </div>
        <BottomContainer prev="/digital-analog"/>
        </>
    );
}

export default Flowchart;
