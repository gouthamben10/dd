import React from 'react';

const Output = ({ind, port1 ,portIndex1,LSBINDEX1, myImage1,port2 ,portIndex2,LSBINDEX2, myImage2,
    port3 ,portIndex3,LSBINDEX3, myImage3,port4 ,portIndex4,LSBINDEX4, myImage4,
    port5 ,portIndex5,LSBINDEX5, myImage5,port6 ,portIndex6,LSBINDEX6, myImage6,
    port7 ,portIndex7,LSBINDEX7, myImage7,port8,portIndex8,LSBINDEX8, myImage8, newArr, newArray}) => {
        if(newArray[ind+5] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+8] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            
          }else if(newArray[ind+11] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port3 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+14] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            portIndex4 = ind + 11;
            LSBINDEX4 = ind + 13;
            if(newArray[LSBINDEX4] === 0){
              return null;
            }else{
              port4 = newArr[newArray[portIndex4]];
              myImage4 = document.getElementById(`img_${port4}`);
              myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+17] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            portIndex4 = ind + 11;
            LSBINDEX4 = ind + 13;
            portIndex5 = ind + 14;
            LSBINDEX5 = ind + 16;
            if(newArray[LSBINDEX5] === 0){
              return null;
            }else{
              port5 = newArr[newArray[portIndex5]];
              myImage5 = document.getElementById(`img_${port5}`);
              myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX4] === 0){
              return null;
            }else{
              port4 = newArr[newArray[portIndex4]];
              myImage4 = document.getElementById(`img_${port4}`);
              myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+20] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            portIndex4 = ind + 11;
            LSBINDEX4 = ind + 13;
            portIndex5 = ind + 14;
            LSBINDEX5 = ind + 16;
            portIndex6 = ind + 17;
            LSBINDEX6 = ind + 19;
            if(newArray[LSBINDEX6] === 0){
              return null;
            }else{
              port6 = newArr[newArray[portIndex6]];
              myImage6 = document.getElementById(`img_${port6}`);
              myImage6.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX5] === 0){
              return null;
            }else{
              port5 = newArr[newArray[portIndex5]];
              myImage5 = document.getElementById(`img_${port5}`);
              myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX4] === 0){
              return null;
            }else{
              port4 = newArr[newArray[portIndex4]];
              myImage4 = document.getElementById(`img_${port4}`);
              myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+23] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            portIndex4 = ind + 11;
            LSBINDEX4 = ind + 13;
            portIndex5 = ind + 14;
            LSBINDEX5 = ind + 16;
            portIndex6 = ind + 17;
            LSBINDEX6 = ind + 19;
            portIndex7 = ind + 20;
            LSBINDEX7 = ind + 22;
            if(newArray[LSBINDEX7] === 0){
              return null;
            }else{
              port7 = newArr[newArray[portIndex7]];
              myImage7 = document.getElementById(`img_${port7}`);
              myImage7.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX6] === 0){
              return null;
            }else{
              port6 = newArr[newArray[portIndex6]];
              myImage6 = document.getElementById(`img_${port6}`);
              myImage6.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX5] === 0){
              return null;
            }else{
              port5 = newArr[newArray[portIndex5]];
              myImage5 = document.getElementById(`img_${port5}`);
              myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX4] === 0){
              return null;
            }else{
              port4 = newArr[newArray[portIndex4]];
              myImage4 = document.getElementById(`img_${port4}`);
              myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }else if(newArray[ind+26] === 125){
            portIndex1 = ind + 2;
            LSBINDEX1 = ind + 4;
            portIndex2 = ind + 5;
            LSBINDEX2 = ind + 7;
            portIndex3 = ind + 8;
            LSBINDEX3 = ind + 10;
            portIndex4 = ind + 11;
            LSBINDEX4 = ind + 13;
            portIndex5 = ind + 14;
            LSBINDEX5 = ind + 16;
            portIndex6 = ind + 17;
            LSBINDEX6 = ind + 19;
            portIndex7 = ind + 20;
            LSBINDEX7 = ind + 22;
            portIndex8 = ind + 23;
            LSBINDEX8 = ind + 25;
            if(newArray[LSBINDEX8] === 0){
              return null;
            }else{
              port8 = newArr[newArray[portIndex8]];
              myImage8 = document.getElementById(`img_${port8}`);
              myImage8.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX7] === 0){
              return null;
            }else{
              port7 = newArr[newArray[portIndex7]];
              myImage7 = document.getElementById(`img_${port7}`);
              myImage7.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX6] === 0){
              return null;
            }else{
              port6 = newArr[newArray[portIndex6]];
              myImage6 = document.getElementById(`img_${port6}`);
              myImage6.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX5] === 0){
              return null;
            }else{
              port5 = newArr[newArray[portIndex5]];
              myImage5 = document.getElementById(`img_${port5}`);
              myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX4] === 0){
              return null;
            }else{
              port4 = newArr[newArray[portIndex4]];
              myImage4 = document.getElementById(`img_${port4}`);
              myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX3] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex3]];
              myImage3 = document.getElementById(`img_${port3}`);
              myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX2] === 0){
              return null;
            }else{
              port2 = newArr[newArray[portIndex2]];
              myImage2 = document.getElementById(`img_${port2}`);
              myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
            if(newArray[LSBINDEX1] === 0){
              return null;
            }else{
              port1 = newArr[newArray[portIndex1]];
              myImage1 = document.getElementById(`img_${port1}`);
              myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
            }
          }
          console.log("Output block ..");

    return (
        <div>
            
        </div>
    );
}

export default Output;
