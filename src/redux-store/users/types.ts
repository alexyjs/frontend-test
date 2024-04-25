export interface UsersState {
  isLoading: boolean,
  authorStatus?: 'Completed' | 'Falier' | string,
  quoteStatus?: 'Completed' | 'Falier' | string,
  profile?: User,
  quote?: Quote | null,
  author?: Author | null,
  error?: string
}

export interface User {
  email: string,
  fullname: string
}

export interface Quote {
  quoteId: number,
  authorId: number,
  quote: string
}

export interface Author {
  authorId: number,
  name: string
}

export interface ILoginRequest {
  email: string,
  password: string
}
