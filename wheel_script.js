document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  var wheel = document.getElementById('wheelContent');
  var button = document.getElementById('spinButton');
  var result = document.getElementById('resultText');

  // Recipe names, links, and colors
  var recipes = ["Cookies", "Cake", "Pizza", "Focaccia", "Rolls", "Pancakes", "Pretzels", "Biscuits"];
  var links = ["recipe1.html", "recipe2.html", "recipe3.html", "recipe4.html", "recipe5.html", "recipe6.html", "recipe7.html", "recipe8.html"];
  var colors = ["#C71585", "#E2C79D", "#F6EB87", "#A0D295", "#84ADAA", "#3D6EC9", "#00254B", "#68346A"];

  var angle = 360 / recipes.length;
  var rotation = 0;

  // Draw the wheel
  function drawWheel() {
    wheel.innerHTML = '';
    var background = [];

    for (var i = 0; i < recipes.length; i++) {
      var start = i * angle;
      var end = start + angle;
      background.push(colors[i] + ' ' + start + 'deg ' + end + 'deg');

      var label = document.createElement('div');
      label.className = 'wheel-text';
      label.style.transform = 'rotate(' + (start + angle / 2) + 'deg)';

      var span = document.createElement('span');
      span.textContent = recipes[i];
      span.style.transform = 'rotate(90deg) translateY(-80px)';

      label.appendChild(span);
      wheel.appendChild(label);
    }

    wheel.style.background = 'conic-gradient(' + background.join(', ') + ')';
  }

  drawWheel();

  // Spin the wheel
  button.addEventListener('click', function() {
    button.disabled = true;
    result.textContent = "Spinning...";

    var pick = Math.floor(Math.random() * recipes.length);
    var target = (360 - (pick * angle + angle / 2)) % 360;
    var spinAmount = rotation + 360 * 5 + target + (Math.random() * 10 - 5);

    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = 'rotate(' + spinAmount + 'deg)';
    rotation = spinAmount % 360;

    wheel.addEventListener('transitionend', function done() {
      wheel.removeEventListener('transitionend', done);
      result.textContent = "You got: " + recipes[pick] + "!";
      setTimeout(function() {
        window.location.href = links[pick];
      }, 1500);
      button.disabled = false;
    });
  });
});
