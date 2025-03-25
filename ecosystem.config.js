module.exports = {
    apps: [{
      name: 'puppeteer-server',
      script: 'server.js',
      watch: true,
      ignore_watch: [
        'node_modules',
        'screenshots' // if you have a screenshots directory
      ],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }]
  };