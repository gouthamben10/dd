import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../css/learn.css'
class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        if(localStorage.getItem("programMode")=="learn"){
          var txt="Learn"
        }else if(localStorage.getItem("programMode")=="program"){
           var txt="Create"
        }
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <div style={{ position: "relative" }}>
                    <img className="learn_hm_left_corner" src="images/Learn/learn_bg_top_left.png"></img>
                    <Link to="/Selection">  <img className="learn_hm_back_button" src="images/Learn/login_button_back.png" /></Link>
                    <h1 style={{ position: "absolute", top: "0%", left: "10%", color: "#4b21a6" }}>{txt}</h1>
                </div>
                <div className="learn_hm_main_img_div">
                    {/* <button className="learn_hm_main_image_button"> */}
                        {/* <img style={{ height: "350px", width: "280px" }} src="images/Learn/learn_button.png" /> */}
                        {/* <h1 style={{ position: "absolute", top: "25px", left: "33%", color: "#4b21a6" }}>BASIC</h1> */}
                        {/* <img style={{ height: "41%", width: "48%", position: "absolute", top: "30%", left: "20%" }} src="images/Learn/learn_illus_basic.png" /> */}
                        {/* <h3 style={{ position: "absolute", top: "72%", left: "19%", color: "grey" }}>Description about<br />the mode</h3> */}
                    {/* </button> */}
                    <button className="learn_hm_main_image_button">
                        <Link to="/midProgramming">    
                            <img style={{ height: "auto", width: "223px" }} src="images/Learn/learn_button.png" />
                            <h1 style={{ position: "absolute", top: "25px", left: "44%", color: "#4b21a6" }}>MID</h1>
                            <img style={{ height: "41%", width: "48%", position: "absolute", top: "40%", left: "39%" }} src="images/Learn/learn_illus_mid.png" />
                            {/* <h3 style={{ position: "absolute", top: "72%", left: "21%", color: "grey" }}>Description about<br />the mode</h3> */}
                            
                        </Link>
                    </button>
                    {/* <button className="learn_hm_main_image_button" style={{ marginLeft: "30px" }}> */}
                        {/* <img style={{ height: "350px", width: "280px" }} src="images/Learn/learn_button.png" /> */}
                        {/* <h1 style={{ position: "absolute", top: "25px", left: "25%", color: "#4b21a6" }}>ADVANCED</h1> */}
                        {/* <img style={{ height: "41%", width: "48%", position: "absolute", top: "30%", left: "27%" }} src="images/Learn/learn_illus_advanced.png" /> */}
                        {/* <h3 style={{ position: "absolute", top: "72%", left: "23%", color: "grey" }}>Description about<br />the mode</h3> */}
                    {/* </button> */}
                </div>
                <div className="cl">
                    {/* <img style={{height:"500px",width:"100%"}} src="images/Learn/login_bg.png"/> */}
                    {/* <img style={{ float: 'right', marginTop: "7px" }} src="images/Learn/learn_bg_bottom_right.png" /> */}
                    <img style={{ position: "absolute", bottom: "0vh", right: "0vw" }} src="images/Learn/learn_bg_bottom_right.png" />

                </div>
            </div>
        );
    }
}

export default Learn;