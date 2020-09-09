export enum IndicatorType {
  IP = "IP",
  CIDR_BLOCK = "CIDR_BLOCK",
  URL = "URL",
  EMAIL_ADDRESS = "EMAIL_ADDRESS",
  MD5 = "MD5",
  SHA1 = "SHA1",
  SHA256 = "SHA256",
  MALWARE = "MALWARE",
  SOFTWARE = "SOFTWARE",
  REGISTRY_KEY = "REGISTRY_KEY",
  CVE = "CVE",
  BITCOIN_ADDRESS = "BITCOIN_ADDRESS"
}

export const enum PriorityLevel {
  NOT_FOUND = "NOT_FOUND",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export const enum IdType {
  INTERNAL = "internal",
  EXTERNAL = "external"
}

export const enum DistributionType {
  ENCLAVE = "ENCLAVE",
  COMMUNITY = "COMMUNITY"
}

export const enum EnclaveType {
  OPEN = "OPEN",
  INTERNAL = "INTERNAL",
  CLOSED = "CLOSED",
  OTHER = "OTHER",
  RESEARCH = "RESEARCH",
  COMMUNITY = "COMMUNITY",
}
