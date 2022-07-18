export default interface UserType {
  id: null,
  username: string,
  email: string,
  password: string,
  newPassword: string,
  roles?: Array<string>
}