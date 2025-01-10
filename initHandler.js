let initDataV1 = {
  apikey: "498WCF39JVQVH1UK4TGG21leLAj_MJQoapP5f12IanfEYaSno", //required
  encryptionKey: "R03OEOL08UHMJ5U8RV4114nssjitrIClAhkuRfFv8PRMznB88", //required
  referenceCallID: "1234567890", //optional
  externalProfileId: "1234567890", //optional
  externalClientId: "1234567890", //optional (Not required for merchants. For partners, it is the unique ID associated with a partner's client, such as the ID of a merchant onboarded by the partner.)
  settings: {
    locale: "en_US", //optional
    countryCode: "US", //optional
    displayName: "Marriott", //optional
    websiteUrl: "https://www.marriott.com", //optional
    customerSupportUrl: "https://www.marriott.com/support", //optional
    shipping: {
      acceptedRegions: ["US", "CA"], //optional
      collectShipping: "true", //optional
    }, //optional
    review: {
      message: "Thank you for your purchase!", //optional
      buttonAction: "Continue", //optional ("Continue", "Pay")
    }, //optional
    payment: {
      cardBrands: ["VISA", "MASTERCARD"],
      acceptCanadianVisaDebit: "true",
      billingCountries: ["US", "CA"],
    }, //optional
    threeDSSetup: {
      threeDSActive: false, //optional
      threeDSSuppressChallenge: false, //optional
    }, //optional
    dataLevel: "FULL", //optional (SUMMARY, FULL, NONE)
    currencyFormat: "currencyCodeSymbol ###,###,###.##", //optional
    enableUserDataPrefill: false, //optional (You must be enabled by Visa Checkout to use the prefill feature; contact Visa Checkout for more information.)
  },
  paymentRequest: {
    merchantRequestId: "1234567890", //optional
    currencyCode: "USD", //required
    subtotal: 100, //required
    shippingHandling: 10, //optional (shipping charges)
    tax: 10, //optional
    discount: 10, //optional
    giftWrap: 10, //optional
    misc: 10, //optional
    total: 100, //required
    orderId: "1234567890", //optional (Merchant's order ID associated with the payment.)
    description: "Test Payment", //optional
    promoCode: "TEST", //optional
    customData: {
      key: "value",
    }, //optional (Merchant-supplied data, as name-value pairs.)
  }, //optional
};

let initDataV2 = {
  dpaTransactionOptions: {
    dpaLocale: "en_US", //optional
    transactionAmount: {
      transactionAmount: 100, //required
      transactionCurrencyCode: "USD", //required
    }, //conditional (Conditionality: Required when the value of: checkoutEventType is set to 01 (Authorize) or 03 (Refund); and confirmationStatus is set to 01 (Success))
    dpaBillingPreference: "NONE", //optional ("NONE", "FULL", "POSTAL_COUNTRY")
    dpaAcceptedBillingCountries: ["US", "CA"], //optional
    consumerNationalIdentifierRequested: false, //optional
    merchantCategoryCode: "4829", //optional
    merchantCountryCode: "US", //optional
    merchantOrderId: "1234567890", //optional (Merchant's order ID associated with the payment.)
    paymentOptions: [
      {
        dpaDynamicDataTtlMinutes: 2,
        dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM",
      },
    ], //optional
  }, //optional
}; //optional

let checkoutParametersV2 = {
  srcDigitalCardId: "a40619aeb5d67e08d93213fc22fe5a02", //conditional (If srcDigitalCardId and encryptedCard both are provided then srcDigitalCardId takes precedence.)
  encryptedCard: "encryptedCardValue", //conditional (JWE<Card>)
  consumer: {
    consumerIdentity: {
      identityProvider: "SRC", //optional
      identityValue: "abhishek.c@juspay.in", //required
      identityType: "EMAIL_ADDRESS", //required ("EMAIL_ADDRESS", "MOBILE_PHONE_NUMBER")
    }, //required
    firstName: "Abhishek", //optional
    lastName: "Chorotiya", //optional
    fullName: "Abhishek Chorotiya", //optional
    emailAddress: "abhishek.c@juspay.in", //optional
    mobileNumber: "919876543210", //conditional (Required for add card flow if consumer identity is not mobile.)
    nationalIdentifier: "IN", //optional
    countryCode: "IN", //optional
    locale: "en-US", //optional
  }, //optional
  complianceSettings: {
    complianceResources: [
      {
        complianceType: "PRIVACY_POLICY", //required ("PRIVACY_POLICY","REMEMBER_ME","TERMS_AND_CONDITIONS")
        uri: "https://www.juspay.in/privacy-policy", //required
        version: "1.1", //optional
        datePublished: "2023-10-01T00:00:00Z", //optional (UTC time in Unix epoch format)
      },
    ], //required
  }, //conditional (This field is applicable for a combined flow where a card is being enrolled during checkout. (presented by the encryptedCard field))
  assuranceData: {}, //optional
  authenticationReasons: {}, //conditional
  authenticationMethod: {
    authenticationMethodType: "EMAIL_OTP", //required ("CSC_VALIDATION", "EMAIL_OTP", "SMS_OTP", "APP_AUTHENTICATION", "3DS")
    authenticationSubject: "CARD", //required ("CARD", "CARDHOLDER", "CONSUMER")
    uriData: {}, //optional
    authenticationCredentialReference: "", //optional
    methodAttributes: {}, //optional
  }, //conditional (Required when prior call within the same transaction returned an actionCode of PENDING_AUTHENTICATION.)
  dpaTransactionOptions: {
    transactionAmount: {
      transactionAmount: "99.95",
      transactionCurrencyCode: "USD",
    }, //optional
    dpaBillingPreference: {}, //optional
    dpaAcceptedBillingCountries: ["US", "CA"], //optional
    authenticationPreferences: {
      authenticationMethods: [
        {
          authenticationMethodType: "3DS", //required
          authenticationSubject: "CARDHOLDER", //required
          methodAttributes: {
            challengeIndicator: "01",
          }, //optional
        },
      ],
      supressChallenge: false, //optional
      payloadRequested: "AUTHENTICATED", //optional
    }, //optional
    dpaLocale: "en_US", //optional
    acquirerMerchantId: "12345678", //optional
    acquirerBIN: "455555", //optional
    merchantName: "TestMerchant", //optional
    paymentOptions: [
      {
        dpaDynamicDataTtlMinutes: 2, //optional
        dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM", //optional ("CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM", "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM", "DYNAMIC_CARD_SECURITY_CODE", "CARDHOLDER_AUTHENTICATION_CRYPTOGRAM", "NONE")
      },
    ], //optional
  }, //conditional (Required when not provided earlier in the initialize() method call and the DPA has not been registered with the SRC System.)
  payloadTypeIndicatorCheckout: "FULL", //optional ("SUMMARY","FULL")
  windowRef: "windowRef or iframeRef", //conditional (if not passed new window will open as default)
};

function deriveInitDataV2(initDataV1) {
  const initDataV2 = {
    dpaTransactionOptions: {},
  };

  if (initDataV1.settings?.locale) {
    initDataV2.dpaTransactionOptions.dpaLocale = initDataV1.settings.locale;
  }

  if (
    initDataV1.paymentRequest?.subtotal &&
    initDataV1.paymentRequest.currencyCode
  ) {
    initDataV2.dpaTransactionOptions.transactionAmount = {
      transactionAmount: `${initDataV1.paymentRequest.subtotal}`,
      transactionCurrencyCode: initDataV1.paymentRequest.currencyCode || "USD",
    };
  }

  if (initDataV1.settings?.billingCountries) {
    initDataV2.dpaTransactionOptions.dpaAcceptedBillingCountries =
      initDataV1.settings.billingCountries;
  }

  if (initDataV1.settings?.countryCode) {
    initDataV2.dpaTransactionOptions.merchantCountryCode =
      initDataV1.settings.countryCode;
  }

  if (initDataV1.paymentRequest?.orderId) {
    initDataV2.dpaTransactionOptions.merchantOrderId =
      initDataV1.paymentRequest.orderId;
  }

  const unmappedParameters = [
    "consumerNationalIdentifierRequested", //optional (Indicates whether the DPA expects the consumer national identifier to be returned in the SRC payload.)
    "dpaBillingPreference", //optional ("NONE", "FULL", "POSTAL_COUNTRY")
    "merchantCategoryCode", //optional (Describes the merchant’s type of business, product or service.)
    "paymentOptions", //optional
  ];

  return initDataV2;
}
