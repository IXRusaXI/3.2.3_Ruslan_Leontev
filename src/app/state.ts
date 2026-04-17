import emptyRocketImg from "./../assets/empty-rocket.png";

export interface ApiLaunch {
  flight_number: number;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
  };
  details: string | null;
}

export interface Launch {
  id: number;
  missionName: string;
  rocketName: string;
  imageUrl: string;
  description: string;
}

export type State = {
  launches: Launch[];
  isLoading: boolean;
  error: string | null;
  selectedLaunch: Launch | null;
  isModalOpen: boolean;
};

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Launch[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "OPEN_MODAL"; payload: Launch }
  | { type: "CLOSE_MODAL" };

export const initialState: State = {
  launches: [],
  isLoading: false,
  error: null,
  selectedLaunch: null,
  isModalOpen: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, launches: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, selectedLaunch: action.payload };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, selectedLaunch: null };
    default:
      return state;
  }
}

// вспомогательная функция для маппинга API → Launch
export function mapApiLaunches(data: ApiLaunch[]): Launch[] {
  return data.map((item) => ({
    id: item.flight_number,
    missionName: item.mission_name,
    rocketName: item.rocket.rocket_name,
    imageUrl: item.links.mission_patch || emptyRocketImg,
    description: item.details ?? "No details provided",
  }));
}