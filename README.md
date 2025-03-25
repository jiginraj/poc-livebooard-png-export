# CLI Screenshot Generator

## Overview
This CLI tool allows you to take screenshots of websites with customizable parameters.

## Prerequisites
- Node.js installed
- npm (Node Package Manager)

## Setup
1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Ensure the script has executable permissions
```bash
chmod +x cli-screenshot.js
```

## Usage
Execute the script with the following command:

```bash
./cli-screenshot.js <url> <scale-factor> <pixel-width>
```

### Parameters
- `<url>`: The website URL to screenshot
- `<scale-factor>`: Scale factor for the image
- `<pixel-width>`: Desired pixel width of the screenshot

### Example
```bash
./cli-screenshot.js https://www.npmjs.com/ 1.5 2056
```

This command will:
- Take a screenshot of npmjs.com
- Set the scale factor to 1.5
- Set the pixel width to 2056 pixels

## Important Notes
- Run `npm install` to set up project dependencies
- Ensure you've run `chmod +x cli-screenshot.js` to make the script executable
- Check that you have the necessary dependencies installed
- Verify network connectivity before running the script

## Troubleshooting
- Missing dependencies? Run `npm install`
- Permission issues? Run `chmod +x cli-screenshot.js`
- Dependency conflicts? Ensure Node.js and npm are up to date
