interface AuthConfig {
  token: string;
  algorithm: "HS256";
  expiresIn: string;
}

export const authConfig: AuthConfig = {
  token:
    process.env.JWT_TOKEN_KEY || "B2obQmub50YsHJneoJj/s76ZbJE5CEAUw2LI0K+8AdE=",
  algorithm: "HS256",
  expiresIn: "365d",
};
