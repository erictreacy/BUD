"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format, addDays, addMonths, addYears } from "date-fns"

type StorageType = "room" | "refrigerated" | "frozen"
type PreparationCategory = "nonsterile-solid" | "nonsterile-liquid" | "sterile"

export default function BeyondUseDateCalculator() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [storageType, setStorageType] = useState<StorageType>("room")
  const [preparationCategory, setPreparationCategory] = useState<PreparationCategory>("nonsterile-solid")
  const [beyondUseDate, setBeyondUseDate] = useState<Date | null>(null)
  const [notes, setNotes] = useState<string>("")
  const [calculationMode, setCalculationMode] = useState<"standard" | "custom">("standard")
  const [customDays, setCustomDays] = useState<number>(30)

  const calculateBeyondUseDate = () => {
    if (!date) return

    let resultDate: Date | null = null
    let resultNotes = ""

    if (calculationMode === "custom") {
      // Use custom days calculation
      resultDate = addDays(date, customDays)
      resultNotes = `Custom calculation: ${customDays} days from preparation date.`
    } else {
      // USP <795> and <797> guidelines for beyond-use dates
      if (preparationCategory === "nonsterile-solid") {
        if (storageType === "room") {
          resultDate = addMonths(date, 6) // 6 months for non-sterile solid at room temp
          resultNotes =
            "Per USP <795>, non-sterile solid preparations stored at controlled room temperature: 6 months or time remaining until earliest ingredient expiration, whichever is shorter."
        } else if (storageType === "refrigerated") {
          resultDate = addMonths(date, 9) // 9 months for refrigerated
          resultNotes =
            "Per USP <795>, non-sterile solid preparations stored in refrigerator: 9 months or time remaining until earliest ingredient expiration, whichever is shorter."
        } else {
          resultDate = addYears(date, 3) // 3 years for frozen
          resultNotes =
            "Per USP <795>, non-sterile solid preparations stored in freezer: 3 years or time remaining until earliest ingredient expiration, whichever is shorter."
        }
      } else if (preparationCategory === "nonsterile-liquid") {
        if (storageType === "room") {
          resultDate = addDays(date, 14) // 14 days for non-sterile liquid at room temp
          resultNotes =
            "Per USP <795>, non-sterile aqueous liquid preparations stored at controlled room temperature: 14 days or time remaining until earliest ingredient expiration, whichever is shorter."
        } else if (storageType === "refrigerated") {
          resultDate = addDays(date, 35) // 35 days for refrigerated
          resultNotes =
            "Per USP <795>, non-sterile aqueous liquid preparations stored in refrigerator: 35 days or time remaining until earliest ingredient expiration, whichever is shorter."
        } else {
          resultDate = addDays(date, 45) // 45 days for frozen
          resultNotes =
            "Per USP <795>, non-sterile aqueous liquid preparations stored in freezer: 45 days or time remaining until earliest ingredient expiration, whichever is shorter."
        }
      } else if (preparationCategory === "sterile") {
        if (storageType === "room") {
          resultDate = addDays(date, 2) // 48 hours for sterile at room temp
          resultNotes =
            "Per USP <797>, sterile preparations at controlled room temperature: 48 hours. Note: This is a simplified calculation. Actual BUD depends on sterility risk level and preparation conditions."
        } else if (storageType === "refrigerated") {
          resultDate = addDays(date, 3) // 3 days for refrigerated
          resultNotes =
            "Per USP <797>, sterile preparations refrigerated: 3 days. Note: This is a simplified calculation. Actual BUD depends on sterility risk level and preparation conditions."
        } else {
          resultDate = addDays(date, 45) // 45 days for frozen
          resultNotes =
            "Per USP <797>, sterile preparations frozen: 45 days. Note: This is a simplified calculation. Actual BUD depends on sterility risk level and preparation conditions."
        }
      }
    }

    setBeyondUseDate(resultDate)
    setNotes(resultNotes)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Beyond Use Date (BUD) Calculator</CardTitle>
        <CardDescription>
          Calculate expiration dates for pharmaceutical compounding based on USP guidelines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="preparation-date" className="text-base font-medium">
            Preparation Date
          </Label>
          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="date"
                  id="preparation-date"
                  className="w-full rounded-md border border-input bg-background px-10 py-3 text-base cursor-pointer focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                  max={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined
                    setDate(selectedDate)
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="default" onClick={() => setDate(new Date())} className="flex-1">
                Today
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  const yesterday = new Date()
                  yesterday.setDate(yesterday.getDate() - 1)
                  setDate(yesterday)
                }}
                className="flex-1"
              >
                Yesterday
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  const lastWeek = new Date()
                  lastWeek.setDate(lastWeek.getDate() - 7)
                  setDate(lastWeek)
                }}
                className="flex-1"
              >
                Last Week
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  const lastMonth = new Date()
                  lastMonth.setMonth(lastMonth.getMonth() - 1)
                  setDate(lastMonth)
                }}
                className="flex-1"
              >
                Last Month
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {date ? (
                <>
                  Selected date: <span className="font-medium">{format(date, "MMMM d, yyyy")}</span>
                </>
              ) : (
                "Please select the date when the preparation was compounded"
              )}
            </p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4 mt-4">
          <Label className="text-base font-medium">Calculation Method</Label>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="standard-calculation"
                name="calculation-mode"
                checked={calculationMode === "standard"}
                onChange={() => setCalculationMode("standard")}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="standard-calculation" className="font-normal">
                Standard USP Guidelines
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="custom-calculation"
                name="calculation-mode"
                checked={calculationMode === "custom"}
                onChange={() => setCalculationMode("custom")}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="custom-calculation" className="font-normal">
                Custom Days
              </Label>
            </div>

            {calculationMode === "custom" && (
              <div className="pl-6 space-y-2">
                <Label htmlFor="custom-days">Number of Days</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="custom-days"
                    min="1"
                    max="3650"
                    value={customDays}
                    onChange={(e) => setCustomDays(Number.parseInt(e.target.value) || 30)}
                    className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span className="text-sm text-muted-foreground">days</span>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomDays(30)}
                      className="text-xs h-8"
                    >
                      30
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomDays(60)}
                      className="text-xs h-8"
                    >
                      60
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomDays(90)}
                      className="text-xs h-8"
                    >
                      90
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {calculationMode === "standard" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="preparation-type" className="text-base font-medium">
                Preparation Category
              </Label>
              <Select
                value={preparationCategory}
                onValueChange={(value) => setPreparationCategory(value as PreparationCategory)}
              >
                <SelectTrigger className="py-6 text-base">
                  <SelectValue placeholder="Select preparation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nonsterile-solid">Non-sterile Solid</SelectItem>
                  <SelectItem value="nonsterile-liquid">Non-sterile Liquid</SelectItem>
                  <SelectItem value="sterile">Sterile Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage-condition" className="text-base font-medium">
                Storage Condition
              </Label>
              <Select value={storageType} onValueChange={(value) => setStorageType(value as StorageType)}>
                <SelectTrigger className="py-6 text-base">
                  <SelectValue placeholder="Select storage condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">Room Temperature (20-25°C)</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated (2-8°C)</SelectItem>
                  <SelectItem value="frozen">Frozen (-25 to -10°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Button
          onClick={calculateBeyondUseDate}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
          size="lg"
        >
          Calculate Beyond Use Date
        </Button>

        {beyondUseDate && (
          <div className="mt-6 p-6 border rounded-md bg-muted">
            <h3 className="font-semibold text-lg mb-3">Results</h3>
            <div className="space-y-3">
              <p className="text-base">
                <span className="font-medium">Preparation Date:</span> {format(date!, "MMMM d, yyyy")}
              </p>
              <p className="text-base">
                <span className="font-medium">Beyond Use Date:</span> {format(beyondUseDate, "MMMM d, yyyy")}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
