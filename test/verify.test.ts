import verify from "../src/verify";
import sign from "../src/sign";

describe('decode', () => { 
  it("should verify and decode a valid token", () => {
    const secret = "lzkcnmvxdsjkfs";
    const token = sign({ payload: {name: "Kemal"}, secret })

    const verified = verify({token, secret});

    expect(verified.name).toBe("Kemal")
  });

  it("should throw if the signature is invalid", () => {
    const secretOne = "lzkcnmvxdsjkfs";
    const secretTwo = "lmlznkioueqw";

    const token = sign({ payload: {name: "Kemal"}, secret: secretOne })

    try {
      verify({token, secret: secretTwo});
    } catch(e) {
      expect(e.message).toBe("Invalid signature");
    }
  });

  it("should throw if the token has expired", () => {
    const secret = "lzkcnmvxdsjkfs";

    const token = sign({
      payload: { name: "Kemal" },
      secret,
      options: {
        expiresIn: -8.64e7
        }
    });

    try {
      verify({token, secret});
    } catch(e) {
      expect(e.message).toBe("Token has expired")
    }
  });
});