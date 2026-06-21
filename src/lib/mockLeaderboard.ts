// Generates realistic mock data for the leaderboard

export interface LeaderboardUser {
  id: string;
  username: string;
  scoreTonnes: number; // Annual carbon footprint in tonnes (lower is better)
  avatarColor: string;
  isCurrentUser?: boolean;
}

const mockNames = [
  "EcoNinja", "GreenLeaf", "PlanetSaver", "SolarFlare", "WindRider", 
  "EarthGuardian", "OceanBreeze", "ForestWalker", "VeganVanguard", "ZeroWasteZoe",
  "CarbonCutter", "NatureLover", "SustainableSam", "EcoWarrior", "GreenCommuter",
  "CaptainPlanet", "BioHacker", "RecycleRex", "SolarSamurai", "WindWhisperer",
  "EcoExplorer", "GreenGiant", "PlanetProtector", "EarthDefender", "OceanObserver"
];

const colors = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
  "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
  "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500"
];

// Generate 50 static mock users so it doesn't jump around on every render
export const generateMockUsers = (): LeaderboardUser[] => {
  // Deterministic random seed approach for stable mock data
  const users: LeaderboardUser[] = [];
  
  for (let i = 0; i < 50; i++) {
    // Generate scores mostly clustered around average (1.5 - 3.5 tonnes), with a few outliers
    let baseScore = 1.0 + (Math.sin(i * 13.5) * 0.5 + 0.5) * 3.0; // 1.0 to 4.0
    // Occasional super eco-friendly users
    if (i % 7 === 0) baseScore = 0.5 + Math.random() * 0.8;
    // Occasional high emitters
    if (i % 11 === 0) baseScore = 4.0 + Math.random() * 2.5;

    users.push({
      id: `user-${i}`,
      username: `${mockNames[i % mockNames.length]}${Math.floor(Math.abs(Math.cos(i * 7) * 99))}`,
      scoreTonnes: parseFloat(baseScore.toFixed(2)),
      avatarColor: colors[i % colors.length],
    });
  }

  // Sort ascending (lower carbon footprint = better rank)
  return users.sort((a, b) => a.scoreTonnes - b.scoreTonnes);
};

export const getLeaderboardWithUser = (userScore: number | null, username: string = "You"): LeaderboardUser[] => {
  const mockUsers = generateMockUsers();
  
  if (userScore === null) {
    return mockUsers;
  }

  const currentUser: LeaderboardUser = {
    id: "current-user",
    username,
    scoreTonnes: parseFloat(userScore.toFixed(2)),
    avatarColor: "bg-primary",
    isCurrentUser: true,
  };

  const allUsers = [...mockUsers, currentUser];
  return allUsers.sort((a, b) => a.scoreTonnes - b.scoreTonnes);
};
