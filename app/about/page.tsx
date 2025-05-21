import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BUD Calculator",
  description: "Information about the Beyond Use Date Calculator for pharmaceutical compounding",
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About BUD Calculator</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is a Beyond Use Date?</CardTitle>
            <CardDescription>Understanding BUDs in pharmaceutical compounding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              A Beyond Use Date (BUD) is the date after which a compounded preparation should not be used. It is
              determined based on the date the preparation was compounded.
            </p>
            <p>
              BUDs are assigned based on criteria established in pharmaceutical standards, primarily the United States
              Pharmacopeia (USP) chapters &lt;795&gt; for non-sterile preparations and &lt;797&gt; for sterile
              preparations.
            </p>
            <p>Factors that influence the BUD include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Type of preparation (sterile vs. non-sterile)</li>
              <li>Physical form (solid, liquid, etc.)</li>
              <li>Storage conditions (room temperature, refrigerated, frozen)</li>
              <li>Stability data of ingredients</li>
              <li>Risk of contamination</li>
              <li>Packaging used</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use This Calculator</CardTitle>
            <CardDescription>Guidelines for accurate BUD determination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This calculator provides general guidance based on USP standards. To use it effectively:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Select the preparation date</li>
              <li>Choose the appropriate preparation category</li>
              <li>Select the storage condition</li>
              <li>Review the calculated BUD</li>
            </ol>
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              Important: This calculator provides general guidance only. Always refer to current USP guidelines,
              consider the stability of specific ingredients, and use professional judgment when assigning BUDs.
            </p>
            <p>
              The shortest BUD should always be used when considering multiple factors (e.g., if an ingredient expires
              sooner than the calculated BUD, use the ingredient expiration date instead).
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Calculator</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
