import { AuthLayout } from "@/src/components/layout/AuthLayout"
import { RegisterForm } from "@/src/components/forms/RegisterForm"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}