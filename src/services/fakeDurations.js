export const durations = [
  { _id: "5b21ca3eeb7f6fbccd4719", name: "Weekly" },
  { _id: "5b21ca3eeb7f6fbccd4720", name: "Monthly" },
  { _id: "5b21ca3eeb7f6fbccd4721", name: "Yearly" }
];

export function getDurations() {
  return durations.filter(c => c);
}
