import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, Trophy, Beer } from "lucide-react"
import { SelfieCapture } from "@/components/camera/SelfieCapture"

export default function Index() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Trophy className="w-6 h-6 mx-auto mb-2" />
          <div className="text-2xl font-bold">350</div>
          <div className="text-sm text-muted-foreground">נקודות</div>
        </Card>
        <Card className="p-4 text-center">
          <Beer className="w-6 h-6 mx-auto mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-muted-foreground">משימות הושלמו</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold mb-2">🏆</div>
          <div className="text-2xl font-bold">#3</div>
          <div className="text-sm text-muted-foreground">דירוג</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 justify-center">
        <SelfieCapture />
        <Button variant="outline" size="lg" className="flex-1">
          משימה חדשה
        </Button>
      </div>

      {/* Active Missions */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4 text-right">משימות פעילות</h2>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            <Card className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">🎯 100 נק׳</div>
                <div className="text-right">
                  <div className="font-medium">שכנע מישהו שאתה שחקן כדורגל</div>
                  <div className="text-sm text-muted-foreground">נותרו 45 דקות</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">🍺 150 נק׳</div>
                <div className="text-right">
                  <div className="font-medium">שתה בירה צ׳כית בדקה</div>
                  <div className="text-sm text-muted-foreground">נותרו 2 שעות</div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4 text-right">פעילות אחרונה</h2>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            <Card className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">לפני 5 דקות</div>
                <div className="text-right">
                  <div className="font-medium">יוסי השלים משימה!</div>
                  <div className="text-sm text-muted-foreground">הרוויח 100 נקודות</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">לפני 15 דקות</div>
                <div className="text-right">
                  <div className="font-medium">דני צילם פשע חדש!</div>
                  <div className="text-sm text-muted-foreground">קיבל 3 תגובות 🔥</div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}