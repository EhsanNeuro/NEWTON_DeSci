export class GetActiveGames {
  constructor(data: GetActiveGames) {
    Object.assign(data, this);
  }

  result: {
    id: number;
    name: string;
    type: string;
    rewardType: string;
    startAt: Date;
    endAt: Date;
    iteration: number;
  }[];
}
