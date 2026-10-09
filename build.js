const sharp=require('sharp'),fs=require('fs'),crypto=require('crypto');
const head='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1781.65 408.94" width="1781.65" height="408.94"><rect width="1781.65" height="408.94" fill="#041C2C"/><g transform="translate(150,105)"><g>';
const tail='</g></g></svg>';
const body=[1,2,3,4,5,6,7,8].map(i=>fs.readFileSync('parts/p'+i+'.txt','utf8').trim()).join('');
const svg=(head+body+tail).replace(/>\s+</g,'><');
const sha=crypto.createHash('sha1').update(svg).digest('hex');
if(sha!=='25c5a6e769112174dd8fdf0868d9743008c87566'){console.error('Checksum mismatch: '+sha);process.exit(1);}
fs.mkdirSync('public',{recursive:true});
sharp(Buffer.from(svg),{density:150}).resize({width:780}).png({compressionLevel:9}).toFile('public/arellis-signature-logo.png').then(i=>console.log('built',i)).catch(e=>{console.error(e);process.exit(1)});