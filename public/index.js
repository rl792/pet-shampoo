window.addEventListener('load', () => {
  let products = []; 
  let activeProducts = [];

  // fetching json file and updating the product details
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      //console.log(products);
      activeProducts = products.filter(product => product.active === true);

      let currentProductIndex = 0;

      const updateProductDetails = () => {
        document.getElementById("product-image").src = activeProducts[currentProductIndex].imageUrl;
        document.getElementById("product-title").innerText = activeProducts[currentProductIndex].title;
        document.getElementById("product-description").innerText = activeProducts[currentProductIndex].description;
        document.getElementById("product-price").innerText = "$" + activeProducts[currentProductIndex].price;
        
        const featuresList = document.getElementById("product-features");
        featuresList.innerHTML = '';
        activeProducts[currentProductIndex].highlighted_features.forEach(feature => {
          const li = document.createElement("li");
          li.textContent = feature;
          li.style.marginBottom = "13px";
          featuresList.appendChild(li);
        }); 

        const buyNowButton = document.getElementById('buy-now-button');
        buyNowButton.onclick = () => window.location.href = activeProducts[currentProductIndex].paymentLink;
      };

      updateProductDetails();

      document.getElementById("next-button").addEventListener("click", () => {
        currentProductIndex = (currentProductIndex + 1) % activeProducts.length;
        updateProductDetails();
      });

      document.getElementById("previous-button").addEventListener("click", () => {
        currentProductIndex = (currentProductIndex - 1 + activeProducts.length) % activeProducts.length;
        updateProductDetails();
      });

    })
    .catch(error => console.error('Error loading the JSON:', error));
});