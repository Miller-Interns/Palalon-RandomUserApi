
export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

// TODO move street to its own interface
export interface UserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

// TODO move DOB to its own interface
export interface User {
  gender: string;
  name: UserName;
  location: UserLocation;
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: UserPicture;
}
