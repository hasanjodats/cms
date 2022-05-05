module.exports = {
  origin: (origin, cb) => {
    const whitelist = ["localhost", "127.0.0.1"];
    const hostname = new URL(origin).hostname;
    if (whitelist.indexOf(hostname) > 0) {
      cb(null, true);
      return;
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"));
  },
};
