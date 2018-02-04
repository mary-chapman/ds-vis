var svgContainerColor = "#F6F6F6"
var svgContainerHeight = 80;
var svgContainerWidth = 100;
//var svgContainerFirstMargin = (100 - (10 * arraySquareWidth)) / 10;

var arraySquareXLocation = 0;
//var arraySquareYLocation = 0;
var arraySquareHeight = 50;
var arraySquareWidth = svgContainerWidth / 10;
var arraySquareColor = "#464A63";


//to create the array squares SVG container
var container = d3
  .select(".svgContainer")
  .append("svg")
  .attr("height", svgContainerHeight)
  .attr("width", `${svgContainerWidth}%`)
  //.style("background-color", svgContainerColor)
  //.style("box-shadow", "2px 2px 8px #888888")

//to create the SQUARE
for (var i = 0; i < 10; i++) {
   container
      .append("rect")
      .attr("x", arraySquareXLocation + "%")
      .attr("y", 0)
      .attr("height", arraySquareHeight)
      .attr("width", `${arraySquareWidth}%`)
      .attr("fill", arraySquareColor)
      .style("stroke", "white")
      .style("stroke-width", 1)
      arraySquareXLocation += 10;
}

//creates LETTER TEXT in the array
function createText() {
  return container.append("text")
         .attr("x", 0)
         .attr("y", svgContainerHeight/2 - 8)
         .attr("font-family", "Arial Black")
         .attr("font-size", "20px")
         .attr("fill", "white")
         .attr("text-anchor", "middle")
         .text("X")
  }

  //to create top index pointer

//stack class with properties to push data to array squares
//var textDataXStartLocation = 0;
//var textDataYLocation = 45;

class Stack {
  constructor() {
    this.data = [],
    this.top = -1,
    this.dataXMove = 0;
    this.letterCode = 96;
    //this.svgXMove = 10;
  }
  isEmpty() {
    return this.top === -1 ? true : false;
  }
  pushData() {
    createText().transition().attr("x", `${this.dataXMove + arraySquareWidth/2}%`).duration(1000);

    document.getElementsByClassName("topSVG")[0].style.display = "inline";
    document.getElementsByClassName("topSVG")[0].style.marginLeft = `${this.dataXMove}%`;

    this.dataXMove = this.dataXMove + arraySquareWidth;
  }




  /**********************

    //pushes the letters to the data array
    this.data.push(textData);

    //to push the data across the screen
    if (this.isEmpty()) {
      console.log("empty")
      this.dataXMove += (arraySquareWidth/2) + svgContainerFirstMargin;
    } else {
      console.log("NOT empty")
      this.dataXMove += arraySquareWidth;
    }
    console.log(this.dataXMove);
    textData.transition().attr("x", `${this.dataXMove}%`).duration(1000);

    this.top++;

    **************/


    //document.getElementsByClassName("topIndex")[0].innerHTML = this.top;

    // //changes the HTML
    // if (this.dataXLocation === 0) {
    //   this.dataXLocation += 5
    //   document.getElementsByClassName("dataArray")[0].innerHTML += `${String.fromCharCode(this.letterCode)}`;
    // } else {
    //   this.dataXLocation += 10
    //   document.getElementsByClassName("dataArray")[0].innerHTML += `, ${String.fromCharCode(this.letterCode)}`;
    // }
    // textData.transition().attr("x", `${this.dataXLocation}%`).duration(1000);
    //
    // document.getElementsByClassName("topSVG")[0].style.marginLeft = `${this.svgXMove}%`;
    // this.svgXMove += 10;


  peekData() {
    if (this.top < 0) {
      return null;
    }
    console.log(this.data[this.top]);
    this.data[this.top].transition().attr("fill", "orange");
    document.getElementsByClassName("returnVal")[0].innerHTML = String.fromCharCode(this.letterCode);
    //this.data[this.top]._groups[0][0].innerHTML
  }
  popData() {
    this.data[this.top].transition().attr("y", 30).duration(100).transition().attr("y", 200).duration(2000);
    this.dataXLocation -= 10;
    this.data.pop();
    this.top = this.top - 1;

    document.getElementsByClassName("topSVG")[0].style.marginLeft = `${this.dataXLocation-3.5}%`;
  }
} //stack end

//creates a new stack
var stack = new Stack();
//runs actions when buttons are pushed

//When ISEMPTY() is pressed:
document.getElementsByClassName("isEmptyBtn")[0].onclick = () => {
    console.log(stack.isEmpty());
    if (stack.isEmpty()) {
      document.getElementsByClassName("return")[0].innerHTML = '<p>true</p>'
    } else {
      document.getElementsByClassName("return")[0].innerHTML = '<p>false</p>'
    }
  }
document.getElementsByClassName("pushBtn")[0].onclick = () => stack.pushData();
document.getElementsByClassName("peekBtn")[0].onclick = () => stack.peekData();
document.getElementsByClassName("popBtn")[0].onclick = () => stack.popData();
