import React from 'react';
import Popup from 'reactjs-popup';
import './Popup.scss';

const PopupMenu = ({open, close, children, click, onActivation, onDeactivation}) => {
    return (
        <Popup open={open}
                closeOnDocumentClick={false} 
                onClose={close} style={{maxWidth: '400px'}}>
                    <div className="modal">
                    <span className="close" 
                        onClick={click}>
                        &times;
                    </span>
                    <br/>
                    <span className="popChildren"> {children} </span>
                    <br/>
                    <span style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}>
                    <button onClick={onActivation} style={{
                        width: '100px',
                        borderRadius: '20px'
                    }}>Yes</button>
                    <button onClick={onDeactivation} style={{
                        width: '100px',
                        borderRadius: '20px'
                    }}>No</button>
                    </span>
                    </div>
            </Popup>
    );
}

export default PopupMenu;
