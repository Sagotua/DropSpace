"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Check, Star, AlertCircle, Crown, Shield, TrendingUp, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const subscriptionPlans = [
  {
    id: "test",
    name: "Test",
    price: 0,
    period: "14 днів безкоштовно",
    description: "Безкоштовно на 14 днів",
    features: [
      "До 50 продуктів",
      "До 10 замовлень на місяць",
      "Базова аналітика",
      "Email підтримка",
      "Експорт на 1 маркетплейс",
    ],
    buttonText: "Почати тест",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Clock,
    color: "text-gray-400",
    bgGradient: "from-gray-500/20 to-slate-600/20",
  },
  {
    id: "standard",
    name: "Standard",
    price: 5,
    period: "/міс",
    description: "Для малого бізнесу",
    features: [
      "До 1,000 продуктів",
      "Необмежені замовлення",
      "Розширена аналітика",
      "Пріоритетна підтримка",
      "Експорт на всі маркетплейси",
      "API доступ",
      "Автоматизація замовлень",
    ],
    buttonText: "Обрати план",
    buttonVariant: "default" as const,
    popular: true,
    icon: Shield,
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-purple-600/20",
  },
  {
    id: "cosmos",
    name: "Cosmos",
    price: 25,
    period: "/міс",
    description: "Для професіоналів",
    features: [
      "Необмежені продукти",
      "Необмежені замовлення",
      "Преміум аналітика",
      "24/7 підтримка",
      "Всі інтеграції",
      "Персональний менеджер",
      "Білий лейбл",
      "Кастомні звіти",
      "Приоритетні оновлення",
    ],
    buttonText: "Обрати план",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Crown,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-orange-600/20",
  },
]

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!user) return null

  const currentSubscription = user.subscription || "Test"

  const handlePlanSelect = (planId: string) => {
    if (planId === currentSubscription.toLowerCase()) return

    setSelectedPlan(planId)

    if (planId === "test") {
      // Handle test plan activation
      handleTestActivation()
    } else {
      // Open payment modal for paid plans
      setShowPaymentModal(true)
    }
  }

  const handleTestActivation = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Тестовий період активовано на 14 днів!")
    setIsProcessing(false)
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would integrate with Stripe/Paddle
    alert(`Підписка "${selectedPlan}" успішно активована!`)

    setIsProcessing(false)
    setShowPaymentModal(false)
    setSelectedPlan(null)
  }

  const handleCancelSubscription = () => {
    if (confirm("Ви впевнені, що хочете скасувати підписку?")) {
      alert("Підписка буде скасована в кінці поточного періоду")
    }
  }

  const getNextBillingDate = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return date.toLocaleDateString("uk-UA")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Підписка</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Оберіть план, який найкраще підходить для вашого бізнесу. Ви можете змінити або скасувати підписку в будь-який
          час.
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="space-gradient border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Поточна підписка: {currentSubscription}</h3>
                  <p className="text-sm text-gray-400">
                    {currentSubscription === "Test"
                      ? "Тестовий період до 15.02.2024"
                      : `Наступне списання: ${getNextBillingDate()}`}
                  </p>
                </div>
              </div>
              {currentSubscription !== "Test" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelSubscription}
                  className="bg-transparent border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Скасувати
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {subscriptionPlans.map((plan) => {
          const isCurrentPlan = plan.name.toLowerCase() === currentSubscription.toLowerCase()
          const PlanIcon = plan.icon

          return (
            <Card
              key={plan.id}
              className={`space-gradient border-slate-700 relative hover:border-slate-600 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-blue-500/50" : ""
              } ${isCurrentPlan ? "ring-2 ring-green-500/50" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
                  Популярний
                </Badge>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <Badge className="absolute -top-3 right-4 bg-green-500 hover:bg-green-600">Поточний план</Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${plan.bgGradient} flex items-center justify-center mb-4`}
                >
                  <PlanIcon className={`w-8 h-8 ${plan.color}`} />
                  {plan.name === "Cosmos" && <Star className="w-4 h-4 text-yellow-400 ml-1" />}
                </div>

                <CardTitle className="text-white text-xl flex items-center justify-center space-x-2">
                  <span>{plan.name}</span>
                </CardTitle>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">
                    ${plan.price}
                    <span className="text-lg text-gray-400 font-normal">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button
                  className={`w-full ${
                    plan.buttonVariant === "default"
                      ? "cosmic-glow"
                      : "bg-transparent border-slate-600 hover:bg-slate-700"
                  }`}
                  variant={plan.buttonVariant}
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isCurrentPlan || isProcessing}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Обробка...
                    </>
                  ) : isCurrentPlan ? (
                    "Поточний план"
                  ) : (
                    plan.buttonText
                  )}
                </Button>

                {/* Upgrade/Downgrade hints */}
                {!isCurrentPlan && currentSubscription !== "Test" && (
                  <div className="text-center">
                    {plan.price >
                    (subscriptionPlans.find((p) => p.name.toLowerCase() === currentSubscription.toLowerCase())?.price ||
                      0) ? (
                      <p className="text-xs text-blue-400 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Покращення плану
                      </p>
                    ) : (
                      plan.price <
                        (subscriptionPlans.find((p) => p.name.toLowerCase() === currentSubscription.toLowerCase())
                          ?.price || 0) && (
                        <p className="text-xs text-yellow-400 flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Зміна плану
                        </p>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features Comparison */}
      <Card className="space-gradient border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">Порівняння можливостей</CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Детальне порівняння всіх планів підписки
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-gray-300">Можливості</th>
                  <th className="text-center py-3 text-gray-300">Test</th>
                  <th className="text-center py-3 text-gray-300">Standard</th>
                  <th className="text-center py-3 text-gray-300">Cosmos</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: "Кількість продуктів", test: "50", standard: "1,000", cosmos: "Необмежено" },
                  { feature: "Замовлення на місяць", test: "10", standard: "Необмежено", cosmos: "Необмежено" },
                  { feature: "Аналітика", test: "Базова", standard: "Розширена", cosmos: "Преміум" },
                  { feature: "Підтримка", test: "Email", standard: "Пріоритетна", cosmos: "24/7" },
                  { feature: "API доступ", test: "❌", standard: "✅", cosmos: "✅" },
                  { feature: "Персональний менеджер", test: "❌", standard: "❌", cosmos: "✅" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-3 text-gray-300">{row.feature}</td>
                    <td className="py-3 text-center text-gray-400">{row.test}</td>
                    <td className="py-3 text-center text-gray-300">{row.standard}</td>
                    <td className="py-3 text-center text-white">{row.cosmos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="space-gradient border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">Часті питання</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                question: "Чи можу я змінити план в будь-який час?",
                answer: "Так, ви можете покращити або змінити план в будь-який час. Зміни набудуть чинності негайно.",
              },
              {
                question: "Що відбувається після закінчення тестового періоду?",
                answer:
                  "Після закінчення 14-денного тестового періоду ваш акаунт буде обмежений. Ви можете обрати платний план для продовження роботи.",
              },
              {
                question: "Чи є знижки для річної оплати?",
                answer: "Так, при оплаті за рік ви отримуєте знижку 20% на всі платні плани.",
              },
              {
                question: "Чи можу я скасувати підписку?",
                answer:
                  "Так, ви можете скасувати підписку в будь-який час. Доступ до платних функцій збережеться до кінця оплаченого періоду.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-white font-medium">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Підтвердження підписки</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ви обрали план "{subscriptionPlans.find((p) => p.id === selectedPlan)?.name}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {selectedPlan && (
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">План:</span>
                  <span className="text-white font-medium">
                    {subscriptionPlans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-300">Ціна:</span>
                  <span className="text-white font-medium">
                    ${subscriptionPlans.find((p) => p.id === selectedPlan)?.price}/міс
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-slate-600"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessing}
              >
                Скасувати
              </Button>
              <Button className="flex-1 cosmic-glow" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Обробка...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Оплатити
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
