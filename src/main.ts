#!/usr/bin/env node

main(process.argv.slice(2)).then(x => process.exit(x));

async function main(args: string[]): Promise<number> {
    console.info("tsexec");

    for (const arg of args) {
        console.info(arg);
    }

    return 0;
}
