import React from 'react';
import Logic from '../../Components/flowchart/Flowchart';
import Header from '../../Components/Header/Header';

const FlowchartPage = () => {
    return (
        <div>
            <React.Fragment>
               <Header prev="/"/>
              <Logic />
            </React.Fragment>
        </div>
    );
}

export default FlowchartPage;
