// // search
// function search_products() {
// 	let input = document.getElementsByClassName('form-control me-2').value
// 	input=input.toLowerCase();
// 	let x = document.getElementsByClassName('productName');

// 	for (i = 0; i < x.length; i++) {
// 		if (!x[i].innerHTML.toLowerCase().includes(input)) {
// 			x[i].style.display="none";
// 		}
// 		else {
// 			x[i].style.display="list-item";				
// 		}
// 	}
// }


// -----------------
// const cardTemplate = document.querySelector("[data-user-template]")
// const cardContainer = document.querySelector("container")
// const searchInput = document.querySelector("[data-search]")

// let product = []

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase()
//   product.forEach(product => {
//     const isVisible = product.productName.toLowerCase().includes(value) || product.ram.toLowerCase().includes(value)
//     product.element.classList.togle("hide", !isVisible)
//   })

// })
// fetch("./data.json")
//   .then(res => res.json())
//   .then(data => {
//     product = data.map(product => {
//       const card = cardTemplate.content.cloneNode(true).children[0]
//       console.log(card)
//       const header = card.querySelector("card-header]")
//       const body = card.querySelector("card-body]")
//       header.textContent = product.productName
//       body.textContent = product.ram
//       cardContainer.append(card)
//       return { name: product.productName, ram: product.ram, element: card }
//     })
//   })


// -----------------


// // Get the search input element
// const searchInput = document.getElementById("search-input");

// // Add an event listener to the form's submit event
// document.querySelector("form").addEventListener("submit", function (event) {
//   // Prevent the form from submitting and refreshing the page
//   event.preventDefault();

//   // Get the search term from the input
//   const searchTerm = searchInput.value.toLowerCase();

//   // Filter the data to find matching products
//   const matchingProducts = data.Laptops.filter(function (product) {
//     return (
//       product.productName.toLowerCase().includes(searchTerm) ||
//       product.productDescription.processor.toLowerCase().includes(searchTerm) ||
//       product.productDescription.ram.toLowerCase().includes(searchTerm) ||
//       product.productDescription.storage.toLowerCase().includes(searchTerm) ||
//       product.productDescription.operatingSystem.toLowerCase().includes(searchTerm)
//     );
//   });

//   // Clear any existing search results
//   const searchResults = document.getElementById("search-results");
//   searchResults.innerHTML = "";

//   // Display the matching products
// //   if()
// matchingProducts.forEach(function (product) { 

// -----------------
// function search() {
//   // Get input value
//   var input = document.getElementById("searchInput");
//   var filter = input.value.toUpperCase();

//   // Get list of items to search through
//   var list = [        {"title": "Item 1", "description": "This is the first item."},        {"title": "Item 2", "description": "This is the second item."},        {"title": "Item 3", "description": "This is the third item."}    ];

//   // Clear previous search results
//   var searchList = document.getElementById("searchList");
//   searchList.innerHTML = "";

//   // Loop through items and add matches to the search results list
//   for (var i = 0; i < list.length; i++) {
//       var item = list[i];
//       if (item.title.toUpperCase().indexOf(filter) > -1 || item.description.toUpperCase().indexOf(filter) > -1) {
//           var li = document.createElement("li");
//           var title = document.createTextNode(item.title);
//           var description = document.createTextNode(item.description);
//           li.appendChild(title);
//           li.appendChild(document.createElement("br"));
//           li.appendChild(description);
//           searchList.appendChild(li);
//       }
//   }
// }
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', function() {
    // Clear previous results
    searchResults.innerHTML = '';
    
    // Get input value
    const inputValue = searchInput.value.toLowerCase();
    
    // Fetch data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on input value
            const filteredData = data.filter(item => item.productName.toLowerCase().includes(inputValue));
            
            // Create HTML for search results
            const searchResultsHTML = filteredData.map(item => `
                <div class="search-result">
                    <h3>${item.productName}</h3>
                    <p>${item.ram}</p>
                </div>
            `).join('');
            
            // Display search results
            searchResults.innerHTML = searchResultsHTML;
            console.log(searchResults)
        })
        .catch(error => console.error(error));
});
