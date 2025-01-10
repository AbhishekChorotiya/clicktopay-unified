let cardRes = {
  actionCode: "SUCCESS",
  profiles: [
    {
      maskedCards: [
        {
          countryCode: "US",
          dateOfCardCreated: "2024-12-23T07:23:31.173Z",
          dateOfCardLastUsed: "2025-01-08T19:38:33.016Z",
          dcf: {
            logoUri: "http://mastercard.com/",
            name: "mastercard",
            uri: "https://sandbox.src.mastercard.com/pay/",
          },
          digitalCardData: {
            artUri:
              "https://sbx.assets.mastercard.com/card-art/combined-image-asset/6713d73d-a701-4bd2-bc9b-2e98940de9c7.png",
            authenticationMethods: [
              {
                authenticationMethodType: "FIDO2",
              },
            ],
            descriptorName: "MasterCard Test Bank",
            presentationName: "",
            status: "ACTIVE",
          },
          digitalCardFeatures: {},
          maskedBillingAddress: {
            name: "T*** Ma*******d",
            line1: "6*** S**** S********* D****",
            city: "Los Angeles",
            state: "CA",
            countryCode: "US",
            zip: "90056",
            addressId: "67fd5256-c7cf-4f17-8f21-3bcaaa4e885a",
          },
          panBin: "512035",
          panExpirationMonth: "01",
          panExpirationYear: "2039",
          panLastFour: "4537",
          paymentCardDescriptor: "mastercard",
          paymentCardType: "CREDIT",
          srcDigitalCardId: "IEkvU4PJSpaldBJ818Jssg000000000000US",
          tokenLastFour: "4489",
        },
        {
          dateOfCardCreated: "2024-12-19T11:10:44.446Z",
          dateOfCardLastUsed: "2025-01-08T07:06:07.453Z",
          digitalCardData: {
            artHeight: 210,
            artUri:
              "https://sandbox.assets.vims.visa.com/vims/cardart/5af3734cca4e439e97f00e4474d82447_imageA@2x.png",
            artWidth: 334,
            authenticationMethods: [],
            descriptorName: "OBN",
            pendingEvents: [],
            status: "ACTIVE",
          },
          maskedBillingAddress: {
            addressId: "8fddfaae-e0da-7d04-a26f-103276641802",
            name: null,
            line1: "673*****",
            line2: null,
            line3: null,
            city: "*****",
            state: "CA",
            zip: "*****",
            countryCode: "US",
          },
          panBin: "439584",
          panExpirationMonth: "12",
          panExpirationYear: "2025",
          panLastFour: "0110",
          paymentCardType: "DEBIT",
          srcDigitalCardId: "f96acf83-0de2-187f-cb64-1d6345951602",
        },
        {
          countryCode: "US",
          dateOfCardCreated: "2025-01-02T08:35:08.378Z",
          dateOfCardLastUsed: "2025-01-06T09:39:18.770Z",
          dcf: {
            logoUri: "http://mastercard.com/",
            name: "mastercard",
            uri: "https://sandbox.src.mastercard.com/pay/",
          },
          digitalCardData: {
            artUri:
              "https://sbx.assets.mastercard.com/card-art/combined-image-asset/HIGH-MASK-3x.png",
            authenticationMethods: [
              {
                authenticationMethodType: "FIDO2",
              },
            ],
            descriptorName: "",
            presentationName: "",
            status: "ACTIVE",
          },
          digitalCardFeatures: {},
          maskedBillingAddress: {
            name: "Ab*****k Ch******a",
            line1: "6*** S**** S********* D****",
            city: "Los Angeles",
            state: "CA",
            countryCode: "US",
            zip: "90056",
            addressId: "41b170e9-26b6-42dc-94d2-567c4d7edc21",
          },
          panBin: "518600",
          panExpirationMonth: "11",
          panExpirationYear: "2030",
          panLastFour: "8785",
          paymentCardDescriptor: "mastercard",
          paymentCardType: "PREPAID",
          srcDigitalCardId: "uCwj2iwDR0izPxOQuJHCiQ000000000000US",
        },
        {
          countryCode: "US",
          dateOfCardCreated: "2024-12-23T07:37:09.694Z",
          dcf: {
            logoUri: "http://mastercard.com/",
            name: "mastercard",
            uri: "https://sandbox.src.mastercard.com/pay/",
          },
          digitalCardData: {
            artUri:
              "https://sbx.assets.mastercard.com/card-art/combined-image-asset/HIGH-MASK-3x.png",
            authenticationMethods: [
              {
                authenticationMethodType: "FIDO2",
              },
            ],
            descriptorName: "",
            presentationName: "",
            status: "ACTIVE",
          },
          digitalCardFeatures: {},
          maskedBillingAddress: {
            name: "T*** Ma*******d",
            line1: "6*** S**** S********* D****",
            city: "Los Angeles",
            state: "CA",
            countryCode: "US",
            zip: "90056",
            addressId: "4243fea9-a531-467c-bcb1-d5c93fddc6d0",
          },
          panBin: "518600",
          panExpirationMonth: "01",
          panExpirationYear: "2039",
          panLastFour: "9908",
          paymentCardDescriptor: "mastercard",
          paymentCardType: "PREPAID",
          srcDigitalCardId: "geHXpeEfQF256Qs4Fdamvg000000000000US",
        },
      ],
    },
  ],
  maskedConsumer: {
    maskedConsumerIdentity: {
      identityProvider: "SRC",
      identityType: "EMAIL_ADDRESS",
      maskedIdentityValue: "a*****c@juspay.in",
    },
    maskedEmailAddress: "a*****c@juspay.in",
  },
};

function getCardNetwork(panBin) {
  const bin = panBin.toString();
  const cardNetworks = [
    { name: "Visa", pattern: /^4\d{5}$/ },
    {
      name: "MasterCard",
      pattern:
        /^(5[1-5]\d{4}|2(22[1-9]\d{3}|2[3-9]\d{4}|[3-6]\d{5}|7[0-1]\d{4}|720\d{3}))$/,
    },
    { name: "American Express", pattern: /^3[47]\d{4}$/ },
    {
      name: "Discover",
      pattern:
        /^(6011\d{2}|65\d{4}|64[4-9]\d{3}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])\d{2})$/,
    },
    { name: "JCB", pattern: /^35(2[89]|[3-8]\d)\d{2}$/ },
    { name: "Diners Club", pattern: /^3(0[0-5]\d{3}|[68]\d{4})$/ },
    {
      name: "Maestro",
      pattern: /^(5018|5020|5038|56|57|58|6304|6759|676[1-3])\d{2}$/,
    },
    { name: "UnionPay", pattern: /^62\d{4}$/ },
    { name: "RuPay", pattern: /^(60|65|81|82|508)\d{3}$/ },
  ];

  for (const network of cardNetworks) {
    if (network.pattern.test(bin)) {
      return network.name;
    }
  }
  return "Unknown";
}

for (let val of cardRes.profiles[0].maskedCards) {
  console.log(getCardNetwork(val.panBin));
}
