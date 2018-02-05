var svgContainerColor = "#F6F6F6"
var svgContainerHeight = 50;
var svgContainerWidth = 100;
//var svgContainerFirstMargin = (100 - (10 * arraySquareWidth)) / 10;

var arraySquareXLocation = 0;
//var arraySquareYLocation = 0;
var arraySquareHeight = 50;
var arraySquareWidth = svgContainerWidth / 10;
var arraySquareColor = "#464A63";

var topIndexHeight = 25;

var containerSVGIndex = d3
  .select(".row_topIndex")
  .append("svg")
  .attr("height", 50)
  .attr("width", `${svgContainerWidth}%`)

//to create the array squares SVG container
var container = d3
  .select(".svgContainer")
  .append("svg")
  .attr("height", svgContainerHeight)
  .attr("width", `${svgContainerWidth}%`)

//to create the top index pointer visual
  var topIndexPointer = containerSVGIndex
     .append("rect")
     .attr("x", `-${svgContainerWidth}%`)
     .attr("y", topIndexHeight)
     .attr("height", topIndexHeight)
     .attr("width", `${arraySquareWidth}%`)
     .attr("fill", "#6c5382")

//to create text for the top index pointer visual
var topIndexPointerText = containerSVGIndex.append("text")
  .attr("x", `-${svgContainerWidth}%`)
  .attr("y", topIndexHeight + (topIndexHeight/2))
  .attr("font-family", "Arial Black")
  .attr("font-size", "16px")
  .attr("fill", "white")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .text("TOP")

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
function createText(txt) {
  return container.append("text")
         .attr("x", 0)
         .attr("y", svgContainerHeight/2)
         .attr("font-family", "Arial Black")
         .attr("font-size", "20px")
         .attr("fill", "white")
         .attr("text-anchor", "middle")
         .attr("dominant-baseline", "central")
         .text(txt)
  }

var returnInnerHTML = document.getElementsByClassName("return")[0].innerHTML;

class Stack {
  constructor() {
    this.data = [],
    this.dataLetters = [];
    this.top = -1,
    this.dataXMove = 0;
    this.letterCode = 97; //97 = ascii code for "a"
    //this.svgXMove = 10;
  }
  //to retore colors after peek() has been run
  resetColors() {
    this.data[this.top].attr("fill", "white")
    topIndexPointer.attr("fill", "#6c5382");
  }
  isEmpty() {
    if (this.top === -1) {
      document.getElementsByClassName("return")[0].innerHTML = '<p>true</p>'
      return true;
    } else {
      this.resetColors();
      document.getElementsByClassName("return")[0].innerHTML = '<p>false</p>'
      return false;
    }
  }
  pushData() {
    if (this.top < 9) {
      //creates the letters
      var newLetter = createText(String.fromCharCode(this.letterCode));
      newLetter.transition().attr("x", `${this.dataXMove + arraySquareWidth/2}%`).duration(1000);
      this.data.push(newLetter);
      this.dataLetters.push(String.fromCharCode(this.letterCode))
      //moving the text when pushed
      if (this.isEmpty()) {
        topIndexPointer.transition().attr("x", 0).duration(1000);
        topIndexPointerText.transition().attr("x", `${arraySquareWidth/2}%`).duration(1000);
      } else {
        this.resetColors();
        topIndexPointer.transition().attr("x", `${this.dataXMove}%`).duration(1000);
        topIndexPointerText.transition().attr("x", `${this.dataXMove + arraySquareWidth/2}%`).duration(1000);
      }
      //to update values to prepare for next push
      //this.data.push(String.fromCharCode(this.letterCode))
      this.dataXMove = this.dataXMove + arraySquareWidth;
      this.top++;
      if (this.letterCode === 122) {
        this.letterCode = 97;
      } else {
        this.letterCode++;
      }
      //to change the HTML
      document.getElementsByClassName("letterToPush")[0].innerHTML = String.fromCharCode(this.letterCode);
      document.getElementsByClassName("return")[0].innerHTML = '<p style="color:#d6d6d6"><i>* no return value</i></p>'
    } else {
      document.getElementsByClassName("return")[0].innerHTML = '<p>overflow: max size reached</p>'
    }
    document.getElementsByClassName("dataArray")[0].innerHTML = `[${this.dataLetters}]`
    document.getElementsByClassName("topIndex")[0].innerHTML = this.top;
  }
  peekData() {
    if (this.top < 0) {
      document.getElementsByClassName("return")[0].innerHTML = '<p>null</p>'
    } else {
      console.log(this.data[this.top])
      this.data[this.top].attr("fill", "#86E766")
      topIndexPointer.transition().attr("fill", "#86E766" )
      document.getElementsByClassName("return")[0].innerHTML = `<p>${this.dataLetters[this.top]}</p>`
    }
  }
  popData() {
    if (this.isEmpty()) {
      document.getElementsByClassName("return")[0].innerHTML = '<p>underflow</p>'
    } else {
      this.resetColors();
      //update return value to be the letter removed
      document.getElementsByClassName("return")[0].innerHTML = `<p>${this.dataLetters[this.top]}</p>`

      this.dataXMove -= arraySquareWidth;
      console.log(this.dataXMove)
      this.dataLetters.pop();
      //removes letters vis
      this.data[this.top].transition().attr("y", -.25).duration(250).transition().attr("y", 200).duration(1500);
      //moves the top index vis
      topIndexPointer.transition().attr("x", `${this.dataXMove - arraySquareWidth}%`).duration(1000);
      topIndexPointerText.transition().attr("x", `${this.dataXMove - arraySquareWidth/2}%`).duration(1000);
      //updates properties
      this.top--;
      this.data.pop();
      //update HTML
      document.getElementsByClassName("dataArray")[0].innerHTML = `[${this.dataLetters}]`
      document.getElementsByClassName("topIndex")[0].innerHTML = this.top;
    }
  }//pop() end
} //stack end

//creates a new stack
var stack = new Stack();
//runs actions when buttons are pushed

//When ISEMPTY() is pressed:
document.getElementsByClassName("isEmptyBtn")[0].onclick = () => stack.isEmpty();
document.getElementsByClassName("pushBtn")[0].onclick = () => stack.pushData();
document.getElementsByClassName("peekBtn")[0].onclick = () => stack.peekData();
document.getElementsByClassName("popBtn")[0].onclick = () => stack.popData();
