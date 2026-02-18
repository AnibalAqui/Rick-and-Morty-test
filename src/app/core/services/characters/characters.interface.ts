export interface CharactersResp {
  info: CharRespInfo;
  results: CharRespResult[];
}

export interface CharRespResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharRespInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharactersReqOpts {
  page?: number;
  name?: string;
  ids?: number[];
}
