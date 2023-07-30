const charactersData = [
    {
      id: 0,
      img: "https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg",
      name: "robot icon",
    },
    {
      id: 1,
      img: "https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg",
      name: "apple icon",
    },
    {
      id: 2,
      img: "https://img.freepik.com/free-vector/blue-glowing-angel-wings-with-metal-shine-shadow-symbol-vector-illustration_1284-2008.jpg?w=2000",
      name: "angel icon",
    },
    {
      id: 3,
      img: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/boy.png",
      name: "boy icon",
    },
  ];
  
  const animationContainer = document.getElementById("animation-container");
  const addButton = document.getElementById("add-button");
  
  let characters = [];
  let focusedCharacter = null;
  
  document.addEventListener("keydown", moveCharacter);
  
  function handleCharacterSelect(event) {
    const selectedCharacter = event.target;
    setFocusedCharacter(characters, selectedCharacter);
  }
  
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }
  
  function createCharacterElement(characterData) {
    const characterElement = document.createElement("img");
    characterElement.setAttribute("src", characterData.img);
    characterElement.setAttribute("alt", characterData.name);
    characterElement.setAttribute("id", characterData.id);
    characterElement.classList.add("character");
    return characterElement;
  }
  
  function setPositionRandomly(characterElement) {
    const maxWidth = animationContainer.offsetWidth - characterElement.width;
    const maxHeight = animationContainer.offsetHeight - characterElement.height;
  
    if (maxWidth < 0 || maxHeight < 0 || characterElement.width <= 0 || characterElement.height <= 0) {
      return;
    }
  
    const maxLeft = maxWidth;
    const maxTop = maxHeight;
  
    const randomLeft = getRandomPosition(maxLeft);
    const randomTop = getRandomPosition(maxTop);
  
    characterElement.style.left = randomLeft + "px";
    characterElement.style.top = randomTop + "px";
  }
  
  
  function addCharacter() {
    if (charactersData.length === 0) {
      return;
    }
  
    const randomIndex = getRandomPosition(charactersData.length);
    const characterData = charactersData.splice(randomIndex, 1)[0];
  
    const characterElement = createCharacterElement(characterData);
    setPositionRandomly(characterElement);
  
    characterElement.addEventListener("click", handleCharacterSelect);
  
    characters.push(characterElement);
    animationContainer.appendChild(characterElement);
    setFocusedCharacter(characters, characterElement);
  }
  
  
  function moveCharacter(event) {
    if (!focusedCharacter) return;
  
    const step = 2;
    const currentLeft = parseInt(focusedCharacter.style.left) || 0;
    const currentTop = parseInt(focusedCharacter.style.top) || 0;
    const containerWidth = animationContainer.offsetWidth;
    const containerHeight = animationContainer.offsetHeight;
  
    switch (event.key) {
      case "ArrowUp":
        if (currentTop - step >= 0) {
          focusedCharacter.style.top = currentTop - step + "px";
        }
        break;
      case "ArrowDown":
        if (currentTop + step + focusedCharacter.height <= containerHeight) {
          focusedCharacter.style.top = currentTop + step + "px";
        }
        break;
      case "ArrowLeft":
        if (currentLeft - step >= 0) {
          focusedCharacter.style.left = currentLeft - step + "px";
        }
        break;
      case "ArrowRight":
        if (currentLeft + step + focusedCharacter.width <= containerWidth) {
          focusedCharacter.style.left = currentLeft + step + "px";
        }
        break;
    }
  }
  
  function setFocusedCharacter(characters, character) {
    focusedCharacter = character;
    characters.forEach((char) => char.classList.remove("highlighted"));
    character.classList.add("highlighted");
  }