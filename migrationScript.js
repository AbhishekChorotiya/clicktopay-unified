document.addEventListener("DOMContentLoaded", () => {
  function getButtonUI() {
    let imageUrl =
      "https://sandbox-assets.secure.checkout.visa.com/wallet-services-web/xo/button.png?cardBrands=VISA%2CMASTERCARD%2CDISCOVER%2CAMEX&animation=true&legacy=false&svg=true&orderedCardBrands=VISA%2CMASTERCARD";

    let v1Button = document.getElementsByClassName("v-button")[0];
    v1Button.src = imageUrl;
    console.log("UI -->", v1Button.src);
    v1Button.addEventListener("click", () => {
      console.log("v1 button clicked");
    });
  }

  getButtonUI();
});
