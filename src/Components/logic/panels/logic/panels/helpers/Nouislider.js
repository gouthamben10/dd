// import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import nouislider from 'nouislider-algolia-fork';

// class Nouislider extends React.Component {
//   constructor(props) {
//     super(props);
//     // create a ref to store the textInput DOM element
//     // this.sliderContainer = React.createRef();
//   }
//   componentDidMount() {
//     console.log("PROPS from NOUI>>>>>>>>>>",this.props);
//     if (this.props.disabled) document.getElementById("rangeIS").setAttribute('disabled', true);
//     else document.getElementById("rangeIS").removeAttribute('disabled');
//     this.createSlider();
//   }

//   componentDidUpdate() {
//     if (this.props.disabled) document.getElementById("rangeIS").setAttribute('disabled', true);
//     else document.getElementById("rangeIS").removeAttribute('disabled');
//     this.slider.destroy();
//     this.createSlider();
//   }

//   componentWillUnmount() {
//     // this.slider.destroy(); 
//   }

//   createSlider=()=>{
//     console.log("THE PROPS UNDER CREATE SLIDER...",{...this.props});
//     var rangeIS=document.getElementById("rangeIS");
//     var slider = this.slider = nouislider.create(rangeIS, { ...this.props });

//     if (this.props.onUpdate) {
//       slider.on('update', this.props.onUpdate);
//     }

//     if (this.props.onChange) {
//       slider.on('change', this.props.onChange);
//     }

//     if (this.props.onSlide) {
//       slider.on('slide', this.props.onSlide);
//     }
//   }

//   render() {
//     return (

//      <div id="rangeIS" style={{ height: "10px", width: "10px" }}  />
//     )
//   }
// }

// // Nouislider.propTypes = {
// //   // http://refreshless.com/nouislider/slider-options/#section-animate
// //   animate: React.PropTypes.bool,
// //   // http://refreshless.com/nouislider/slider-options/#section-Connect
// //   connect: React.PropTypes.oneOfType([
// //     React.PropTypes.oneOf(['lower', 'upper']),
// //     React.PropTypes.bool
// //   ]),
// //   // http://refreshless.com/nouislider/slider-options/#section-cssPrefix
// //   cssPrefix: React.PropTypes.string,
// //   // http://refreshless.com/nouislider/slider-options/#section-orientation
// //   direction: React.PropTypes.oneOf(['ltr', 'rtl']),
// //   // http://refreshless.com/nouislider/slider-options/#section-limit
// //   limit: React.PropTypes.number,
// //   // http://refreshless.com/nouislider/slider-options/#section-margin
// //   margin: React.PropTypes.number,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-change
// //   onChange: React.PropTypes.func,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-update
// //   onSlide: React.PropTypes.func,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-slide
// //   onUpdate: React.PropTypes.func,
// //   // http://refreshless.com/nouislider/slider-options/#section-orientation
// //   orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
// //   // http://refreshless.com/nouislider/pips/
// //   pips: React.PropTypes.object,
// //   // http://refreshless.com/nouislider/slider-values/#section-range
// //   range: React.PropTypes.object.isRequired,
// //   // http://refreshless.com/nouislider/slider-options/#section-start
// //   start: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
// //   // http://refreshless.com/nouislider/slider-options/#section-step
// //   step: React.PropTypes.number,
// //   // http://refreshless.com/nouislider/slider-options/#section-tooltips
// //   tooltips: React.PropTypes.oneOfType([
// //     React.PropTypes.bool,
// //     React.PropTypes.object
// //   ])
// // };




// // Nouislider.propTypes = {
// //   // http://refreshless.com/nouislider/slider-options/#section-animate
// //   animate: PropTypes.bool,
// //   // http://refreshless.com/nouislider/slider-options/#section-Connect
// //   connect: PropTypes.oneOfType([
// //     PropTypes.oneOf(['lower', 'upper']),
// //     PropTypes.bool
// //   ]),
// //   // http://refreshless.com/nouislider/slider-options/#section-cssPrefix
// //   cssPrefix: PropTypes.string,
// //   // http://refreshless.com/nouislider/slider-options/#section-orientation
// //   direction: PropTypes.oneOf(['ltr', 'rtl']),
// //   // http://refreshless.com/nouislider/slider-options/#section-limit
// //   limit: PropTypes.number,
// //   // http://refreshless.com/nouislider/slider-options/#section-margin
// //   margin: PropTypes.number,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-change
// //   onChange: PropTypes.func,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-update
// //   onSlide: PropTypes.func,
// //   // http://refreshless.com/nouislider/events-callbacks/#section-slide
// //   onUpdate: PropTypes.func,
// //   // http://refreshless.com/nouislider/slider-options/#section-orientation
// //   orientation: PropTypes.oneOf(['horizontal', 'vertical']),
// //   // http://refreshless.com/nouislider/pips/
// //   pips: PropTypes.object,
// //   // http://refreshless.com/nouislider/slider-values/#section-range
// //   range: PropTypes.object.isRequired,
// //   // http://refreshless.com/nouislider/slider-options/#section-start
// //   start: PropTypes.arrayOf(PropTypes.number).isRequired,
// //   // http://refreshless.com/nouislider/slider-options/#section-step
// //   step: PropTypes.number,
// //   // http://refreshless.com/nouislider/slider-options/#section-tooltips
// //   tooltips: PropTypes.oneOfType([
// //     PropTypes.bool,
// //     PropTypes.object
// //   ])
// // };

// export default Nouislider;


import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class Nouislider extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    change = (value) => {
        console.log("ONCHANGE IS CALLED", value);
        this.props.onChange(value)
    }
    render() {
        const wrapperStyle = { width: 400, margin: 50 };
        console.log("PROPS FROM NOUISLIDER????????????????", this.props);
        var { range, disabled, step, value } = this.props
        // console.log("//////////////",range.min,range.max,disabled,step);
        return (
            <div>
                <Slider min={range.min} max={range.max} steps={step} value={value} disabled={disabled} onChange={this.change} />
            </div>
        );
    }
}

export default Nouislider;
