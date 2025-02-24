export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserPicture {
  large: string
  medium: string
  thumbnail: string
}

export interface Street {
  number: number
  name: string
}

// TODO move street to its own interface
export interface UserLocation {
  street: Street
  city: string
  state: string
  country: string
  postcode: string | number
}

export interface DOB {
  date: string
  age: number
}

// TODO move DOB to its own interface
export interface User {
  gender: string
  name: UserName
  location: UserLocation
  email: string
  dob: DOB
  phone: string
  cell: string
  picture: UserPicture
}
