//for array container
var container = d3
  .select(".svgContainer")
  .append("svg")
  .attr("height", 175)
  .attr("width", "95%")
  .style("background-color", "#94b0e8");



//for container squares
var horizantalSqXLoc = 1.5;
for (var i = 0; i < 10; i++) {
   container
    .append("rect")
    .attr("x", horizantalSqXLoc + "%")
    .attr("y", 12.5)
    .attr("height", 50)
    .attr("width", "7%")
    .attr("fill", "#cdddf7");

    horizantalSqXLoc += 10;
}

//stack class with properties to push data to array squares
class Stack {
  constructor() {
    this.data = [],
    this.top = -1,
    this.x = 0;
    this.letter = 97;
  }
  pushData() {
    this.top++;
    document.getElementsByClassName("topIndex")[0].innerHTML = this.top;

    var textData = container.append("text")
             .attr("x", 0)
             .attr("y", 45)
             .attr("font-family", "Arial Black")
             .attr("font-size", "20px")
             .attr("fill", "white")
             .attr("text-anchor", "middle")
             .text(String.fromCharCode(this.letter))

    this.data.push(textData);
    if (this.x === 0) {
      this.x += 5
      document.getElementsByClassName("dataArray")[0].innerHTML += `"${String.fromCharCode(this.letter)}"`;
    } else {
      this.x += 10
      document.getElementsByClassName("dataArray")[0].innerHTML += `, "${String.fromCharCode(this.letter)}"`;
    }
    textData.transition().attr("x", `${this.x}%`).duration(1000);

    document.getElementsByClassName("topIndexImage")[0].style.marginLeft = `${this.x-4}%`;

    this.letter++;

  }
} //stack end

var stack = new Stack();

document.getElementsByClassName("pushBtn")[0].onclick = () => stack.pushData();

// container.append("text")
//          .attr("x", "5%")
//          .attr("y", 45)
//          .attr("font-family", "Arial Black")
//          .attr("font-size", "20px")
//          .attr("fill", "white")
//          .attr("text-anchor", "middle")
//          .text("a")
