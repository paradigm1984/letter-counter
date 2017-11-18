// select the form with d3 on submit.
d3.select("form")
  .on("submit", function() {
    // d3 has acess to the event object. were calling it and preventDefault to not refresh the page.
    d3.event.preventDefault();

    // hide the placeholder spacer div
    d3.select("#placeholder")
      .style("display", "none")

    // select the input element and put it in a const
    const input = d3.select("input");
    // get the value of the input val which would be what the user submits and put it in a const
    const text = input.property("value");

    // first selecting the div with the id of letters and store it in a variable.
    const letters = d3.select("#letters")
      // and then selecting all elements within the selected element with a class of letter.
      // since there are none initially, its empty.
      .selectAll(".letter")
      // joins the data with the dat method, which is the letters from the input.
      .data(getFrequencies(text), function(d) {
        return d.character;
      });
    // want to make sure none of the elements have the class of new since elements in the update
    // selection already exist on the page.
    letters.classed("new", false)
      .exit()
      .remove();

    // the enter function gets ready to update
    letters.enter()
      // append a div for each piece of data
      .append("div")
        // give that div a class of letter and style it
        .classed("letter", true)
        // add the class of new to the new letters so theyre styled a bit differently
        .classed("new", true)
    // merge the updated letters with the rest
    .merge(letters)
        .style("width", "25px")
        .style("line-height", "16px")
        .style("margin-right", "5px")
        // make the height a function that adds 20 px per count
        .style("height", function(d) {
          return d.count * 20 + "px";
        })
        // use .text() to print out the character in the div.
        .text(function(d) {
          return d.character
        })
    // select the div with the id phrase with d3
    d3.select("#phrase")
          // add some text
          .text("Analysis of: " + "'" + text + "'");
    d3.select("#count")
          .text("(New Characters: " + letters.enter().nodes().length + ")");
    // clear the input after.
    input.property("value", "");
  });

// a function to calculate letter frequencies for the words typed.
// passing a string into it which we will later grab from the input field.
function getFrequencies(str) {
  // this function will return an array of objects where each object stores the character
  // and its count as values
  // the .split() method splits the string specifically by character because of the "".
  // otherwise it would do it by word.
  // the .sort() method then sorts them alphabetically. because of this, all repeated letters
  // will come sequentially, which helps in the logic.
  const sorted = str.split("").sort();
  // set up the array empty and give it a constiable name.
  const data = [];

  // cycle through the sorted array
  for (var i = 0; i < sorted.length; i++) {
    // grabbing the last item in the array by making last the array length -1 since arrays start at 0
    const last = data[data.length -1];
    // if there is a last character and that last character property (last.character) === the current index of sorted,
    // incriment the count.
    if (last && last.character === sorted[i]) last.count++;
    // else make a push (new object in the array) with the character property as the item in the array
    // at the current index and the count as 1.
    else data.push({character: sorted[i], count: 1});
  }
  return data;
}
