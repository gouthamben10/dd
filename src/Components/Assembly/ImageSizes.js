/**
 * This module exports the ImageSizes as an object with keys as ItemTypes
 * and values as an array of [width, height]
 * @module components/assembly/ImageSizes
 */

import ItemTypes from './ItemTypes'

var ImageSizes = {
  [ItemTypes.COMPONENT]: [100, 100],
   [ItemTypes.BIBOX]: [290, 317],
  // [ItemTypes.BIBOX]: [315, 350],
  // [ItemTypes.BIBOX]: [300, 340], ///changed for Ace
  [ItemTypes.PORT_CIRCLE]: [8, 8]
}


export default ImageSizes