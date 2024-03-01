import crypto from 'crypto'

export interface  Options {
  expiresIn?: number
}

export interface SignInput {
  payload: object,
  secret: string,
  options?: Options
}


const defaultOptions = {
  expiresIn: 8.64e7,
}

interface createSignatureInput{
  secret: string,
  encodedHeader: string,
  encodedPayload: string
}

export function createSignature({ secret, encodedHeader, encodedPayload }: createSignatureInput) {
  return crypto.createHmac("sha256", secret)
  .update(encodedHeader+"."+encodedPayload)
  .digest("base64")
}



function sign({ payload, secret, options={} }: SignInput){
  const mergedOptions = {...defaultOptions, ...options};

  const header = {alg: "HS256", typ: "JWT"};

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64")

  const date = Date.now();
  const expiresIn = date + mergedOptions.expiresIn;

  const encodedPayload = Buffer.from(JSON.stringify({...payload, exp: expiresIn})).toString("base64");

  const signature = createSignature({encodedHeader, encodedPayload, secret})

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export default  sign;