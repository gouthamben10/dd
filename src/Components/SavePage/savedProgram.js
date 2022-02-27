import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

// class SavedProgram extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { allSavedProgrm: [] };
//   }

//   componentDidMount = () => {
//     let self = this;
//     self.getProject();
//   };

//   getProject = () => {
//     //   self.props.assemblyComponent(response.data.assembly.workspace);
//     //   self.props.PortConnections(response.data.assembly.PortConnections);
//     //   self.props.update(response.data.logic);

//     // self.props.assemblyComponent(response.data.assembly.workspace);
//     // self.props.PortConnections(response.data.assembly.PortConnections);
//     // self.props.update(response.data.logic);

//     let self = this;
//     axios
//       .get(`http://localhost:3008/getProject`)
//       .then(function (response) {
//         self.setState({ allSavedProgrm: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   deleteProject = (id) => {
//     console.log("id received ..", id);
//     let self = this;
//     axios
//       .post(`http://localhost:3008/deleteProject/${id}`)
//       .then(function (response) {
//         self.getProject();
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   render() {
//     console.log("...", this.state.allSavedProgrm);

//     return (
//       <div className="container-fluid">
//         {/* <div className="row"> */}
//         {this.state.allSavedProgrm.length > 0 ? (
//           <div className="row">
//             {this.state.allSavedProgrm.map((el) => (
//               <div className="col-3 savedProgramMainCon">
//                 {/*bg-light text-dark project_card */}
//                 <div className="card mt-3 bg-light text-dark project_card  ">
//                   <img
//                     src="images/Learn/hex_save_bg.png"
//                     class="card-img-top"
//                     alt="..."
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{el.name}</h5>
//                     <p className="card-text">{el.discription}</p>
//                     <div className="row">
//                       <Link
//                         to={`/project/${el.name}`}
//                         className="btn btn-primary ml-2"
//                       >
//                         VIEW PROJECT
//                       </Link>
//                       <button
//                         onClick={() => this.deleteProject(el.name)}
//                         className="btn btn-danger ml-2"
//                       >
//                         DELETE PROJECT
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="row">
//             <div
//               style={{
//                 backgroundColor: "white",
//                 height: "100vh",
//                 width: "100vw",
//               }}
//             >
//               <div className="loading">
//                 <h1>Loading Projects </h1>
//                 <ReactLoading
//                   type="bubbles"
//                   color="blue"
//                   className="loading_gif"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

class SavedProgram extends Component {
  constructor(props) {
    super(props);
    this.state = { allSavedProgrm: [] };
  }

  componentDidMount = () => {
    let self = this;
    self.getProject();
  };

  getProject = () => {
    //   self.props.assemblyComponent(response.data.assembly.workspace);
    //   self.props.PortConnections(response.data.assembly.PortConnections);
    //   self.props.update(response.data.logic);

    // self.props.assemblyComponent(response.data.assembly.workspace);
    // self.props.PortConnections(response.data.assembly.PortConnections);
    // self.props.update(response.data.logic);

    let self = this;
    axios
      .get(`http://localhost:3008/getProject`)
      .then(function (response) {
        self.setState({ allSavedProgrm: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteProject = (id) => {
    console.log("id received ..", id);
    let self = this;
    axios
      .post(`http://localhost:3008/deleteProject/${id}`)
      .then(function (response) {
        self.getProject();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    console.log("...", this.state.allSavedProgrm);

    return (
      <div className="savedProgramContainer" style={{ marginTop: "15px" }}>
        {/* <div className="row"> */}
        {this.state.allSavedProgrm.length > 0 ? (
          <div className="SavedProgramRow">
            {this.state.allSavedProgrm.map((el) => (
              // <div className="card mt-3 bg-light text-dark project_card  ">
              <div className="SavedProgramCard project_card">
                <img
                  src="images/Learn/hex_save_bg.png"
                  class="cardImg"
                  alt="..."
                />
                <div className="SaveProgCard_body">
                  <div
                    style={{
                      width: "92%",
                      marginLeft: "5%",
                    }}
                  >
                    <p className="SaveProgcard-title">{el.name}</p>
                    <p className="SaveProgcard-text">{el.discription}</p>
                  </div>

                  <div className="SavedProgramRow">
                    <Link
                      to={`/project/${el.name}`}
                      className="btn btn-primary ml-2"
                    >
                      VIEW PROJECT
                    </Link>
                    <div
                      onClick={() => this.deleteProject(el.name)}
                      className="btn btn-danger ml-2"
                    >
                      DELETE PROJECT
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div
              style={{
                backgroundColor: "white",
                height: "100vh",
                width: "100vw",
              }}
            >
              <div className="loading">
                <h1>Loading Projects </h1>
                <ReactLoading
                  type="bubbles"
                  color="blue"
                  className="loading_gif"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SavedProgram;
