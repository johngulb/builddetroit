export const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format as (XXX) XXX-XXXX
  if (digits.length >= 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  }
  return value;
};
