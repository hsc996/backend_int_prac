import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwt_secret_key";

interface UserPayload {
    userId: number;
    email: string;
    isAdmin?: boolean;
}

function generateJwt(user: UserPayload): string{
    return jwt.sign(
        {
            userId: user.userId,
            email: user.email,
            isAdmin: user.isAdmin
        },
        jwtSecretKey,
        {
            expiresIn: "7d"
        }
    );
}
