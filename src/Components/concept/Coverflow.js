// /**
//  * This module is responsible for the interactions with the coverflow of concept tab
//  * Here present indicates thata present in the coverflow
//  * @module components/concept/Coverflow
//  */

// var React = require('react');
// var PropTypes = React.PropTypes;
// var Coverflow = require('react-coverflow2');
// var Card = require('./Card.js');

// var ContentLeft = React.createClass({
//   /**
//    * Get ComponentData index from Index in the currently present cards
//    * @param  {number} indexOfThePresent Index in the currently present cards
//    * @return {number}                   ComponentData index
//    */
//   getIndexFromPresent: function (indexOfThePresent) {
//     var index = -1;
//     while (indexOfThePresent >= 0) {
//       index++;
//       if (!this.props.components[index].selected) indexOfThePresent--;
//     }
//     return index;
//   },
//   /**
//    * Get Index in the currently present cards from ComponentData index
//    * @param  {number} index ComponentData index
//    * @return {number}       Index in the currently present cards
//    */
//   convertIndexToPresent: function (index) {
//     var indexOfThePresent = -1;
//     while (index >= 0) {
//       if (!this.props.components[index].selected) indexOfThePresent++;
//       index--;
//     }
//     return indexOfThePresent;
//   },
//   /**
//    * Select a coverflow card. Calls {@link module:App~select} with
//    * ComponentData index and the new coverflow
//    * @param  {number} indexOfThePresent Index in the currently present cards
//    */
//   select: function (indexOfThePresent) {
//     var index = this.getIndexFromPresent(indexOfThePresent);
//     var active = (index + 1) % this.props.components.length;
//     while (active < this.props.components.length && this.props.components[active].selected) active++;
//     if (active >= this.props.components.length) active = 0;
//     while (active < index && this.props.components[active].selected) active++;
//     if (active == index) active = this.props.components.length;
//     this.props.select(index, active);
//   },
//   /**
//    * Triggered when the coverflow active changes.
//    * Calls {@link module:App~changeCoverflowActive} with ComponentData index.
//    * @param  {number} indexOfThePresent Index in the currently present cards
//    */
//   onChange: function (indexOfThePresent) {
//     this.props.onChange(this.getIndexFromPresent(indexOfThePresent));
//   },
//   render: function() {
//     var newcomponents = [];
//     this.props.components.forEach(function (component, index) {
//       if (!component.selected) newcomponents.push(
//         <Card key={index} url={component.url} name={component.name} height='224' width='200'/>
//       );
//     });
//     return (
//       <div className="componentGrid">
//       <Coverflow  onActiveClick={this.select} maxHeight='224' maxWidth='200' shift={75} angle={-60} timeConstant={150}
//         active={this.convertIndexToPresent(this.props.active)  }

//         displayQuantityOfSide={2}
//         navigation
//         infiniteScroll
//         enableHeading
//         media={{
//           '@media (max-width: 900px)': {
//             width: '600px',
//             height: '300px'
//           },
//           '@media (min-width: 900px)': {
//             width: '960px',
//             height: '600px'
//           }
//         }}

//         onChange={this.onChange}>
//         {newcomponents}
//       </Coverflow>
//       </div>
//     );
//   }

// });

// module.exports = ContentLeft;

import React, { Component } from "react";
import Coverflow from "react-coverflow2";
import Card from "./Card";

class ContentLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * Get ComponentData index from Index in the currently present cards
   * @param  {number} indexOfThePresent Index in the currently present cards
   * @return {number}                   ComponentData index
   */
  getIndexFromPresent = (indexOfThePresent) => {
    var index = -1;
    while (indexOfThePresent >= 0) {
      index++;
      if (!this.props.components[index].selected) indexOfThePresent--;
    }
    return index;
  };
  /**
   * Get Index in the currently present cards from ComponentData index
   * @param  {number} index ComponentData index
   * @return {number}       Index in the currently present cards
   */
  convertIndexToPresent = (index) => {
    var indexOfThePresent = -1;
    while (index >= 0) {
      if (!this.props.components[index].selected) indexOfThePresent++;
      index--;
    }
    return indexOfThePresent;
  };
  /**
   * Select a coverflow card. Calls {@link module:App~select} with
   * ComponentData index and the new coverflow
   * @param  {number} indexOfThePresent Index in the currently present cards
   */
  select = (indexOfThePresent) => {
    var index = this.getIndexFromPresent(indexOfThePresent);
    var active = (index + 1) % this.props.components.length;
    while (
      active < this.props.components.length &&
      this.props.components[active].selected
    )
      active++;
    if (active >= this.props.components.length) active = 0;
    while (active < index && this.props.components[active].selected) active++;
    if (active == index) active = this.props.components.length;

    this.props.select(index, active);
  };
  /**
   * Triggered when the coverflow active changes.
   * Calls {@link module:App~changeCoverflowActive} with ComponentData index.
   * @param  {number} indexOfThePresent Index in the currently present cards
   */
  onChange = (indexOfThePresent) => {
    this.props.onChange(this.getIndexFromPresent(indexOfThePresent));
  };
  render() {
    var newcomponents = [];
    let t = 1;
    this.props.components.forEach(function (component, index) {
      if (!component.selected) {
        newcomponents.push(
          <Card
            key={index}
            url={component.url}
            name={component.name}
            height="215"
            width="200"
            curCard={`${index}Comp${component.name}`}
            cardId={index}
          />
        );
      }
    });

    return (
      <div className="componentGrid">
        <Coverflow
          onActiveClick={this.select}
          maxHeight={215}
          maxWidth={200}
          shift={85}
          angle={-50}
          timeConstant={150}
          active={this.convertIndexToPresent(this.props.active)}
          // active="2"
          displayQuantityOfSide={2}
          navigation
          infiniteScroll
          enableHeading
          media={{
            "@media (max-width: 900px)": {
              maxWidth: "600px",
              maxHeight: "300px",
            },
            "@media (min-width: 900px)": {
              maxWidth: "960px",
              maxHeight: "600px",
            },
          }}
          onChange={this.onChange}
        >
          {newcomponents}
        </Coverflow>
      </div>
    );
  }
}

export default ContentLeft;
