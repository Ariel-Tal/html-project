document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we'll be working with.
    // Using 'var' for variables is a very basic JavaScript way to declare them.
    var wheelContent = document.getElementById('wheelContent');
    var spinButton = document.getElementById('spinButton');
    var resultText = document.getElementById('resultText');

    // Here are all the recipes for our spinning wheel.
    // Each recipe has a name, a link to its page, and a color for the wheel segment.
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

    // Calculate how big each slice of the wheel should be in degrees.
    var segmentAngle = 360 / recipes.length;
    // This variable will help us remember how much the wheel has rotated so far.
    var lastKnownRotation = 0;

    // This function draws the wheel and puts the recipe names on it.
    function generateWheel() {
        var conicGradientParts = []; // We'll build a list of colors for the wheel's background.
        var currentGradientAngle = 0; // Helps us keep track of where each color starts.

        // Clear anything that might already be inside the wheel.
        wheelContent.innerHTML = '';

        // Go through each recipe one by one.
        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i]; // Get the current recipe.
            var startAngle = i * segmentAngle; // Calculate where this segment starts.
            var endAngle = (i + 1) * segmentAngle; // Calculate where this segment ends.

            // Add the current recipe's color and angles to our list for the wheel's background.
            conicGradientParts.push(recipe.color + ' ' + startAngle + 'deg ' + endAngle + 'deg');

            // Now, let's create a place for the recipe name on the wheel.
            var textElement = document.createElement('div');
            textElement.className = 'wheel-text'; // Give it a class for styling.

            var textSpan = document.createElement('span'); // Create a 'span' to hold the actual text.
            textSpan.textContent = recipe.name; // Put the recipe name in the span.
            textElement.appendChild(textSpan); // Add the span to the text element.

            // Figure out how much to rotate this text element so it's in the middle of its segment.
            var rotationForTextElement = currentGradientAngle + (segmentAngle / 2);
            // Apply the rotation to the text element.
            textElement.style.transform = 'rotate(' + rotationForTextElement + 'deg)';

            // Rotate the actual text inside the span to make it readable (sideways vertical).
            textSpan.style.transform = 'rotate(90deg) translateY(-80px)';

            // Add this text element to the wheel.
            wheelContent.appendChild(textElement);
            currentGradientAngle += segmentAngle; // Move to the start of the next segment.
        }

        // Apply all the colors we collected to make the wheel's background.
        wheelContent.style.background = 'conic-gradient(' + conicGradientParts.join(', ') + ')';
    }

    // Call this function right away to set up the wheel when the page loads.
    generateWheel();

    // Set up what happens when the spin button is clicked.
    spinButton.addEventListener('click', function() {
        spinButton.disabled = true; // Stop people from clicking the button again while spinning.
        resultText.style.opacity = 1; // Make sure the "Spinning..." text is visible.
        resultText.textContent = "Spinning..."; // Show the spinning message.

        // Pick a random recipe from our list.
        var randomIndex = Math.floor(Math.random() * recipes.length);
        var selectedRecipe = recipes[randomIndex]; // This is the recipe we landed on!

        // Calculate how much the wheel needs to spin.
        var minFullRotations = 5; // Spin at least 5 full times for a dramatic effect.
        // Figure out the angle needed to land the *center* of the selected segment at the top.
        var degreesToCenterSegment = (360 - (randomIndex * segmentAngle + (segmentAngle / 2)));
        var smallOffset = Math.random() * 10 - 5; // Add a tiny random wobble so it doesn't always land exactly the same.

        // Calculate the total rotation needed from its *current* position.
        var totalRotation = (minFullRotations * 360) + degreesToCenterSegment + smallOffset;
        // Add this to where the wheel was last, so it keeps spinning in the same direction.
        var targetRotation = lastKnownRotation + totalRotation;

        // Make the wheel smoothly spin using CSS transitions.
        wheelContent.style.transition = 'transform 4s cubic-bezier(0.15, 0.85, 0.35, 1.2)';
        wheelContent.style.transform = 'rotate(' + targetRotation + 'deg)';

        // Remember this new rotation for the next time someone spins.
        lastKnownRotation = targetRotation;

        // This function will run when the spinning animation finishes.
        function onTransitionEndHandler() {
            // Remove this listener so it doesn't accidentally run multiple times.
            wheelContent.removeEventListener('transitionend', onTransitionEndHandler);

            resultText.textContent = 'You got: ' + selectedRecipe.name + '! Redirecting...';

            // Wait a moment, then go to the recipe page.
            setTimeout(function() {
                window.location.href = selectedRecipe.url;
            }, 1500); // Wait 1.5 seconds.

            spinButton.disabled = false; // Enable the spin button again.
        }

        // Listen for when the CSS animation finishes.
        wheelContent.addEventListener('transitionend', onTransitionEndHandler);
    });
});