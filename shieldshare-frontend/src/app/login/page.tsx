import { AuthLayout } from "@/src/components/layout/AuthLayout"
import { LoginForm } from "@/src/components/forms/LoginForm"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}