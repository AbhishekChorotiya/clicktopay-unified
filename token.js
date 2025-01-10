import pkg from "crypto-js";
const { HmacSHA256, enc } = pkg;

const query =
  "apikey=498WCF39JVQVH1UK4TGG21leLAj_MJQoapP5f12IanfEYaSno&encryptionKey=xyz123";
const sharedSecret =
  "dUnRawp2gzgCZ4CZnjFfmkJaW+ORSilCPhmvEDDcg6vRio6JlUjHuOxBC6bTKkmgvAWJJyRVz9/0chgw7v/TZwI/u4VAMdy4ZnGqZ9clpFcH/4Tmr3SILlzgat3gwaxO8OrtAq8CxWxibTiMTMSdMqkktMaeH3/elI/2DE9uObDzyRcmdv/ROjfD3VzuufhFhxxm4D/rMTIeU3vQXOqaFvPJV57zkHrCrBZz7Z3mwwI0qbBX46AAilCJhvbfgjl3fjz02lK/ubTb8RewdI8n8wXz1ghadnTu6nnV8szJZvOCoe8T2dhmQxuvP0T3h/7W6y6shr58SKayZ6Bh9frpow==";

const timestamp = Math.floor(Date.now() / 1000);
const callId = "3230594688839480402";
const resourcePath = `payment/data/${callId}`;
const apikey = "498WCF39JVQVH1UK4TGG21leLAj_MJQoapP5f12IanfEYaSno";
const preHashString = `${sharedSecret}${timestamp}${resourcePath}${query}`;
const hashSignature = HmacSHA256(preHashString, sharedSecret).toString(enc.Hex);
const token = `xv2:${timestamp}:${hashSignature}`;
console.log("PreHashString:", preHashString);
console.log("HashSignature:", hashSignature);
console.log("token", token);

let headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-pay-token": token,
};

let response = await fetch(
  `https://sandbox.api.visa.com/wallet-services-web/payment/data/${callId}?apikey=498WCF39JVQVH1UK4TGG21leLAj_MJQoapP5f12IanfEYaSno&encryptionKey=xyz123`,
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.dir(data);
