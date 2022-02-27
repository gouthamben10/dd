import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./save.css";

import socketIOClient from "socket.io-client";
var socket = socketIOClient("http://localhost:3008");

// class Project extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { projectDetail: {}, imgURL: "" };
//   }

//   componentDidMount = () => {
//     console.log("componentDidMount called");
//     let self = this;
//     self.getPorjectData();
//   };

//   getPorjectData = () => {
//     let self = this;
//     axios
//       .get(
//         `http://localhost:3008/getProjectDetail/${this.props.match.params.id}`
//       )
//       .then(function (response) {
//         console.log("Response From Back end ..", response.data);
//         self.setState({ projectDetail: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   upload = () => {
//     let Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
//     socket.emit(
//       "/uploadProjectByte",
//       this.state.projectDetail.bytes,
//       Peripherial
//     );
//   };

//   explore = () => {
//     let self = this;
//     axios
//       .get(`http://localhost:3008/getHistory/${this.props.match.params.id}`)
//       .then(function (response) {
//         //   console.log("Response (HISTORY) From Back end ..",response.data.logic)
//         sessionStorage.setItem(
//           "assembly",
//           JSON.stringify(response.data.assembly)
//         );
//         sessionStorage.setItem(
//           "SelectedComp",
//           JSON.stringify(response.data.concept.counter)
//         );

//         self.props.selecteComponent(response.data.concept.counter);
//         self.props.indexSelection(response.data.concept.Index);
//         self.props.ComponentProps(response.data.concept.componentProps);

//         self.props.assemblyComponent(response.data.assembly.workspace);
//         self.props.PortConnections(response.data.assembly.PortConnections);

//         self.props.update(response.data.logic);

//         self.props.history.push("/concept");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   handleChange = (event) => {
//     let property = event.target.name;
//     let value = event.target.value;
//     console.log(".....//", property, value);
//     this.setState((prevState) => ({
//       projectDetail: {
//         ...prevState.projectDetail,
//         [property]: value,
//       },
//     }));
//     // this.setState({...this.state.projectDetail,[event.target.name]: event.target.value});
//   };
//   submit = (event) => {
//     let self = this;
//     event.preventDefault();
//     axios
//       .post("http://localhost:3008/updateProject", this.state.projectDetail)
//       .then(function (response) {
//         console.log("Updtaed successful..");
//         // self.getPorjectData()
//       })
//       .catch(function (error) {
//         // console.log(response.data);
//         console.log("ERROR", error.message);
//       });
//   };
//   render() {
//     console.log("Updated Data is ::", this.state.projectDetail);
//     return (
//       <div className="container-fluid" style={{ height: "100vh" }}>
//         <div className="row">
//           <div className="col-6">
//             <div style={{ width: "100%", height: "50vh" }}>
//               <img
//                 id="screenshot"
//                 style={{ height: "100%", width: "100%" }}
//                 src={this.state.projectDetail.imgURL}
//               />
//             </div>
//             <form>
//               <div class="mb-3">
//                 <label for="pname" class="form-label">
//                   Project Name:
//                 </label>
//                 <input
//                   type="text"
//                   value={this.state.projectDetail.name}
//                   readOnly
//                   name="name"
//                   onChange={this.handleChange}
//                   class="form-control"
//                   id="pname"
//                   aria-describedby="emailHelp"
//                 />
//               </div>
//               <div class="mb-3">
//                 <label for="pdiscription" class="form-label">
//                   Description:
//                 </label>
//                 <input
//                   type="text"
//                   value={this.state.projectDetail.discription}
//                   name="discription"
//                   onChange={this.handleChange}
//                   class="form-control"
//                   id="pdiscription"
//                 />
//               </div>
//               <div class="mb-3">
//                 <label for="plink" class="form-label">
//                   Link:
//                 </label>
//                 <input
//                   type="text"
//                   value={this.state.projectDetail.link}
//                   onChange={this.handleChange}
//                   name="link"
//                   class="form-control"
//                   id="plink"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 class="btn btn-warning"
//                 style={{ width: "50%", marginLeft: "20%" }}
//                 onClick={this.submit}
//               >
//                 UPDATE
//               </button>
//             </form>
//           </div>
//           <div className="col-6">
//             <iframe
//               src={`${this.state.projectDetail.link}`}
//               allowfullscreen={true}
//               style={{ width: "100%", height: "400px" }}
//             ></iframe>
//             <button
//               class="btn btn-primary mt-5"
//               type="button"
//               onClick={this.upload}
//               style={{ width: "50%", marginLeft: "20%" }}
//             >
//               UPLOAD
//             </button>
//             <button
//               class="btn btn-primary mt-5"
//               type="button"
//               onClick={this.explore}
//               style={{ width: "50%", marginLeft: "20%" }}
//             >
//               EXPLORE
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Project;

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { projectDetail: {}, imgURL: "" };
  }

  componentDidMount = () => {
    console.log("componentDidMount called");
    let self = this;
    self.getPorjectData();
  };

  getPorjectData = () => {
    let self = this;
    axios
      .get(
        `http://localhost:3008/getProjectDetail/${this.props.match.params.id}`
      )
      .then(function (response) {
        console.log("Response From Back end ..", response.data);
        self.setState({ projectDetail: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  upload = () => {
    let Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    socket.emit(
      "/uploadProjectByte",
      this.state.projectDetail.bytes,
      Peripherial
    );
  };

  explore = () => {
    let self = this;
    axios
      .get(`http://localhost:3008/getHistory/${this.props.match.params.id}`)
      .then(function (response) {
        //   console.log("Response (HISTORY) From Back end ..",response.data.logic)
        sessionStorage.setItem(
          "assembly",
          JSON.stringify(response.data.assembly)
        );
        sessionStorage.setItem(
          "SelectedComp",
          JSON.stringify(response.data.concept.counter)
        );

        self.props.selecteComponent(response.data.concept.counter);
        self.props.indexSelection(response.data.concept.Index);
        self.props.ComponentProps(response.data.concept.componentProps);

        self.props.assemblyComponent(response.data.assembly.workspace);
        self.props.PortConnections(response.data.assembly.PortConnections);

        self.props.update(response.data.logic);

        self.props.history.push("/concept");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    console.log(".....//", property, value);
    this.setState((prevState) => ({
      projectDetail: {
        ...prevState.projectDetail,
        [property]: value,
      },
    }));
    // this.setState({...this.state.projectDetail,[event.target.name]: event.target.value});
  };
  submit = (event) => {
    let self = this;
    event.preventDefault();
    axios
      .post("http://localhost:3008/updateProject", this.state.projectDetail)
      .then(function (response) {
        console.log("Updtaed successful..");
        // self.getPorjectData()
      })
      .catch(function (error) {
        // console.log(response.data);
        console.log("ERROR", error.message);
      });
  };
  render() {
    console.log("Updated Data is ::", this.state.projectDetail);
    return (
      <div className="projectContainer">
        <div className="projectMain">
          <div
            className="Projectitem_1"
            // style={{ backgroundColor: "#e3e3e3" }}
          >
            <div style={{ width: "100%", height: "50vh" }}>
              <img
                id="screenshot"
                style={{ height: "100%", width: "100%" }}
                src={this.state.projectDetail.imgURL}
              />
            </div>

            <form className="formProject">
              <div class="mb-3 ">
                <label for="pname" class="form-label">
                  Project Name:
                </label>
                <input
                  type="text"
                  value={this.state.projectDetail.name}
                  readOnly
                  name="name"
                  onChange={this.handleChange}
                  id="pname"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="pdiscription" class="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  value={this.state.projectDetail.discription}
                  name="discription"
                  onChange={this.handleChange}
                  class="form-control"
                  id="pdiscription"
                />
              </div>
              <div class="mb-3">
                <label for="plink" class="form-label">
                  Link:
                </label>
                <input
                  type="text"
                  value={this.state.projectDetail.link}
                  onChange={this.handleChange}
                  name="link"
                  class="form-control"
                  id="plink"
                />
              </div>
              <button
                type="submit"
                class="btn btn-warning"
                style={{ width: "50%", marginLeft: "20%" }}
                onClick={this.submit}
              >
                UPDATE
              </button>
            </form>
          </div>

          <div className="Projectitem_2">
            <iframe
              src={`${this.state.projectDetail.link}`}
              allowfullscreen={true}
              style={{ width: "100%", height: "400px" }}
            ></iframe>

            <button
              class="btn btn-primary mt-5"
              type="button"
              onClick={this.upload}
              style={{ width: "50%", marginLeft: "20%" }}
            >
              UPLOAD
            </button>
            <button
              class="btn btn-primary mt-5"
              type="button"
              onClick={this.explore}
              style={{ width: "50%", marginLeft: "20%" }}
            >
              EXPLORE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    assemblyComponent: (data) => {
      dispatch({ type: "ASSEMBLY_SELECTION", payload: data });
    },
    logicComponent: (data) => {
      dispatch({ type: "LOGIC_SELECTION", payload: data });
    },
    PortConnections: (data) => {
      dispatch({ type: "PORT_CONNECTION", payload: data });
    },
    selecteComponent: (data) => {
      dispatch({ type: "COMPONENT_SELECTION", payload: data });
    },
    indexSelection: (data) => {
      dispatch({ type: "Index_selection", payload: data });
    },
    ComponentProps: (data) => {
      dispatch({ type: "COMPONENT_PROPS", payload: data });
    },
    update: (data) => {
      dispatch({ type: "LOGIC_SELECTION", payload: data });
    },
  };
};

// Assembly = withRouter(connect(mapStateToProps, mapDispatchToProps)(Assembly))
// Assembly = withRouter(DragDropContext(HTML5Backend)(Assembly))
// Sidebar = DragSource('items', itemSource, collect)(Sidebar)

export default connect(mapStateToProps, mapDispatchToProps)(Project);
