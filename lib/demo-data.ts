// Demo users for testing
export const demoUsers = [
  {
    id: "demo_dropshipper",
    email: "dropshipper@demo.com",
    password: "demo123",
    firstName: "Олександр",
    lastName: "Петренко",
    roles: {
      dropshipper: true,
      supplier: false,
    },
    subscription: "Standard",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "demo_supplier",
    email: "supplier@demo.com",
    password: "demo123",
    firstName: "Марія",
    lastName: "Іваненко",
    roles: {
      dropshipper: false,
      supplier: true,
    },
    subscription: "Standard",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "demo_both",
    email: "both@demo.com",
    password: "demo123",
    firstName: "Дмитро",
    lastName: "Коваленко",
    roles: {
      dropshipper: true,
      supplier: true,
    },
    subscription: "Cosmos",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export function initializeDemoData() {
  if (typeof window !== "undefined") {
    // Always reinitialize demo data to ensure it's correct
    localStorage.setItem("dropspace_registered_users", JSON.stringify(demoUsers))
    console.log("Demo data initialized:", demoUsers)
  }
}
