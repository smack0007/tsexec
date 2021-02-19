#!/usr/bin/env node

import { execSync } from "child_process";
import { parse } from "path";
import { chdir } from "process";

main(process.argv.slice(2)).then(x => process.exit(x));

async function main(args: string[]): Promise<number> {
    if (args.length == 0) {
        console.error("Please provide a file to execute.");
        return 1;
    }

    const scriptPath = args[0];
    const scriptParse = parse(scriptPath);
    const scriptDirectory = scriptParse.dir;
    const scriptFileName = scriptParse.base;
    const scriptFileNameWithoutExtension = scriptParse.name;
    const scriptArgs = args.slice(1).map(x => `\"${x}\"`).join(" ");

    // console.info(scriptPath, scriptDirectory, scriptFileName, scriptArgs);

    const prefix = execSync("npm config get prefix").toString().trimRight();

    chdir(scriptDirectory);
    
    const tscCommand = `tsc "${scriptFileName}" --strict --typeRoots "${prefix}/node_modules/@types"`;
    const tscOutput = execSync(tscCommand).toString().trim();

    if (tscOutput !== "") {
        console.info(tscOutput);
    }

    const nodeCommand = `node ${scriptFileNameWithoutExtension}.js ${scriptArgs}`;
    console.info(execSync(nodeCommand).toString());

    return 0;
}
