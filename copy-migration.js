let v1Callbacks = {
  success: null,
  error: null,
  canceled: null,
};

function initCheckoutButton(queryString, v1Config) {
  let v2Config = buildV2InitializeConfig(v1Config);
  console.log(v2Config);
  let imageUrl =
    "https://sandbox-assets.secure.checkout.visa.com/wallet-services-web/xo/button.png?cardBrands=VISA%2CMASTERCARD%2CDISCOVER%2CAMEX&animation=true&legacy=false&svg=true";

  if (queryString) imageUrl += queryString;

  let v1Button = document.getElementsByClassName("v-button")[0];
  v1Button.src = imageUrl;

  let iframeRef = null;

  window.addEventListener("message", (e) => {
    if (e.data.type === "GET_INIT_CONFIG") {
      iframeRef.contentWindow.postMessage(
        { type: "INIT_CONFIG", data: v1Config },
        "*"
      );
    }
  });

  v1Button.addEventListener("click", async () => {
    console.log("old checkout button clicked!");
    let overlayDiv = createOverlay();
    const iframeDiv = createIframeDialog(overlayDiv);
    iframeRef = createIframe(iframeDiv);
    iframeRef.src = "http://localhost:5173/";
  });
}

function createIframe(iframeDiv) {
  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframeDiv.appendChild(iframe);
  return iframe;
}

function createIframeDialog(overlayDiv) {
  const iframeDiv = document.createElement("div");
  iframeDiv.style.width = "100%";
  iframeDiv.style.maxWidth = "400px";
  iframeDiv.style.height = "500px";
  iframeDiv.style.border = "none";
  iframeDiv.style.margin = "0";
  iframeDiv.style.padding = "0";
  iframeDiv.style.position = "absolute";
  iframeDiv.style.top = "50%";
  iframeDiv.style.left = "50%";
  iframeDiv.style.transform = "translate(-50%, -50%)";
  iframeDiv.style.zIndex = "9999";
  iframeDiv.style.backgroundColor = "rgba(255,255,255,0.8)";
  iframeDiv.id = "iframeDiv";
  overlayDiv.appendChild(iframeDiv);
  iframeDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  return iframeDiv;
}

function createOverlay() {
  const overlayDiv = document.createElement("div");
  overlayDiv.id = "sdkOverlay";
  overlayDiv.style.position = "fixed";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  overlayDiv.style.zIndex = "9999";
  document.body.appendChild(overlayDiv);
  overlayDiv.addEventListener("click", () => {
    document.body.removeChild(overlayDiv);
  });
  return overlayDiv;
}

function createOtpInput(iframeDiv) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.id = "otpInputBox";
  wrapperDiv.style.display = "flex";
  wrapperDiv.style.flexDirection = "column";
  wrapperDiv.style.padding = "1rem";
  const otpInput = document.createElement("input");
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit OTP";
  submitButton.style.width = "fit-content";
  otpInput.type = "text";
  otpInput.id = "otpInput";
  otpInput.placeholder = "Enter OTP";
  otpInput.style.width = "60%";
  otpInput.style.height = "30px";
  otpInput.style.margin = "10px 0";
  wrapperDiv.appendChild(otpInput);
  wrapperDiv.appendChild(submitButton);
  iframeDiv.appendChild(wrapperDiv);
  submitButton.onclick = () => {
    handleOtpSubmit();
  };
  return wrapperDiv;
}

async function handleOtpSubmit() {
  try {
    const otpInput = document.getElementById("otpInput");
    const otp = otpInput.value;
    let consumerIdentity = {
      identityProvider: "SRC",
      identityValue: "abhishek.c@juspay.in",
      identityType: "EMAIL_ADDRESS",
    };

    const validationDataInput = {
      consumerIdentity,
      validationData: otp,
    };
    cards = await Vsb.getCards(validationDataInput);

    console.log("===> Cards", cards);

    let cardDetails = cards.profiles[0].maskedCards[0];
    console.log("===> cardDetails", cardDetails);

    let index = 0;
    while (
      index < cards.profiles[0].maskedCards.length &&
      cardDetails.panLastFour !== "0110"
    ) {
      cardDetails = cards.profiles[0].maskedCards[index];
      index++;
    }

    console.log("===> cardDetails", cardDetails);

    console.log("===> srcDigitalCardId", cardDetails);

    // const newWindow = window.open(
    //   "",
    //   "myWindow",
    //   "width=800,height=400"
    // );
    const overlayDiv = document.getElementById("sdkOverlay");
    const iframeDiv = document.getElementById("iframeDiv");
    iframeDiv.removeChild(document.getElementById("otpInputBox"));
    const iframeRef = createIframe(iframeDiv);

    const checkoutParameters = {
      srcDigitalCardId: cardDetails.srcDigitalCardId,
      payloadTypeIndicatorCheckout: "FULL",
      windowRef: iframeRef,
      dpaTransactionOptions: {
        // authenticationPreferences: {
        //   authenticationMethods: [
        //     {
        //       authenticationMethodType: "3DS",
        //       authenticationSubject: "CARDHOLDER",
        //       methodAttributes: {
        //         challengeIndicator: "01",
        //       },
        //     },
        //   ],
        //   payloadRequested: "AUTHENTICATED",
        // },
        acquirerBIN: "455555",
        acquirerMerchantId: "12345678",
        merchantName: "TestMerchant",
      },
    };

    const checkoutResponse = await Vsb.checkout(checkoutParameters);

    // newWindow.close();
    iframeDiv.removeChild(iframeRef);
    overlayDiv.removeChild(iframeDiv);
    document.body.removeChild(overlayDiv);
    console.log("===> My Response", checkoutResponse);
    v1Callbacks.success(checkoutResponse);
  } catch (error) {
    console.log("===> My Error", error);
    v1Callbacks.error(error);
  }
}

function loadVisaV2SDK(dpaId, callback) {
  console.log(dpaId);
  const sdkUrl = `https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/integration/v2/sdk.js?dpaId=${dpaId}&locale=en_US&cardBrands=visa,mastercard&dpaClientId=TestMerchant`;
  const script = document.createElement("script");
  script.src = sdkUrl;
  script.onload = () => {
    console.log("[Bridge] Visa v2 SDK loaded successfully.");
    if (callback) callback();
  };
  script.onerror = () => {
    console.error("[Bridge] Failed to load Visa v2 SDK.");
  };
  document.body.appendChild(script);
}

const v1CheckoutFuctions = {
  init: (initConfig) => {
    const v1Config = initConfig;
    const cardBrands = initConfig?.settings?.payment?.cardBrands;
    let queryString = "";
    if (cardBrands?.length) {
      queryString = "&orderedCardBrands=" + cardBrands.join(",");
    } else {
      queryString += "&orderedCardBrands=ALL";
    }
    let v2Config = buildV2InitializeConfig(v1Config);

    const dpaId = v1Config.apikey;
    initCheckoutButton(queryString, v1Config);

    loadVisaV2SDK(dpaId, () => {
      // initV2Checkout(v2Config);
    });
  },

  on: (eventName, callback) => {
    switch (eventName) {
      case "payment.success":
        v1Callbacks.success = callback;
        break;
      case "payment.cancel":
        v1Callbacks.error = callback;
        break;
      case "payment.error":
        v1Callbacks.canceled = callback;
        break;
      default:
        console.log("Unknown event name:", eventName);
        break;
    }
  },
};
window.V = v1CheckoutFuctions;

async function initV2Checkout(initConfig) {
  Vsb = window.VSDK;
  try {
    await Vsb.initialize(initConfig);
    console.log("SUCCESSFULL INIT");
  } catch (e) {
    console.log(e);
  }
}

onVisaCheckoutReady();

function buildV2InitializeConfig(options) {
  // const { apikey, sourceId, settings, paymentRequest } = options;

  return {
    // correlationId: sourceId || apikey,
    // dpaTransactionOptions: {
    //   transactionAmount: {
    //     transactionAmount: paymentRequest?.total ?? "0.00",
    //     transactionCurrencyCode: paymentRequest?.currencyCode ?? "USD",
    //   },
    //   dpaLocale: settings?.locale ?? "en_US",
    //   merchantCountryCode: settings?.countryCode ?? "US",
    //   merchantName: settings?.displayName ?? "My Merchant",
    //   payloadTypeIndicator: "FULL",
    //   paymentOptions: [
    //     {
    //       dpaDynamicDataTtlMinutes: 2,
    //       dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM",
    //     },
    //   ],
    // },
  };
}
