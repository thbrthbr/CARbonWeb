import create from 'zustand';
import { persist } from 'zustand/middleware';
import { addMonths, subMonths } from 'date-fns';

const ProfileStore = create(
  (set) => ({
    id: '',
    setId: (input) => set({ id: input }),

    password: '',
    setPassword: (input) => set({ password: input }),

    nickname: '',
    setNickname: (input) => set({ nickname: input }),

    phoneNumber: '',
    setPhoneNumber: (input) => set({ phoneNumber: input }),

    ownCar: false,
    setOwnCar: (input) => set({ ownCar: input }),

    canDrive: false,
    setCanDrive: (input) => set({ canDrive: input }),

    gender: false,
    setGender: (input) => set({ gender: input }),

    rating: '',
    setRating: (input) => set({ rating: input }),

    mileage: '',
    setMileage: (input) => set({ mileage: input }),

    carPoolCount: '',
    setCarPoolCount: (input) => set({ carPoolCount: input }),

    switchOn: true,
    setSwitchOn: (input) => set({ switchOn: input }),

    phoneF: '',
    setPhoneF: (input) => set({ phoneF: input }),

    phoneS: '',
    setPhoneS: (input) => set({ phoneS: input }),

    phoneT: '',
    setPhoneT: (input) => set({ phoneT: input }),
  }),
  {
    name: 'login-stuff',
    getStorage: () => sessionStorage,
  },
);

const calenderStore = create((set, get) => ({
  currentMonth: new Date(),
  setcurrentMonth: (input) => set({ currentMonth: input }),

  prevMonth: () => set({ currentMonth: subMonths(get().currentMonth, 1) }),

  nextMonth: () => set({ currentMonth: addMonths(get().currentMonth, 1) }),

  selectedDate: new Date(),
  setSelectedDate: (input) => set({ selectedDate: input }),

  data: null,
  setData: (input) => set({ data: input }),

  row: null,
  setRow: (input) => set({ row: input }),
}));

const calenderStore2 = create((set, get) => ({
  loading: false,
  setLoading: (input) => set({ loading: input }),
}));

const TodayStore = create((set, get) => ({
  boxSwitch: false,
  setBoxSwitch: (input) => set({ boxSwitch: input }),

  emission: 0,
  setEmission: (input) => set({ emission: input }),

  point: 0,
  setPoint: (input) => set({ point: input }),

  level: 0,
  setLevel: (input) => set({ level: input }),

  emission2: 0,
  setEmission2: (input) => set({ emission2: input }),

  point2: 0,
  setPoint2: (input) => set({ point2: input }),

  level2: 0,
  setLevel2: (input) => set({ level2: input }),
}));

const ChannelStore = create((set, get) => ({
  mapRender: null,
  setMapRender: (input) => set({ mapRender: input }),

  flag: false,
  setFlag: (input) => set({ flag: input }),

  locationMaster: [],
  setLocationMaster: (input) => set({ locationMaster: input }),

  roomDriverId: null,
  setRoomDriverId: (input) => set({ roomDriverId: input }),

  enteredPostId: null,
  setEnteredPostId: (input) => set({ enteredPostId: input }),

  roomContent: null,
  setRoomContent: (input) => set({ roomContent: input }),

  contentEdit: false,
  setContentEdit: (input) => set({ contentEdit: input }),

  searchWord: null,
  setSearchWord: (input) => set({ searchWord: input }),

  tempIdSave: null,
  setTempIdSave: (input) => set({ tempIdSave: input }),

  clicked: false,
  setClicked: (input) => set({ clicked: input }),

  userId: null,
  setUserId: (input) => set({ userId: input }),

  title: null,
  setTitle: (input) => set({ title: input }),

  departures: null,
  setDepartures: (input) => set({ departures: input }),

  departuresLatitude: null,
  setDeparturesLatitude: (input) => set({ departuresLatitude: input }),

  departuresLongitude: null,
  setDeparturesLongitude: (input) => set({ departuresLongitude: input }),

  arrivals: null,
  setArrivals: (input) => set({ arrivals: input }),

  arrivalsLatitude: null,
  setArrivalsLatitude: (input) => set({ arrivalsLatitude: input }),

  arrivalsLongitude: null,
  setArrivalsLongitude: (input) => set({ arrivalsLongitude: input }),

  personnel: 2,
  setPersonnel: (input) => set({ personnel: input }),

  content: null,
  setContent: (input) => set({ content: input }),

  regular: false,
  setRegular: (input) => set({ regular: input }),

  carpoolDate: null,
  setCarpoolDate: (input) => set({ carpoolDate: input }),

  channelList: [],
  setChannelList: (input) => set({ channelList: input }),

  channelArr: [],
  addChannelArr: (input) =>
    set((state) => ({ channelArr: [...state.channelArr, input] })),
  setChannelArr: (input) => set({ channelArr: input }),

  startPoint: true,
  setStartPoint: (input) => set({ startPoint: input }),

  place: '',
  setPlace: (input) => set({ place: input }),

  inputStartPoint: null,
  setInputStartPoint: (input) => set({ inputStartPoint: input }),

  inputEndPoint: null,
  setInputEndPoint: (input) => set({ inputEndPoint: input }),

  search: '',
  setSearch: (input) => set({ search: input }),

  search2: '',
  setSearch2: (input) => set({ search2: input }),

  isOpen: true,
  setIsOpen: (input) => set({ isOpen: input }),

  showListD: false,
  setShowListD: (input) => set({ showListD: input }),

  showListA: false,
  setShowListA: (input) => set({ showListA: input }),

  channelPg: 0,
  setChannelPg: (input) => set({ channelPg: input }),

  channelPg2: 0,
  setChannelPg2: (input) => set({ channelPg2: input }),

  pageNum: 0,
  setPageNum: (input) => set({ pageNum: input }),

  firstTake: false,
  setFirstTake: (input) => set({ firstTake: input }),

  please: null,
  setPlease: (input) => set({ please: input }),

  arroundArr: [],
  addArroundArr: (input) =>
    set((state) => ({ arroundArr: [...state.arroundArr, input] })),

  channelCount: 0,
  setChannelCount: (input) => set({ channelCount: input }),

  driverExsist: false,
  setDriverExsist: (input) => set({ driverExsist: input }),

  isRoomOn: false,
  setIsRoomOn: (input) => set({ isRoomOn: input }),

  render: false,
  setRender: (input) => set({ render: input }),

  temp: '',
  setTemp: (input) => set({ temp: input }),

  secondArr: [],
  addSecondArr: (input) =>
    set((state) => ({ secondArr: [...state.secondArr, input] })),
  setSecondArr: (input) => set({ secondArr: input }),

  roomDeparture: null,
  setRoomDeparture: (input) => set({ roomDeparture: input }),

  roomArrival: null,
  setRoomArrival: (input) => set({ roomArrival: input }),

  roomHost: null,
  setRoomHost: (input) => set({ roomHost: input }),

  roomDriver: null,
  setRoomDriver: (input) => set({ roomDriver: input }),

  isMaster: false,
  setIsMaster: (input) => set({ isMaster: input }),

  roomPeople: [],
  setRoomPeople: (input) => set({ roomPeople: input }),

  myCarpools: [],
  setMyCarpools: (input) => set({ myCarpools: input }),

  forLayOut: [],
  setForLayOut: (input) => set({ forLayOut: input }),
}));

const LoginStore = create((set, get) => ({
  isSignIn: false,
  setIsSignIn: (input) => set({ isSignIn: input }),

  // id: "",
  // setId: (input) => set({ id: input }),

  // password: '',
  // setPassword: (input) => set({ password: input }),

  // nickname: '',
  // setNickname: (input) => set({ nickname: input }),

  // name: '',
  // setName: (input) => set({ name: input }),

  // gender: '',
  // setGender: (input) => set({ gender: input }),

  // phoneF: '',
  // setPhoneF: (input) => set({ phoneF: input }),

  // phoneS: '',
  // setPhoneS: (input) => set({ phoneS: input }),

  // phoneT: '',
  // setPhoneT: (input) => set({ phoneT: input }),

  // birthdateY: '',
  // setBirthdateY: (input) => set({ birthdateY: input }),

  // birthdateM: '',
  // setBirthdateM: (input) => set({ birthdateM: input }),

  // birthdateD: '',
  // setBirthdateD: (input) => set({ birthdateD: input }),

  // isDriver: false,
  // setIsDriver: (input) => set({ isDriver: input }),

  // ownCar: false,
  // setOwnCar: (input) => set({ ownCar: input }),
}));

const MasterStore = create(
  persist(
    (set) => ({
      loggedin: false,
      setLoggedin: (input) => set({ loggedin: input }),
    }),
    {
      name: 'snsLogState',
      getStorage: () => sessionStorage,
    },
  ),
);

const MasterStore2 = create(
  persist(
    (set) => ({
      loggedId: null,
      setLoggedId: (input) => set({ loggedId: input }),
    }),
    {
      name: 'loggedId',
      getStorage: () => sessionStorage,
    },
  ),
);

const MasterStore3 = create(
  persist(
    (set) => ({
      loggedRealId: null,
      setLoggedRealId: (input) => set({ loggedRealId: input }),
    }),
    {
      name: 'loggedRealId',
      getStorage: () => sessionStorage,
    },
  ),
);

const MasterStore4 = create(
  persist(
    (set) => ({
      loggedNickname: null,
      setLoggedNickname: (input) => set({ loggedNickname: input }),
    }),
    {
      name: 'loggedNickname',
      getStorage: () => sessionStorage,
    },
  ),
);

export {
  calenderStore,
  calenderStore2,
  ProfileStore,
  ChannelStore,
  LoginStore,
  MasterStore,
  MasterStore2,
  MasterStore3,
  MasterStore4,
  TodayStore,
};
