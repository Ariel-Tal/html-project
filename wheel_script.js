document.addEventListener('DOMContentLoaded', () => {
    const wheelContent = document.getElementById('wheelContent');
    const spinButton = document.getElementById('spinButton');
    const resultText = document.getElementById('resultText');

    const recipes = [
        { name: "Chocolate Chip Cookies", url: "recipe1.html", color: "#C71585" },
        { name: "Strawberry Cake", url: "recipe2.html", color: "#E2C79D" },
        { name: "Flatbread Pizza", url: "recipe3.html", color: "#F6EB87" },
        { name: "Garlic Rosemary Focaccia", url: "recipe4.html", color: "#A0D295" },
        { name: "Cinnamon Rolls", url: "recipe5.html", color: "#84ADAA" },
        { name: "Buttermilk Pancakes", url: "recipe6.html", color: "#3D6EC9" },
        { name: "Pretzel Bites", url: "recipe7.html", color: "#00254B" },
        { name: "Cheddar Biscuits", url: "recipe8.html", color: "#68346A" }
    ];

    const segmentAngle = 360 / recipes.length;
    let currentRotation = 0;

    function generateWheel() {
        wheelContent.innerHTML = '';
        let conicGradientString = 'conic-gradient(';
        let currentGradientAngle = 0;

        recipes.forEach((recipe, index) => {
            const textElement = document.createElement('div');
            textElement.classList.add('wheel-text');

            const textSpan = document.createElement('span');
            textSpan.textContent = recipe.name;
            textElement.appendChild(textSpan);

            const rotationForTextElement = currentGradientAngle + (segmentAngle / 2);
            textElement.style.transform = `rotate(${rotationForTextElement}deg)`;
            textSpan.style.transform = `rotate(90deg) translateY(-80px)`; // sideways vertical text

            wheelContent.appendChild(textElement);

            conicGradientString += `${recipe.color} ${currentGradientAngle}deg ${currentGradientAngle + segmentAngle}deg`;
            if (index < recipes.length - 1) conicGradientString += ', ';
            currentGradientAngle += segmentAngle;
        });
        conicGradientString += ')';
        wheelContent.style.background = conicGradientString;
    }

    generateWheel();

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;
        resultText.style.opacity = 1;
        resultText.textContent = "Spinning...";

        const randomIndex = Math.floor(Math.random() * recipes.length);
        const selectedRecipe = recipes[randomIndex];

        const targetSegmentMidpoint = randomIndex * segmentAngle + (segmentAngle / 2);
        const degreesToCenterSegment = (360 - targetSegmentMidpoint) % 360;

        const minFullRotations = 5;
        const maxFullRotations = 10;
        const randomFullRotations = Math.floor(Math.random() * (maxFullRotations - minFullRotations + 1)) + minFullRotations;

        const smallOffset = Math.random() * 10 - 5;
        let finalAbsoluteRotation = currentRotation + (randomFullRotations * 360) + degreesToCenterSegment + smallOffset;

        // Reset previous transition
        wheelContent.style.transition = 'none';
        wheelContent.offsetHeight;

        // Smooth spin easing
        wheelContent.style.transition = 'transform 4s cubic-bezier(0.15, 0.85, 0.35, 1.2)';
        wheelContent.style.transform = `rotate(${finalAbsoluteRotation}deg)`;

        currentRotation = finalAbsoluteRotation % 360;

        wheelContent.addEventListener('transitionend', function handler() {
            wheelContent.removeEventListener('transitionend', handler);
            resultText.textContent = `You got: ${selectedRecipe.name}! Redirecting...`;

            setTimeout(() => {
                window.location.href = selectedRecipe.url;
            }, 1500);

            spinButton.disabled = false;
        });
    });
});
