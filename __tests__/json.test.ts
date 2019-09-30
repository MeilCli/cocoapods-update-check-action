import { OutdatedPackage, toOutdatedPackages } from "../src/json";

test("parse", () => {
    const value = `Updating spec repo \`trunk\`
Analyzing dependencies
The color indicates what happens when you run \`pod update\`
<green>	 - Will be updated to the newest version
<blue>	 - Will be updated, but not to the newest version because of specified version in Podfile
<red>	 - Will not be updated because of specified version in Podfile

The following pod updates are available:
- RxCocoa 4.5.0 -> 5.0.0 (latest version 5.0.0)
- RxSwift 4.5.0 -> 5.0.0 (latest version 5.0.0)
`;

    const result = toOutdatedPackages(value);
    expect(result.length).toBe(2);

    expect(result[0].name).toBe("RxCocoa");
    expect(result[0].current).toBe("4.5.0");
    expect(result[0].latest).toBe("5.0.0");

    expect(result[1].name).toBe("RxSwift");
    expect(result[1].current).toBe("4.5.0");
    expect(result[1].latest).toBe("5.0.0");
})