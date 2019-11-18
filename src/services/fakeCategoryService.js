export const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Entertainment" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" }
];

export function getCategories() {
  return categories.filter(c => c);
}
