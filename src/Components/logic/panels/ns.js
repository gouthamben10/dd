var React = require('react');
var PropTypes = React.PropTypes;

const Colors = require('../Colors')
const Checkbox = require('./helpers/Checkbox');
const InputNumber = require('./helpers/InputNumber');
// import '../../../ProjectManager/css/style'
const cellstyle = {borderRight: '0.125em solid ' + Colors.bordergrey, padding: '0.5em'};
const padding = {padding: '0.5em'};
const paddingNoRight = {padding: '0.5em', paddingRight: 0};
const paddingNoLeft = {paddingLeft: 0};
const blank = {height: '0.5em'};

var humanoidOutputPanel = React.createClass({
getHumanoid_Action:function(){
var ele = document.getElementsByName('humanoid_action');

for(let i = 0; i < ele.length; i++) {
if(ele[i].checked)
// console.log("We are getting the radio button value..",ele[i].value);
}
// document.getElementById('aa').style.backgroundColor="#00aad9"
},
render: function() {
const { state } = this.props;
// console.error("state start",this.props);
var style = {
width: '1.5em',
height: '1.5em',
display: 'inline-block',
borderRadius: '20px',
marginRight: '0.40em',
backgroundColor: '#1A1A1A',
border: '2px solid #00AAD9'
};

return (

<table style={{
color: '#FFF',
// padding: '0.5em',
fontWeight: 'bold',
}}>
<tbody>
<tr>
<td style={paddingNoRight}>
{/* <Checkbox checked={state.bic1 || false} onChange={(value) => this.onChange('bic1', value)}/> */}
{/* <input type="radio" name="a" value="1" onClick={this.HH} style={style}/> */}
<label className="lab">
<input type="radio" name="humanoid_action" value="ATTENTION" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>ATTENTION</td>
<td style={paddingNoRight}>
{/* <Checkbox checked={state.bic2 || false} onChange={(value) => this.onChange('bic2', value)}/> */}
{/* <input type="radio" name="a" value="2" onClick={this.HH}></input> */}
<label className="lab">
<input type="radio" name="humanoid_action" value="FORWARD" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>FORWARD</td>
<td style={paddingNoRight}>
{/* <Checkbox checked={state.bic3 || false} onChange={(value) => this.onChange('bic3', value)}/> */}
{/* <input type="radio" name="a" value="3" onClick={this.HH}></input> */}
<label className="lab">
<input type="radio" name="humanoid_action" value="BACKWARD" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BACKWARD</td>
<td style={paddingNoRight}>
{/* <Checkbox checked={state.bic3 || false} onChange={(value) => this.onChange('bic4', value)}/> */}
{/* <input type="radio" name="a" value="4" onClick={this.HH}></input> */}
<label className="lab">
<input type="radio" name="humanoid_action" value="LEFT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>LEFT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="RIGHT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>RIGHT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="WAVE" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={padding} colSpan={2}>WAVE</td>
</tr>

<tr><td style={blank} colSpan={6}/></tr>
<tr>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BOW" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BOW</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="WINGS" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>WINGS</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="SQUAT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>SQUAT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="LAUGH" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>LAUGH</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BOX FORWARD" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BOX FORWARD</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BOX SQUAT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={padding} colSpan={2}>BOX SQUAT</td>
</tr>
<tr><td style={blank} colSpan={6}/></tr>
<tr>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BOX LEFT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BOX LEFT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BOX RIGHT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BOX RIGHT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="BREAK DANCE" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>BREAK DANCE</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="GANGAM STYLE" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>GANGAM STYLE</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="LEFT CURVED HOOK" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>LEFT CURVED HOOK</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="RIGHT CURVED HOOK" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={padding} colSpan={2}>RIGHT CURVED HOOK</td>
</tr>
<tr><td style={blank} colSpan={6}/></tr>
<tr>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="HOOK LEFT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>HOOK LEFT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="HOOK RIGHT" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>HOOK RIGHT</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="MOURN" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>MOURN</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="PUSH UP" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={cellstyle} colSpan={2}>PUSH UP</td>
<td style={paddingNoRight}>
<label className="lab">
<input type="radio" name="humanoid_action" value="SIT UP" onClick={this.getHumanoid_Action} />
<span className="checkmark" />
</label>
</td>
<td style={padding} colSpan={2}>SIT UP</td>
</tr>

</tbody>
</table>
);
}

});

module.exports = humanoidOutputPanel;



