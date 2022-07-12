exports.protect = async (request, reply) => {
}

exports.restrictTo = (privileges) => async (request, reply) => {
  console.log(privileges);
}