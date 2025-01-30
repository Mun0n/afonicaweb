const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const source = path.join(process.cwd(), 'public/images/brand/logo.png');
const targetDir = path.join(process.cwd(), 'public/icons');

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });
    
    // Generate icons for each size
    for (const size of sizes) {
      await sharp(source)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(targetDir, `icon-${size}x${size}.png`));
      
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon.ico
    await sharp(source)
      .resize(32, 32)
      .toFile(path.join(process.cwd(), 'public/favicon.ico'));
    
    console.log('Generated favicon.ico');

    // Generate apple-touch-icon
    await sharp(source)
      .resize(180, 180)
      .png()
      .toFile(path.join(targetDir, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon');

  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 