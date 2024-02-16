export const validationErrors = {
  required: () => '⚠ This field is required',
  digit: () => '⚠ This field must contain numbers',
  minValue: (count: number, valueName: string) =>
    `⚠ Minimum ${valueName} must be at least ${count}`,
  maxValue: (count: number, valueName: string) =>
    `⚠ Maximun ${valueName} should be less than ${count}`,
  lessThanRegularPrice: () =>
    '⚠ Discount cannot be greater than the regular price',
  isLessThanMaxNights: () =>
    '⚠ Minimum nights cannot be greater than the maximum nights',
  isGreaterThanMinNights: () =>
    '⚠ Maximun must be greater than the minimum nights',
  min: (count: number) =>
    `⚠ This field must contain more than ${count} characters`,
  max: (count: number, fieldName: string) =>
    `⚠ ${fieldName} must contain less than ${count} characters`,
  uppercase: () =>
    '⚠ This field must contain at least one uppercase letter (A-Z)',
  lowercase: () =>
    '⚠ This field must contain at least one lowercase letter (a-z)',
  oneDigit: () => '⚠ This field must contain at least one digit (0-9)',
  specialChar: () =>
    '⚠ This field must contain at least one special character (!@#$%^&*)',
  noWhitespace: () =>
    '⚠ This field must not contain leading or trailing whitespace',
  invalidFormat: () => '⚠ Invalid format',
  missingDomain: () =>
    '⚠ Email address must contain a domain name (e.g., example.com)',
  // eslint-disable-next-line quotes
  missingAtSymbol: () => "⚠ Email address must contain an '@' symbol",
  invalidEmailFormat: () =>
    '⚠ Email address must be properly formatted (e.g., user@example.com)',
  latinCharactersOnly: () => '⚠ Only latin characters are allowed',
  fullNameValidation: () => '⚠ Please enter your full name',
  confirmPassword: () => '⚠ Please confirm your password',
  passwordMatch: () => '⚠ Passwords must match',
};
