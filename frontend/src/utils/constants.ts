// Pagination
export const PAGE_SIZE = 10;

// Sorting options
export const SORT_OPTIONS = [
  { label: "Date (Newest First)", value: "date_desc" },
  { label: "Quantity", value: "quantity_desc" },
  { label: "Customer Name (A-Z)", value: "customerName_asc" },
];

// Gender filter options
export const GENDER_OPTIONS = ["Male", "Female", "Other"];

// Customer regions (adjust if dataset has more)
export const CUSTOMER_REGIONS = [
  "North",
  "South",
  "East",
  "West",
  "Central",
];

// Product categories (as per dataset)
export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Grocery",
  "Furniture",
  "Beauty",
];

// Payment methods (as per dataset)
export const PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
];

// Order status
export const ORDER_STATUS = [
  "Completed",
  "Pending",
  "Cancelled",
];

// Delivery types
export const DELIVERY_TYPES = [
  "Home Delivery",
  "Store Pickup",
];
