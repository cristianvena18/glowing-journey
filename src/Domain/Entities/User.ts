class User {
  private name: string;
  private surname: string;
  private email: string;
  private password: string;

  public constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.surname = '';
    this.name = '';
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setSurname(surname: string): void {
    this.surname = surname;
  }
}

export default User;