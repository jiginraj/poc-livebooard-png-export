#!/usr/bin/env node
const puppeteer = require("puppeteer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SCREENSHOT_DIR = "screenshots";

// Ensure screenshots directory exists
const SCREENSHOTS_DIR = path.join(__dirname, SCREENSHOT_DIR);
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR);
}

async function captureHighResolutionScreenshot(url, options = {}) {
  const {
    width = 3840, // 4K width
    scale = 4, // Device scale factor
    fullPage = true,
    waitTime = 2000, // Additional wait time for dynamic content to load
  } = options;

  const filename =
    SCREENSHOT_DIR +
    `/screenshot-${width}-resolution-scale-${scale}-${Date.now()}.png`;
  const filePath = path.join(process.cwd(), filename);

  const browser = await puppeteer.launch({
    headless: "new", // Use the new headless mode
  });

  const page = await browser.newPage();

  // Calculate dynamic height
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 60000, // 60 seconds timeout
  });

  // Wait for potential dynamic content to load
  await new Promise((resolve) => setTimeout(resolve, waitTime));

  // Calculate the full height of the page
  const bodyHeight = await page.evaluate(() => {
    // Use document.body.scrollHeight for most reliable height
    return document.body.scrollHeight;
  });

  // Set viewport with dynamic height
  await page.setViewport({
    width: Math.ceil(width / scale),
    height: Math.ceil(bodyHeight / scale),
    deviceScaleFactor: scale,
  });

  // Capture screenshot
  const screenshot = await page.screenshot({
    path: filePath,
    fullPage: true,
    captureBeyondViewport: true,
    type: "png",
  });

  await browser.close();

  // Optional: Use Sharp for additional processing
  const processedImage = await sharp(screenshot)
    .metadata()
    .then((metadata) => {
      console.log("Screenshot Metadata:", {
        width: metadata.width,
        height: metadata.height,
      });
      //   return sharp(screenshot)
      //     .toFile(filePath);
    });

  console.log(`Screenshot saved to ${filePath}`);
  return screenshot;
}

// Example usage
if (require.main === module) {
  const main = async () => {
    try {
      const url = process.argv[2];
      const scale = Number(process.argv[3]);
      const width = Number(process.argv[4]);

      console.log("scale", scale);
      console.log("width", width);
      console.log("url", url);
  
      await captureHighResolutionScreenshot(url, {
        // Optionally customize options
        waitTime: 3000, // Increase wait time for complex pages
        scale,
        width,
        //   path: 'dynamic-height-screenshot.png'
      });
    } catch (error) {
      console.error("Screenshot capture failed:", error);
    }
  };

  main();
}

module.exports = captureHighResolutionScreenshot;
