// Change the number of device when user moves the slider
const numDiceInput = document.querySelector('input[name="numDice"]');
function updateNumDice(value = null) {
	// Determine old and new values
	const oldNumDice = scene.children.length;
	const newNumDice = parseInt(value == null ? numDiceInput.value : value, 10);
	// Add or remove dice
	while (scene.children.length > newNumDice) {
		scene.children[newNumDice].remove();
	}
	while (scene.children.length < newNumDice) {
		const newNode = scene.children[0].cloneNode(true);
		const newDie = newNode.querySelector('.die');
		newDie.dataset.result = 1;
		scene.appendChild(newNode);
	}

	// Hint for CSS
	scene.dataset.diceNum = newNumDice;

	// Save configuration
	localStorage.setItem('numDice', newNumDice);
}
numDiceInput.addEventListener('change', () => updateNumDice());
updateNumDice(localStorage.getItem('numDice'));

// Save/load sound option
const soundCheckbox = document.querySelector('input[name="sound"]');
function setSoundOption(value = null) {
	const newValue = value == null ? soundCheckbox.checked : value;
	soundCheckbox.checked = newValue;
	localStorage.setItem('sound', newValue ? 'true' : 'false');
}
soundCheckbox.addEventListener('change', () => setSoundOption(soundCheckbox.checked));
setSoundOption(localStorage.getItem('sound') === 'true');

// Roll the dice
let rollCount = 0;
const sound = document.querySelector('#sound');
const rollButton = document.querySelector('#roll');
function roll() {
	scene.dataset.rollCountMod5 = ++rollCount % 5;
	const rolls = [];
	for (const die of scene.querySelectorAll('.die')) {
		const roll = Math.floor(Math.random() * 6) + 1;
		rolls.push(roll);
		die.dataset.result = roll;
	}

	addToHistory(rolls);

	if (soundCheckbox.checked) {
		sound.currentTime = 0;
		sound.play();
	}

	rollButton.focus();
}
scene.addEventListener('click', roll);
rollButton.addEventListener('click', roll);
