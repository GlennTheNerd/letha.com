var data = [
  {
    name: "Hardy Hiker",
    description:
      "For those who enjoy the outdoors, the Hardy Hiker is for you. This trendy boot is made from strong, durable leather and utilises the latest sole technology to ensure a comfortable fit. The boot is only available in brown leather. Whether you wear it while exploring the city or heading into the hills, this boot is the perfect accessory for the rugged, chic look.",
    imageUrl:
      "https://images.unsplash.com/photo-1493054882428-e4c79a9bfa3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80",
    id: 1
  },
  {
    name: "Bashful Brogue",
    description:
      "Our Bashful Brogue is one of our most popular shoes. It is perfect as formal wear or for office use. Its comfortable sole makes it perfect for all day wear. The brogue is made from brown or black leather and is studded using our unique pattern.",
    imageUrl:
      "https://images.unsplash.com/photo-1504826023244-4694f7330c73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    id: 2
  },
  {
    name: "Nice and Easy",
    description:
      "Perfect for every occasion, Nice and Easy is the perfect all-rounder to ensure you're always looking at the top of your game. It's easy to wear and maintain and will be the perfect accompaniment for after dinner drinks, an interview, or even your next date.",
    imageUrl:
      "https://images.unsplash.com/photo-1534233650908-b471f2350922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    id: 3
  },
  {
    name: "Calm and Casual",
    description:
      "The calm and casual shoe is perfect for someone who prioritizes both comfort and style. The shoe is light to wear and perfect for relaxing with friends.",
    imageUrl:
      "https://images.unsplash.com/photo-1548430395-ec39eaf2aa1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
    id: 4,
    sizes: [37, 39, 41]
  },
  {
    name: "Urbana",
    description:
      "This boot with its characteristic hard-worn look has a real industrial feel and offers the wearer a stylish and down-to-earth look.",
    imageUrl:
      "https://images.unsplash.com/photo-1460066122679-741dd6c4ad37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    id: 5,
    sizes: [41, 39, 37]
  }
];

document.addEventListener(
  "DOMContentLoaded",
  function() {
    buildView(data);
  },
  false
);

function buildView(data) {
  const cardcontainer = document.getElementById("card-image");
  // For each element in data
  for (const card of data) {
    // Append element to the innerhtml
    cardcontainer.innerHTML += `<div class="card-container" onclick="buildModal(${card.id})">
            <img class="card-image" id="${card.id}" src="${card.imageUrl}">
            <p class="numberOfLikes"><img class="heart heart-categories" src="/icons/heart.svg">200</p>
            <h3 class="card-name">${card.name}</h3>
            <p class="card-price">$39.90</p>
        </div>
            `;
  }
}

function buildModal(id) {
  const selectedElement = data.find(obj => obj.id === id);
  if (selectedElement) {
    modalBox = document.getElementById("hidden-description-box");
    modalBox.classList.remove("toggleDisplay");
    document.getElementById("pageContainerToggle").classList.add("blur");
    console.log(selectedElement);

    modalBox.innerHTML = `<div id="title">
        <h3>${selectedElement.name}</h3>
        <span onclick="closeBtnModal()" class="closeBtn">&times;</span>
    </div>
    <div id="image">
        <img class="modalImage" src="${selectedElement.imageUrl}">
    </div>
    <div id="addToBasket">
        <div class="basketBox1 boxStyle">
            <p class="box-price">${selectedElement.price}</p>
        </div>
        <div class="basketBox2 boxStyle">
            <p class="box-color">Color: ${selectedElement.color}</p>
            <div>
                <p class="sizeBox">Size:</p>
                <select id="sizeOptions"> 
                </select>
            </div>
            <div class="buttonContainer">
                <button class="shoppingBagButton" onclick="addToBasket(${selectedElement.id})">Add to shopping bag</button>
            </div>
        </div>
        <div class="basketBox3 boxStyle">
            <p>Share</p>
            <ul>
                <li><a href="#"><img src="/Images/social media/twitter.png"></a></li>
                <li><a href="#"><img src="/Images/social media/face.png"></a></li>
                <li><a href="#"><img src="/Images/social media/snapchat.png"></a></li>
            </ul>
        </div>
    </div>
    <div id="description">
        <p>${selectedElement.description}</p>
    </div>`;

    selectedElement.sizes.sort();
    selectSizes = document.getElementById("sizeOptions");
    for (const size of selectedElement.sizes) {
      selectSizes.innerHTML += `<option value="${size}">${size}</option>`;
    }
  } else {
    console.error("No matching cards in data");
  }
}

function addToBasket(id) {
  var shoppingCart = JSON.parse(sessionStorage.getItem("ShoppingCart"));
  if (shoppingCart === null || shoppingCart === undefined) {
    shoppingCart = [];
  }
  selectSizes = document.getElementById("sizeOptions");
  //add the size in the shopping cart
  shoppingCart.push({
    id: id,
    size: selectSizes.options[selectSizes.selectedIndex].text
  });
  sessionStorage.setItem("ShoppingCart", JSON.stringify(shoppingCart));
  numInShoppingCart();
}

function closeBtnModal() {
  document
    .getElementById("hidden-description-box")
    .classList.add("toggleDisplay");
  document.getElementById("pageContainerToggle").classList.remove("blur");
}

function numInShoppingCart() {
  const storageCount = JSON.parse(sessionStorage.getItem("ShoppingCart"))
    .length;
  const basket = document.getElementById("shoppingBasket");
  basket.innerHTML = storageCount;
}
