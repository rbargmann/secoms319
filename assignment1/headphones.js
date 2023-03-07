fetch("data.json")
    .then(response => response.json())
    .then(data => dataToHTML(data))

    function dataToHTML(data) {
        let mainContainer = document.getElementById("headphones");

        for (let i = 0; i < data.Headphones.length; i++){
            let name = data.Headphones[i].productName;
            let url = data.Headphones[i].product_url;
            let noiseCancelling = data.Headphones[i].noiseCancelling;
            let connectionType = data.Headphones[i].connectionType;
            let waterResistant = data.Headphones[i].waterRessistant;
            let batteryLife = data.Headphones[i].batterLife;
            let microphone = data.Headphones[i].microphone;
            let compatableOS = data.Headphones[i].compatableOS;
            let image = data.Headphones[i].image_url;
        

        let mycol = document.createElement("div");

        mycol.innerHTML = `
        <div class="card shadow-sm">
            <img src=${image} alt=${name} hspace="30" vspace="30">
              <div class="card-header">
                <p class="card-text">${name}</p>
              </div>
              <div class="card-body">
                <p class="card-text">
                <ul>
                  <li>Noise Cancelling: ${noiseCancelling}</li>
                  <li>Connection Type: ${connectionType}</li>
                  <li>Water Resistant: ${waterResistant}</li>
                  <li>Battery Life: ${batteryLife}</li>
                  <li>Built-in Microphone: ${microphone} </li>
                  <li>Compatable Software: ${compatableOS}</li>
                </ul>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary"
                      onclick="window.open('${url}');">Buy
                      Now</button>
                    <!-- <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> -->
                  </div>
                  <!-- <small class="text-muted">9 mins</small> -->
                </div>
              </div>
            </div>
        `;
        mycol.className = "col";
        mainContainer.append(mycol);
        }
    }