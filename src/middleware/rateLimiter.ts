import rateLimit from "express-rate-limit";

// Rate limiting middleware
export default function apiRateLimiter() {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `windowMs`
    message: {
      status: 429,
      message: "Too many requests. Please try again later.",
    },
  });
}