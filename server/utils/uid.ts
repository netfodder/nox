import crypto from "uncrypto";

export const uid = () => crypto.randomUUID().replace(/-/g, "");