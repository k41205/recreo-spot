export const serviceUrl = "http://DESKTOP-9FOLU4E:3000";

// Mock data used for tests

export const maggie = { firstName: "Maggie", lastName: "Simpson", password: "123456", username: "magSim", email: "maggie@simpson.com" };

export const usersMock = [
  { firstName: "Admin", lastName: "Istrator", password: "root12", username: "admin", email: "admin@example.com" },
  { firstName: "Mod", lastName: "Erator", password: "root12", username: "mod", email: "mod@example.com" },
  { firstName: "Name1", lastName: "Surname1", password: "123456", username: "user1", email: "user1@example.com" },
  { firstName: "Name2", lastName: "Surname2", password: "123456", username: "user2", email: "user2@example.com" },
  { firstName: "Name3", lastName: "Surname3", password: "123456", username: "user3", email: "user3@example.com" },
];

export const poisMock = [
  { name: "POI 1", lat: "53.3498", lon: "-6.2618", description: "This is POI 1" },
  { name: "POI 2", lat: "53.3118", lon: "-6.2395", description: "This is POI 2" },
  { name: "POI 3", lat: "53.3440", lon: "-6.2311", description: "This is POI 3" },
  { name: "POI 4", lat: "53.3036", lon: "-6.2972", description: "This is POI 4" },
  { name: "POI 5", lat: "53.2781", lon: "-6.2969", description: "This is POI 5" },
];

// Dev data used to seed db for development environment

export const usersDev = [
  {
    firstName: "Admin",
    lastName: "Istrator",
    // root12
    password: "$2b$10$e1g4w9wc/KFE33ApTQjCN.6.2nbLrTCZG8J5DNa643TB6ggTNVEGm",
    type: "admin",
    username: "admin",
    email: "admin@example.com",
    favorites: [],
  },
  {
    firstName: "Mod",
    lastName: "Erator",
    // root12
    password: "$2b$10$RyoHtRzsY9l82JS.fsoIyeV1gSP4JjT4WT9bBUpeB4udWsGb3etY2",
    type: "mod",
    username: "mod",
    email: "mod@example.com",
    favorites: [],
  },
  {
    firstName: "Name1",
    lastName: "Surname1",
    // 123456
    password: "$2b$10$//yboCdwSyot3acb5iNN/./QH893Q/dS9SJz.4mf9CywC1DMceUuO",
    type: "user",
    username: "user1",
    email: "user1@example.com",
    favorites: [],
  },
  {
    firstName: "Name2",
    lastName: "Surname2",
    // 123456
    password: "$2b$10$DaHTPAhy8FmqkyXQ9Z2dwuCIV/yptQAcHT49ltz26glBanOi4dQdG",
    type: "user",
    username: "user2",
    email: "user2@example.com",
    favorites: [],
  },
  {
    firstName: "Name3",
    lastName: "Surname3",
    // 123456
    password: "$2b$10$KT/umX2zQm8eS94T22gPMu5odtsWxQNcNXqAhH4vtQkXSdLFLB9Gi",
    type: "user",
    username: "user3",
    email: "user3@example.com",
    favorites: [],
  },
];

export const poisDev = [
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
