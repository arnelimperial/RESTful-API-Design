module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5001,
    URL: process.env.BASE_URL || 'http://localhost:5001',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://data-industries:1234abcd@ds113648.mlab.com:13648/data-industries-db',
    JWT_SECRET: process.env.JWT_SECRET || 'companysecret'
  };