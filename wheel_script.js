document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements using var for basic JavaScript compatibility
    var wheelContent = document.getElementById('wheelContent');
    var spinButton = document.getElementById('spinButton');
    var resultText = document.getElementById('resultText');

    // Recipe data
    var recipes = [
        { name: "Chocolate Chip Cookies", url: "recipe1.html", color: "#C71585" },
        { name: "Strawberry Cake", url: "recipe2.html", color: "#E2C79D" },
        { name: "Flatbread Pizza", url: "recipe3.html", color: "#F6EB87" },
        { name: "Garlic Rosemary Focaccia", url: "recipe4.html", color: "#A0D295" },
        { name: "Cinnamon Rolls", url: "recipe5.html", color: "#84ADAA" },
        { name: "Buttermilk Pancakes", url: "recipe6.html", color: "#3D6EC9" },
        { name: "Pretzel Bites", url: "recipe7.html", color: "#00254B" },
        { name: "Cheddar Biscuits", url: "recipe8.html", color: "#68346A" }
    ];

    var segmentAngle = 360 / recipes.length;
    var currentRotation = 0; // This variable's purpose is largely for conceptual understanding now, as CSS handles the actual visual rotation

    // Function to generate the wheel's visual appearance
    function generateWheel() {
        var conicGradientParts = [];
        var currentGradientAngle = 0;

        // Clear existing content
        wheelContent.innerHTML = '';

        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i];
            var startAngle = i * segmentAngle;
            var endAngle = (i + 1) * segmentAngle;

            // Build conic gradient string part by part
            conicGradientParts.push(recipe.color + ' ' + startAngle + 'deg ' + endAngle + 'deg');

            // Create and position text elements
            var textElement = document.createElement('div');
            textElement.className = 'wheel-text'; // Use className for older compatibility

            var textSpan = document.createElement('span'); // Span for actual text content
            textSpan.textContent = recipe.name;
            textElement.appendChild(textSpan);

            // Calculate rotation for the text element itself
            var rotationForTextElement = currentGradientAngle + (segmentAngle / 2);
            textElement.style.transform = 'rotate(' + rotationForTextElement + 'deg)';

            // Rotate the span content to be upright/readable
            textSpan.style.transform = 'rotate(90deg) translateY(-80px)'; // Adjusted for sideways vertical text

            wheelContent.appendChild(textElement);
            currentGradientAngle += segmentAngle;
        }

        // Apply the generated conic gradient background
        wheelContent.style.background = 'conic-gradient(' + conicGradientParts.join(', ') + ')';
    }

    // Call generateWheel to set up the wheel when the page loads
    generateWheel();

    // Event listener for the spin button
    spinButton.addEventListener('click', function() {
        spinButton.disabled = true; // Disable button during spin
        resultText.style.opacity = 1;
        resultText.textContent = "Spinning...";

        // Select a random recipe
        var randomIndex = Math.floor(Math.random() * recipes.length);
        var selectedRecipe = recipes[randomIndex];

        // Calculate the target rotation for the spin
        var minFullRotations = 5;
        var degreesToCenterSegment = (360 - (randomIndex * segmentAngle + (segmentAngle / 2))) % 360;
        var smallOffset = Math.random() * 10 - 5; // Small random offset for variety

        // The total degrees the wheel will rotate
        var finalAbsoluteRotation = currentRotation + (minFullRotations * 360) + degreesToCenterSegment + smallOffset;

        // Apply the transition and transform
        wheelContent.style.transition = 'transform 4s cubic-bezier(0.15, 0.85, 0.35, 1.2)';
        wheelContent.style.transform = 'rotate(' + finalAbsoluteRotation + 'deg)';

        // Update currentRotation for next spin (maintaining visual continuity if desired)
        currentRotation = finalAbsoluteRotation % 360; // Keep currentRotation within 0-359

        // Function to handle the end of the transition
        function onTransitionEndHandler() {
            // Remove the event listener to prevent it from firing on subsequent transitions
            wheelContent.removeEventListener('transitionend', onTransitionEndHandler);

            resultText.textContent = 'You got: ' + selectedRecipe.name + '! Redirecting...';

            // Redirect after a short delay
            setTimeout(function() {
                window.location.href = selectedRecipe.url;
            }, 1500);

            spinButton.disabled = false; // Re-enable the button
        }

        // Add event listener for when the CSS transition completes
        wheelContent.addEventListener('transitionend', onTransitionEndHandler);
    });
});