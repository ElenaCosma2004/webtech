const fs = require("fs");

function rleCompress(text) {
  if (!text) return "";

  let compressed = "";
  let count = 1;

  for (let i = 1; i <= text.length; i++) {
    if (text[i] === text[i - 1]) {
      count++;
    } else {
      compressed += text[i - 1] + count;
      count = 1;
    }
  }
  return compressed;
}

function rleDecompress(encoded) {
  let decoded = "";
  let i = 0;

  while (i < encoded.length) {
    const char = encoded[i];
    i++;

    let num = "";
    while (i < encoded.length && encoded[i] >= "0" && encoded[i] <= "9") {
      num += encoded[i];
      i++;
    }
    const count = parseInt(num);
    for (let j = 0; j < count; j++) {
      decoded += char;
    }
  }
  return decoded;
}

function compressFile(inputPath, outputPath) {
  const text = fs.readFileSync(inputPath, "utf8");
  const compressed = rleCompress(text);
  fs.writeFileSync(outputPath, compressed);
  console.log(`Compresie finalizata: ${outputPath}`);
}

function decompressFile(inputPath, outputPath) {
  const compressed = fs.readFileSync(inputPath, "utf8");
  const decompressed = rleDecompress(compressed);
  fs.writeFileSync(outputPath, decompressed);
  console.log(`Decompresie finalizata ${outputPath}`);
}

const input = "input.txt";
const compressed = "compressed.txt";
const decompressed = "decompressed.txt";

compressFile(input, compressed);

decompressFile(compressed, decompressed);
