fetch("data.json")
    .then(response => response.json())
    .then(data => dataToHTML(data))

    function dataToHTML(data){
        let mainContainer = document.getElementById("laptops");

        for (let i = 0; i < data.Laptops.length; i++){
            let name = data.Laptops[i].productName;
            let url = data.Laptops[i].product_url;
            let size = data.Laptops[i].productDescription.size;
            let resolution = data.Laptops[i].productDescription.resolution;
            let processor = data.Laptops[i].productDescription.processor;
            let ram = data.Laptops[i].productDescription.ram;
            let storage = data.Laptops[i].productDescription.storage;
            let os = data.Laptops[i].productDescription.operatingSystem;
            let image = data.Laptops[i].image_url;

            let mycol = document.createElement("div");

            mycol.innerHTML = `
            <div class="card shadow-sm">
              <img src=${image} alt=${name} hspace="30" vspace="30" >
              <div class="card-header">
                <p class="card-text">${name}</p>
              </div>
              <div class="card-body">
                <p class="card-text">
                <ul>
                  <li>Size: ${size}</li>
                  <li>Resolution: ${resolution}</li>
                  <li>Processor: ${processor}</li>
                  <li>RAM: ${ram}</li>
                  <li>Storage: ${storage}</li>
                  <li>Operating System: ${os}</li>
                </ul>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary"
                      onclick="window.open('${url}');">Buy
                      Now</button>
                  </div>
                </div>
              </div>
            </div>
            `;
            mycol.className = "col";
            mainContainer.append(mycol);
        }

    }