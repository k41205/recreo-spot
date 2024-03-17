export function validationError(request, h, error) {
  console.log(error.message);
  const errorMessages = error.details.map((detail) => detail.message);
  return h.response({ title: "Error", errors: errorMessages }).code(400).takeover();
}
