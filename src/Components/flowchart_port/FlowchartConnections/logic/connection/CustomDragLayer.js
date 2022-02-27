import React, { Component } from "react";
import { DragLayer } from "react-dnd";
import DraggingInfo from "./DraggingInfo";
import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";

import Sizes from "../../../../../helpers/Sizes";

import Connections from "./Connections";
import IsOverPort from "./IsOverPort";
import { PlayComputerImg } from "../../../../../source/index";
var Camera; // This means that the collect function relies on the old Camera object before drag begins
// but this works as scale or offset cannot be changed when a drag is in progress

var layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(props) {
  var currentOffset = props.currentOffset;
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  var x = currentOffset.x;
  var y = currentOffset.y;
  const transform = "translate(" + x + "px, " + y + "px)";
  return {
    transform: transform,
    WebkitTransform: transform,
  };
}

function collect(monitor) {
  var currentOffset;
  if (
    monitor.getItemType() === ItemTypes.COMPONENT &&
    !DraggingInfo.draggingComponentOld
  ) {
    const delta = monitor.getDifferenceFromInitialOffset();
    if (delta) {
      if (delta.x > 20) {
        // Drag
        currentOffset = monitor.getClientOffset();
        if (currentOffset) {
          currentOffset.x -=
            (ImageSizes[ItemTypes.COMPONENT][0] * Camera.scale) / 2;
          currentOffset.y -=
            (ImageSizes[ItemTypes.COMPONENT][1] * Camera.scale) / 2;
        }
      } else if (!DraggingInfo.scrollingSidebar) {
        // Scroll
        DraggingInfo.scrollingSidebar = true; // Throttling
        DraggingInfo.setSidebarScroll =
          (delta.y,
          () => {
            DraggingInfo.scrollingSidebar = false;
            DraggingInfo.sidebarOldOffset = delta.y;
          });
      }
    }
  } else currentOffset = monitor.getSourceClientOffset();
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: currentOffset,
  };
}

class CustomDragLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem(type, item) {
    var url;
    let Device = sessionStorage.getItem("connectedDevice");
    const { scale } = this.props.workspace;
    if (type === ItemTypes.BIBOX && Device == "Ace") {
      // url = "images/login/pc_1.png";
      url = PlayComputerImg;
      return (
        <img
          style={{ overflow: "visible", zIndex: "2" }}
          src={url}
          width={ImageSizes[type][0] * scale}
          height={ImageSizes[type][1] * scale}
        />
      );
    } else if (type === ItemTypes.BIBOX && Device == "Humanoid") {
      url = "images/login/humanoid_img.png";

      return (
        <img
          src={url}
          // width={ImageSizes[type][0] * scale + 300}
          // height={ImageSizes[type][1] * scale + 200}

          width={ImageSizes[type][0] * scale}
          height={ImageSizes[type][1] * scale}
          style={{
            // height: "517px",
            // width: "590px",
            margin: "0px 0px 0px 0px ",
          }}
        />
      );
    } else if (type === ItemTypes.BIBOX && Device == "Tern") {
      url = "images/Learn/tern.png";
    } else {
      // url = "images/oldImages/component_" + item.type + ".png";

      url =
        "Bisoft_UI/Accessories/newComponents/component_" + item.type + ".png";
    }

    return (
      <img
        src={url}
        width={ImageSizes[type][0] * scale}
        height={ImageSizes[type][1] * scale}
      />
    );
  }

  render() {
    const item = this.props.item;
    const itemType = this.props.itemType;
    const isDragging = Boolean(DraggingInfo.isDragging && item);
    const { components } = this.props.workspace;
    const { left, top } = this.props.workspace.bibox;

    Camera = {
      offset: this.props.workspace.offset,
      scale: this.props.workspace.scale,
    };

    var bibox = {
      left: left,
      top: top,
    };
    var extraComponent, connectedTo;

    //EXTRACOMPONENT IS FOR when we DnD to workSpace from slider like LED,BEEP then it will created with obj of top,left,type
    if (this.props.currentOffset && isDragging) {
      var { x, y } = this.props.currentOffset;
      if (itemType === ItemTypes.BIBOX) {
        bibox.left =
          (x - Sizes.sidebarWidth) / Camera.scale - Camera.offset.left;
        bibox.top = (y - Sizes.navHeight) / Camera.scale - Camera.offset.top;
      } else if (itemType === ItemTypes.COMPONENT) {
        extraComponent = {
          left: (x - Sizes.sidebarWidth) / Camera.scale - Camera.offset.left,
          top: (y - Sizes.navHeight) / Camera.scale - Camera.offset.top,
          type: item.type,
        };

        if (item.connectedTo) {
          connectedTo = extraComponent.connectedTo = item.connectedTo;
        } else {
          connectedTo =
            IsOverPort(
              extraComponent,
              bibox,
              components,
              this.props.PortConnections
            ) || DraggingInfo.newComponentPort;

          if (connectedTo)
            extraComponent.connectedTo = DraggingInfo.newComponentPort =
              connectedTo;
        }
      }
    }

    var zIndex;
    if (itemType === ItemTypes.BIBOX) zIndex = 1;
    else zIndex = 3;

    // connectedTo = IsOverPort(extraCompo nent, bibox, components) || DraggingInfo.newComponentPort;
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: Sizes.navHeight,
            left: Sizes.sidebarWidth,
            height: this.props.height,
            width: Sizes.mainWidth,
          }}
        >
          {/* FOR DRAGING THE COMPONENTS IN WORKSPACE -> WHERE  WIRE, POINT_CIRCLE  are created */}
          <Connections
            bibox={bibox}
            components={components}
            Camera={Camera}
            PortConnections={this.props.PortConnections}
            extraComponent={
              itemType === ItemTypes.COMPONENT ? extraComponent : null
            }
          />
        </div>
        {/* DRAGING WITH IMG OF COMPONENTS LIKE (LED) */}
        {isDragging && (
          <div style={{ ...layerStyles, zIndex }}>
            <div style={getItemStyles(this.props)}>
              {this.renderItem(itemType, item)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DragLayer(collect)(CustomDragLayer);
