import { mkdir, writeFile, rm } from "fs/promises";

async function main() {
  const dirName = "./testDirector";
  const fileName = "example.txt";

  try {
    await mkdir(dirName);
    console.log(`Director creat: ${dirName}`);

    const filePath = `${dirName}/${fileName}`;
    await writeFile(filePath, "Acesta este un fisier de test.");
    console.log(`Fisier creat: ${filePath}`);

    await rm(dirName, { recursive: true, force: true });
    console.log(`Director sters: ${dirName}`);
  } catch (err) {
    console.error("Eroare:", err.message);
  }
}

main();
