document.addEventListener('DOMContentLoaded', function() {
  // waits for the entire html document to load before running the javascript
  const wheelContent = document.getElementById('wheelContent');
  const spinButton = document.getElementById('spinButton');
  const resultText = document.getElementById('resultText');

  // data for the wheel's content and links
  const fullRecipeNames = ["Chocolate Chip Cookies", "Strawberry Cake", "Flatbread Pizza", "Garlic Rosemary Focaccia", "Cinnamon Rolls", "Buttermilk Pancakes", "Pretzel Bites", "Cheddar Biscuits"];
  const links = ["recipe1.html", "recipe2.html", "recipe3.html", "recipe4.html", "recipe5.html", "recipe6.html", "recipe7.html", "recipe8.html"];
  const colors = ["#C71585", "#E2C79D", "#F6EB87", "#A0D295", "#84ADAA", "#3D6EC9", "#00254B", "#68346A"];

  const sliceAngle = 360 / fullRecipeNames.length; // calculates the angle for each wheel slice
  let currentRotation = 0; // tracks the wheel's rotation for continuous spins
  let isSpinning = false; // flag to prevent multiple spins at once

  function drawWheel() {
    wheelContent.innerHTML = ''; // clears any old wheel content before redrawing
    const background = [];

    fullRecipeNames.forEach((recipe, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const sliceColor = colors[i % colors.length];
      background.push(`${sliceColor} ${startAngle}deg ${endAngle}deg`);
    });

    // applies the conic gradient to create the colored wheel slices
    wheelContent.style.background = `conic-gradient(${background.join(', ')})`;
  }

  spinButton.addEventListener('click', () => {
    if (isSpinning) return; // stops if wheel is already spinning

    isSpinning = true; // sets spinning flag
    spinButton.disabled = true; // disables button to prevent re-clicking
    resultText.textContent = "spinning..."; // updates the status text
    resultText.style.opacity = 1; // makes the result text visible

    const randomIndex = Math.floor(Math.random() * fullRecipeNames.length); // picks a random winning recipe
    const targetAngle = 360 - (randomIndex * sliceAngle); // calculates rotation needed to land on that recipe
    const midSliceCorrection = sliceAngle / 2; // adjusts to land in the middle of the winning recipe slice

    // calculates total rotation including multiple full spins for building up excitement
    const spinAmount = currentRotation + (360 * 5) + targetAngle - midSliceCorrection;
    
    wheelContent.style.transition = 'transform 4s ease-out'; // sets the animation duration and easing
    wheelContent.style.transform = `rotate(${spinAmount}deg)`; // applies the calculated rotation

    // waits for the spinning animation to complete
    wheelContent.addEventListener('transitionend', () => {
      currentRotation = spinAmount % 360; // updates rotation for subsequent spins
      resultText.textContent = `you got: ${fullRecipeNames[randomIndex]}!`; // displays the winning recipe

      // redirects to the recipe page after a short delay for the user to see the result text
      setTimeout(() => {
        window.location.href = links[randomIndex];
      }, 1500);
    }, { once: true }); // ensures this event listener runs only once per spin
  });
  
  drawWheel(); // draws the wheel when the page first loads
});