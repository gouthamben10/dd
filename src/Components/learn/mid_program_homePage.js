import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/learn.css';
var flowChartRedirect;
class MidProgramming extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    scratchLink = () => {
        window.location.href = "/scratch-tool"
        // window.location.reload()
    }
    render() {
        if(sessionStorage.getItem("connectedDevice")=="humanoid"){
            flowChartRedirect="/learn-mid/flowChart/LetCode/Enable-Servos"
        }else if(sessionStorage.getItem("connectedDevice")=="Ace"){
            flowChartRedirect="/serve-flow"
        }
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <div style={{ position: "relative" }}>
                    <img className="learn_hm_left_corner" src="images/Learn/learn_bg_top_left.png"></img>
                    <Link to="/Learn">   <img className="learn_hm_back_button" src="images/Learn/login_button_back.png" /></Link>
                    <h1 style={{ position: "absolute", top: "0%", left: "10%", color: "#4b21a6" }}>MID</h1>
                </div>
                <div className="learn_hm_main_img_div">
                    <button className="learn_hm_main_image_button">
                        <Link to="/programSelection">
                            <img style={{ height: "auto", width: "223px" }} src="images/Learn/learn_button.png" />
                            <h1 style={{ position: "absolute", top: "25px", left: "40px", color: "#4b21a6" }}>Hexagonal</h1>
                            <img style={{ height: "auto", width: "48%", position: "absolute", top: "42%", left: "33%" }} src="images/Learn/learn_illus_hexagonal.png" />
                            {/* <h3 style={{ position: "absolute", top: "72%", left: "21%", color: "grey" }}>Description about<br />the mode</h3> */}
                        </Link>
                    </button>
                    {/* <Link to={flowChartRedirect}>
                    <button className="learn_hm_main_image_button" style={{ marginLeft: "50px" }}>
                        <img style={{ height: "auto", width: "223px" }} src="images/Learn/learn_button.png" />
                        <h1 style={{ position: "absolute", top: "25px", left: "40px", color: "#4b21a6" }}>Flow chart</h1>
                        <img style={{ height: "auto", width: "48%", position: "absolute", top: "42%", left: "33%" }} src="images/Learn/learn_illus_flowchart.png" />
                        <h3 style={{ position: "absolute", top: "72%", left: "22%", color: "grey" }}>Description about<br />the mode</h3>
                    </button>
                    </Link> */}
                    {/* <button className="learn_hm_main_image_button" onClick={this.scratchLink} style={{ marginLeft: "30px" }}> */}
                        {/* <Link  > */}
                            {/* <img style={{ height: "350px", width: "280px" }} src="images/Learn/learn_button.png" /> */}
                            {/* <h1 style={{ position: "absolute", top: "25px", left: "46px", color: "#4b21a6" }}>Scratch IDE</h1> */}
                            {/* <img style={{ height: "41%", width: "48%", position: "absolute", top: "30%", left: "27%" }} src="images/Learn/learn_illus_scratch.png" /> */}
                            {/* <h3 style={{ position: "absolute", top: "72%", left: "23%", color: "grey" }}>Description about<br />the mode</h3> */}
                        {/* </Link> */}
                    {/* </button> */}
                </div>
                <div className="cl">
                    {/* <img style={{height:"500px",width:"100%"}} src="images/Learn/login_bg.png"/> */}
                    <img style={{ position: "absolute", bottom: "0vh", right: "0vw" }} src="images/Learn/learn_bg_bottom_right.png" />

                    {/* <img style={{ float: 'right', marginTop: "7px" }} src="images/Learn/learn_bg_bottom_right.png" /> */}
                </div>
            </div>
        );
    }
}

export default MidProgramming;