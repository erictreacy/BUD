import BeyondUseDateCalculator from "@/components/beyond-use-date-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BUD - Beyond Use Date Calculator",
  description: "A tool used to calculate expiration dates in pharmaceutical compounding",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Beyond Use Date Calculator</h1>
        <p className="text-muted-foreground mb-8">
          A tool used to calculate expiration dates in pharmaceutical compounding
        </p>
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-medium mb-2">How to use this calculator:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Select the preparation date using the date input or quick date buttons</li>
            <li>Choose between standard USP guidelines or custom days calculation</li>
            <li>For standard calculation: Select preparation category and storage condition</li>
            <li>For custom calculation: Enter the desired number of days</li>
            <li>Click "Calculate" to determine the Beyond Use Date</li>
          </ol>
        </div>
        <BeyondUseDateCalculator />
      </div>
    </main>
  )
}
