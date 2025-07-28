document.addEventListener('DOMContentLoaded', () => {
    // Select the inner content div that will actually spin
    const wheelContent = document.getElementById('wheelContent'); 
    const spinButton = document.getElementById('spinButton');
    const resultText = document.getElementById('resultText');

    // Define your recipe pages here with distinct colors
    const recipes = [
        { name: "Chocolate Chip Cookies", url: "recipe1.html", color: "#FF0000" }, // Red
        { name: "Strawberry Cake", url: "recipe2.html", color: "#00FF00" },      // Green
        { name: "Flatbread Pizza", url: "recipe3.html", color: "#0000FF" },      // Blue
        { name: "Garlic Rosemary Focaccia", url: "recipe4.html", color: "#FFFF00" }, // Yellow
        { name: "Cinnamon Rolls", url: "recipe5.html", color: "#FFA500" },       // Orange
        { name: "Buttermilk Pancakes", url: "recipe6.html", color: "#800080" },  // Purple
        { name: "Pretzel Bites", url: "recipe7.html", color: "#FFC0CB" },        // Pink
        { name: "Cheddar Biscuits", url: "recipe8.html", color: "#A52A2A" }       // Brown
    ];

    const segmentAngle = 360 / recipes.length;
    let currentRotation = 0; // Keep track of the wheel's current rotation

    // Function to generate the wheel segments (colors) and text elements
    function generateWheel() {
        console.log('--- Generating wheel segments and text elements ---');
        console.log('Number of recipes:', recipes.length);
        console.log('Segment angle for each recipe:', segmentAngle, 'degrees');

        // Clear existing text elements
        wheelContent.innerHTML = ''; 

        let conicGradientString = 'conic-gradient(';
        let currentGradientAngle = 0;

        recipes.forEach((recipe, index) => {
            // Create the text element directly
            const textElement = document.createElement('div');
            textElement.classList.add('wheel-text');
            
            // Create a span inside for the text content
            const textSpan = document.createElement('span');
            textSpan.textContent = recipe.name;
            textElement.appendChild(textSpan);

            // Calculate rotation for the text element
            // This rotates the text element's container to the center of its slice
            const rotationForTextElement = currentGradientAngle + (segmentAngle / 2);
            textElement.style.transform = `rotate(${rotationForTextElement}deg)`;
            
            // Counter-rotate the span inside to keep the text horizontal
            // and position it radially using translateY
            // wheelContent.clientHeight / 2 gives the radius of the inner wheel.
            // Adjust the subtracted value (e.g., 40, 50, 60) to move text further/closer to the center
            textSpan.style.transform = `translateY(-${wheelContent.clientHeight / 2 - 40}px) rotate(-${rotationForTextElement}deg)`;
            
            wheelContent.appendChild(textElement);

            // Build conic gradient string for the wheelContent background
            conicGradientString += `${recipe.color} ${currentGradientAngle}deg ${currentGradientAngle + segmentAngle}deg`;
            if (index < recipes.length - 1) {
                conicGradientString += ', ';
            }
            currentGradientAngle += segmentAngle;
        });
        conicGradientString += ')';
        wheelContent.style.background = conicGradientString; // Apply to wheelContent
        console.log('Conic gradient applied to wheelContent:', conicGradientString);
        console.log('--- Wheel generation complete ---');
    }

    // Call generateWheel on load to set up the visual segments and text
    generateWheel();

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true; // Disable button during spin
        resultText.style.opacity = 1;
        resultText.textContent = "Spinning...";

        // Randomly select a recipe
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const selectedRecipe = recipes[randomIndex];
        console.log('Selected recipe index:', randomIndex, 'Name:', selectedRecipe.name);

        // Calculate target rotation to land the middle of the selected segment under the pointer
        // The pointer is at 0 degrees (top).
        const targetSegmentMidpoint = randomIndex * segmentAngle + (segmentAngle / 2);
        const degreesToCenterSegment = (360 - targetSegmentMidpoint) % 360; 

        // Add enough full rotations to make it spin visibly
        const minFullRotations = 5;
        const maxFullRotations = 10;
        const randomFullRotations = Math.floor(Math.random() * (maxFullRotations - minFullRotations + 1)) + minFullRotations;

        // Total rotation is current position + full spins + degrees to land exactly on segment
        let finalAbsoluteRotation = currentRotation + (randomFullRotations * 360) + degreesToCenterSegment;
        
        // Apply transition and transform to the wheelContent (the inner spinning div)
        wheelContent.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)'; 
        wheelContent.style.transform = `rotate(${finalAbsoluteRotation}deg)`;
        
        // Update currentRotation for next spin (store effective rotation modulo 360)
        currentRotation = finalAbsoluteRotation % 360; 
        console.log('Total rotation applied:', finalAbsoluteRotation, 'deg. New effective rotation:', currentRotation, 'deg.');

        // Listen for the end of the transition
        wheelContent.addEventListener('transitionend', function handler() {
            wheelContent.removeEventListener('transitionend', handler); // Remove the listener to prevent it from firing multiple times

            resultText.textContent = `You got: ${selectedRecipe.name}! Redirecting...`;
            resultText.style.opacity = 1;
            console.log('Spin complete. Result:', selectedRecipe.name);

            // Wait a moment before redirecting for the user to see the result
            setTimeout(() => {
                console.log('Redirecting to:', selectedRecipe.url);
                window.location.href = selectedRecipe.url;
            }, 1500); // Redirect after 1.5 seconds

            spinButton.disabled = false; // Re-enable spin button 
        });
    });
});