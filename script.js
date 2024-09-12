const items = [
  { color: "red", rating: 1 },
  { color: "yellow", rating: 2 },
  { color: "green", rating: 3 },
  { color: "blue", rating: 4 },
  { color: "grey", rating: 5 },
  { color: "black", rating: 6 },
  { color: "purple", rating: 7 },
];

const roulette = document.getElementById("roulette");
let isSpinning = true;

function generateRandomItems() {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function createItems(item) {
  const newItem = document.createElement("div");
  newItem.classList.add("roulette-item");
  newItem.style.backgroundColor = item.color;
  return newItem;
}

function fillingContainer() {
  for (let i = 0; i < 20; i++) {
    roulette.appendChild(createItems(generateRandomItems()));
  }
}

fillingContainer();

function spinning(selectedItem) {
  let spinSpeed = 10;
  let position = 0;

  const spinInterval = setInterval(() => {
    if (isSpinning) {
      position -= spinSpeed;
      roulette.style.transform = `translateX(${position}px)`;

      if (position < -roulette.scrollWidth) position = 0;

      if (spinSpeed > 1) spinSpeed -= 0.05;
    } else {
      clearInterval(spinInterval);
      stopOnWin(selectedItem);
    }
  }, 20);
}

function stopOnWin(selectedItem) {
  roulette.appendChild(createItems(selectedItem));

  let position = -1050;
  const finalPosition = -(
    roulette.scrollWidth -
    roulette.children[roulette.children.length - 1].offsetWidth * 3 -
    50
  );
  const stopInterval = setInterval(() => {
    if (position > finalPosition) {
      position -= 3;
      roulette.style.transform = `translateX(${position}px)`;
    } else {
      clearInterval(stopInterval);
    }
  }, 20);
  fillingContainer();
}

spinning({ color: "red", rating: 3 });

setTimeout(() => {
  isSpinning = false;
}, 5000);
