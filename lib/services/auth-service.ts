import type { User } from "../types"

export class AuthService {
  async login(email: string, password: string): Promise<User> {
    // Simuler une API avec localStorage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const mockUser: User = {
            id: "user-1",
            nom: "Calloway",
            prenom: "Axel",
            email,
            telephone: "+33 6 12 34 56 78",
            commune: "Le Plateau",
          }

          localStorage.setItem("user", JSON.stringify(mockUser))
          resolve(mockUser)
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  }

  async register(userData: Omit<User, "id">): Promise<User> {
    // Simuler une API avec localStorage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newUser: User = {
            ...userData,
            id: `user-${Date.now()}`,
          }

          localStorage.setItem("user", JSON.stringify(newUser))
          resolve(newUser)
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("user")
        resolve()
      }, 500)
    })
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          resolve(JSON.parse(storedUser))
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async verifyOTP(otp: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simuler une vérification OTP
        resolve(otp === "123456")
      }, 1000)
    })
  }
}
