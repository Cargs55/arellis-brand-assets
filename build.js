const sharp=require('sharp');const fs=require('fs');
fs.mkdirSync('public',{recursive:true});
sharp(fs.readFileSync('sig.svg'),{density:150}).resize({width:780}).png({compressionLevel:9}).toFile('public/arellis-signature-logo.png').then(i=>console.log('built',i)).catch(e=>{console.error(e);process.exit(1)});