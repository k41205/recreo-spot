export const serviceUrl = "http://DESKTOP-9FOLU4E:3000";

export const maggie = { firstName: "Maggie", lastName: "Simpson", password: "passwordS", type: "user", username: "magSim", email: "maggie@simpson.com" };

export const testUsers = [
  { firstName: "Admin", lastName: "Istrator", password: "root", type: "admin", username: "admin", email: "admin@example.com" },
  { firstName: "Mod", lastName: "Erator", password: "soot", type: "mod", username: "mod", email: "mod@example.com" },
  { firstName: "Name1", lastName: "Surname1", password: "123", type: "user", username: "user1", email: "user1@example.com" },
  { firstName: "Name2", lastName: "Surname2", password: "123", type: "user", username: "user2", email: "user2@example.com" },
  { firstName: "Name3", lastName: "Surname3", password: "123", type: "user", username: "user3", email: "user3@example.com" },
];

export const testPois = [
  { author: "user1", name: "POI Candidate 1", isPublic: false, isCandidate: true, lat: "53.3498", lon: "-6.2618", description: "Some candidate text 1" },
  { author: "user1", name: "POI Candidate 2", isPublic: false, isCandidate: true, lat: "53.3118", lon: "-6.2395", description: "Some candidate text 2" },
  { author: "user2", name: "POI Candidate 3", isPublic: false, isCandidate: true, lat: "53.3440", lon: "-6.2311", description: "Some candidate text 3" },
  { author: "admin", name: "POI Public 4", isPublic: true, isCandidate: false, lat: "53.3036", lon: "-6.2972", description: "Some public text 4" },
  { author: "admin", name: "POI Public 5", isPublic: true, isCandidate: false, lat: "53.2781", lon: "-6.2969", description: "Some public text 5" },
  { author: "user2", name: "POI Private 6", isPublic: false, isCandidate: false, lat: "53.3183", lon: "-6.2487", description: "Some private text 6" },
  { author: "user3", name: "POI Private 7", isPublic: false, isCandidate: false, lat: "53.2916", lon: "-6.2600", description: "Some private text 7" },
  { author: "user3", name: "POI Private 8", isPublic: false, isCandidate: false, lat: "53.3420", lon: "-6.3569", description: "Some private text 8" },
  { author: "user3", name: "POI Private 9", isPublic: false, isCandidate: false, lat: "53.3983", lon: "-6.2696", description: "Some private text 9" },
];
