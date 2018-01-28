var svgContainerColor = "blue"
var svgContainerHeight = 80;
var svgContainerWidth = "100%";

var arraySquareXLocation = 1.5;
var arraySquareYLocation = 12.5;
var arraySquareHeight = 50;
var arraySquareWidth = "7.5%";
var arraySquareColor = "yellow";

//to create the array squares SVG container
var container = d3
  .select(".svgContainer")
  .append("svg")
  .attr("height", svgContainerHeight)
  .attr("width", svgContainerWidth)
  .style("background-color", svgContainerColor);

//to create array squares
for (var i = 0; i < 10; i++) {
   container
      .append("rect")
      .attr("x", arraySquareXLocation + "%")
      .attr("y", arraySquareYLocation)
      .attr("height", arraySquareHeight)
      .attr("width", arraySquareWidth)
      .attr("fill", arraySquareColor);
    arraySquareXLocation += 10;
}

//stack class with properties to push data to array squares
var textDataXStartLocation = 0;
var textDataYLocation = 45;

class Stack {
  constructor() {
    this.data = [],
    this.top = -1,
    this.dataXLocation = 0;
    this.letter = 97;
  }
  pushData() {
    this.top++;
    document.getElementsByClassName("topIndex")[0].innerHTML = this.top;
    //creates letters in the array
    var textData = container.append("text")
             .attr("x", textDataXStartLocation)
             .attr("y", textDataYLocation)
             .attr("font-family", "Arial Black")
             .attr("font-size", "20px")
             .attr("fill", "white")
             .attr("text-anchor", "middle")
             .text(String.fromCharCode(this.letter))
    //pushes the letters to the data array
    this.data.push(textData);
    //changes the HTML
    if (this.dataXLocation === 0) {
      this.dataXLocation += 5
      document.getElementsByClassName("dataArray")[0].innerHTML += `"${String.fromCharCode(this.letter)}"`;
    } else {
      this.dataXLocation += 10
      document.getElementsByClassName("dataArray")[0].innerHTML += `, "${String.fromCharCode(this.letter)}"`;
    }
    textData.transition().attr("x", `${this.dataXLocation}%`).duration(1000);
    document.getElementsByClassName("topSVG")[0].style.marginLeft = `${this.dataXLocation-5}%`;
    this.letter++;
  }
} //stack end

//creates a new stack
var stack = new Stack();
//runs actions when buttons are pushed
document.getElementsByClassName("pushBtn")[0].onclick = () => stack.pushData();
