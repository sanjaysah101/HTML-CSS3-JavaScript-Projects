import { body, validationResult } from "express-validator";

export const validateOrder = () => [
  body("order")
    .not()
    .isEmpty()
    .withMessage("Missing data.")
    .isObject()
    .withMessage("Invalid order data."),
  body("order.items")
    .not()
    .isEmpty()
    .withMessage("Order items are required.")
    .isArray()
    .withMessage("Order items must be an array."),
  body("order.customer.email").isEmail().withMessage("Invalid email address."),
  body("order.customer.name")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required."),
  body("order.customer.street")
    .trim()
    .notEmpty()
    .withMessage("Street address is required."),
  body("order.customer['postal-code']")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required."),
  body("order.customer.city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    return res.status(400).json({
      message: `Missing data: ${msg}`,
    });
  }
  next();
};
