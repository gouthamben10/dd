var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
const data = require('./data');

function portPosition(card, port) {
  var {left, top, type} = card;
  var size = ImageSizes[ItemTypes.CARD][0]/2;
 
  size += ImageSizes[ItemTypes.PORT_CIRCLE][0]/3 // To make the squares a little more distant
  const ANGLE_TO_SUBTRACT = Math.PI / 2;
  const angle = data[type].ports[port];

  console.log("card, port==AAAAAAA========>",card, port)
  if(card.type=="if" && port ==2 ){
    left += size+50;
    top += size;
  }
  else  if(card.type=="if" && port ==1 ){
    left += size-6;
    top += size;
  }else{
    left += size;
    top += size;
  }
  return {
    left: left+size*Math.cos(angle - ANGLE_TO_SUBTRACT),
    top: top+size*Math.sin(angle - ANGLE_TO_SUBTRACT)
  }
}

module.exports = {
  portPosition: portPosition
}
