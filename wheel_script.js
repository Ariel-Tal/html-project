document.addEventListener('DOMContentLoaded', function() {
    // Get the HTML elements
    var wheelContent = document.getElementById('wheelContent');
    var spinButton = document.getElementById('spinButton');
    var resultText = document.getElementById('resultText');

    // List of recipes
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

    var totalSegments = recipes.length;
    var anglePerSegment = 360 / totalSegments;
    var currentRotation = 0;

    // Make the spinning wheel
    function makeWheel() {
        wheelContent.innerHTML = '';
        var backgroundParts = [];
        var rotation = 0;

        for (var i = 0; i < recipes.length; i++) {
            var start = i * anglePerSegment;
            var end = start + anglePerSegment;
            backgroundParts.push(recipes[i].color + ' ' + start + 'deg ' + end + 'deg');

            var label = document.createElement('div');
            label.className = 'wheel-text';

            var labelText = document.createElement('span');
            labelText.textContent = recipes[i].name;
            label.appendChild(labelText);

            label.style.transform = 'rotate(' + (rotation + anglePerSegment / 2) + 'deg)';
            labelText.style.transform = 'rotate(90deg) translateY(-80px)';

            wheelContent.appendChild(label);
            rotation += anglePerSegment;
        }

        wheelContent.style.background = 'conic-gradient(' + backgroundParts.join(', ') + ')';
    }

    makeWheel();

    // When the spin button is clicked
    spinButton.addEventListener('click', function() {
        spinButton.disabled = true;
        resultText.style.opacity = 1;
        resultText.textContent = "Spinning...";

        var randomIndex = Math.floor(Math.random() * recipes.length);
        var recipe = recipes[randomIndex];

        var extraSpins = 5;
        var spinTo = (360 - (randomIndex * anglePerSegment + anglePerSegment / 2)) % 360;
        var littleOffset = Math.random() * 10 - 5;

        var totalSpin = currentRotation + (extraSpins * 360) + spinTo + littleOffset;

        wheelContent.style.transition = 'transform 4s ease-out';
        wheelContent.style.transform = 'rotate(' + totalSpin + 'deg)';

        currentRotation = totalSpin % 360;

        wheelContent.addEventListener('transitionend', function afterSpin() {
            wheelContent.removeEventListener('transitionend', afterSpin);
            resultText.textContent = "You got: " + recipe.name + "! Redirecting...";
            setTimeout(function() {
                window.location.href = recipe.url;
            }, 1500);
            spinButton.disabled = false;
        });
    });
});
