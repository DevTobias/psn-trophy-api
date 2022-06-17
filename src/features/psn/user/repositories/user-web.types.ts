type TrophyCount = {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
};

type Avatar = {
  size: string;
  url: string;
};

export type ProfileSummary = {
  accountId: string;
  trophyLevel: number;
  progress: number;
  tier: number;
  earnedTrophies: TrophyCount;
};

export type UserProfile = {
  onlineId: string;
  aboutMe: string;
  avatars: [Avatar];
  languages: [string];
  isPlus: boolean;
  isOfficiallyVerified: boolean;
};
