import { ResponseToolkit, Request } from "@hapi/hapi";

export function validationError(request: Request, h: ResponseToolkit) {
  //@ts-ignore
  const errorMessages = error.details.map((detail) => detail.message);
  return h.response({ title: "Error", errors: errorMessages }).code(400).takeover();
}
