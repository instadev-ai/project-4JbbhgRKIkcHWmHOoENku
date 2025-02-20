import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Trophy, Medal, Beer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserProfileProps {
  name: string
  avatarUrl?: string
  points: number
  completedMissions: number
  drunkLevel: number
}

export const UserProfile = ({
  name,
  avatarUrl,
  points,
  completedMissions,
  drunkLevel,
}: UserProfileProps) => {
  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="text-xl">{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">פרופיל שחקן</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">ניקוד כולל:</span>
              <span className="font-bold">{points} נק׳</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-blue-500" />
              <span className="font-medium">משימות שהושלמו:</span>
              <span className="font-bold">{completedMissions}</span>
            </div>

            <div className="flex items-center gap-2">
              <Beer className="h-5 w-5 text-amber-500" />
              <span className="font-medium">רמת שיכרות:</span>
              <span className="font-bold">
                {Array(drunkLevel).fill("🍺").join("")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">מתחיל הפשע</Badge>
            <Badge variant="secondary">שתיין מתחיל</Badge>
            <Badge variant="secondary">צלם חובב</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}