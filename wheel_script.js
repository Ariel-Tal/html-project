document.addEventListener('DOMContentLoaded', function() {
  const wheelContent = document.getElementById('wheelContent');
  const spinButton = document.getElementById('spinButton');
  const resultText = document.getElementById('resultText');

 
  const fullRecipeNames = ["Chocolate Chip Cookies", "Strawberry Cake", "Flatbread Pizza", "Garlic Rosemary Focaccia", "Cinnamon Rolls", "Buttermilk Pancakes", "Pretzel Bites", "Cheddar Biscuits"];
  const links = ["recipe1.html", "recipe2.html", "recipe3.html", "recipe4.html", "recipe5.html", "recipe6.html", "recipe7.html", "recipe8.html"];
  const colors = ["#C71585", "#E2C79D", "#F6EB87", "#A0D295", "#84ADAA", "#3D6EC9", "#00254B", "#68346A"];

  const sliceAngle = 360 / fullRecipeNames.length;
  let currentRotation = 0;
  let isSpinning = false;

  function drawWheel() {
    wheelContent.innerHTML = ''; // Clear previous content
    const background = [];

    fullRecipeNames.forEach((recipe, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const sliceColor = colors[i % colors.length];
      background.push(`${sliceColor} ${startAngle}deg ${endAngle}deg`);
    });

    wheelContent.style.background = `conic-gradient(${background.join(', ')})`;
  }

  spinButton.addEventListener('click', () => {
    if (isSpinning) return;

    isSpinning = true;
    spinButton.disabled = true;
    resultText.textContent = "Spinning...";
    resultText.style.opacity = 1;

    const randomIndex = Math.floor(Math.random() * fullRecipeNames.length);
    const targetAngle = 360 - (randomIndex * sliceAngle);
    const midSliceCorrection = sliceAngle / 2;

    const spinAmount = currentRotation + (360 * 10) + targetAngle - midSliceCorrection;
    
    wheelContent.style.transition = 'transform 4s ease-out';
    wheelContent.style.transform = `rotate(${spinAmount}deg)`;
    
    wheelContent.addEventListener('transitionend', () => {
      currentRotation = spinAmount % 360;
      resultText.textContent = `You got: ${fullRecipeNames[randomIndex]}!`;

      setTimeout(() => {
        window.location.href = links[randomIndex];
      }, 1500);
    }, { once: true });
  });
  
  drawWheel();
});