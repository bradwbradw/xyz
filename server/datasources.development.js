module.exports={
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "xyzdb": {
    "name": "xyzdb",
    "connector": "mongodb",
    "url":process.env.MONGODB_URL
  }
};
