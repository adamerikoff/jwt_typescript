import sign from "../src/sign"

describe("sign", () => {
  it("shoudl produce different signatures for different payloads", () => {
    const jwtOne = sign({
      payload: {name: "Saud"},
      secret,
      options: {expiredIn: 8.64e7},

    }).split(".")[2];
    const jwtTwo = sign({
      payload: {name: "Saud"},
      secret: `${secret}-1323423`,
      options: {expiredIn: 8.64e7},

    }).split(".")[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it("shoudl produce different signatures for different payloads", () => {
    const jwtOne = sign({
      payload: {name: "Saud"},
      secret,
      options: {expiredIn: 8.64e7},

    }).split(".")[1];

    expect(typeof JSON.parse(atob(jwtOne)).expect.toBe(Number))
  });
});