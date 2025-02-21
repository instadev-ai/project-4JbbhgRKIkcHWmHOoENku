import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Flame, ThumbsUp } from "lucide-react"

// Temporary mock data
const completedMissions = [
  {
    id: 1,
    playerName: "יוסי",
    playerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    missionName: "שכנע מישהו שאתה שחקן כדורגל",
    points: 100,
    timeAgo: "לפני 5 דקות",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    likes: 12,
    fires: 5,
  },
  {
    id: 2,
    playerName: "דני",
    playerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    missionName: "הצטלם עם 5 תיירים",
    points: 150,
    timeAgo: "לפני שעה",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    likes: 8,
    fires: 3,
  },
  {
    id: 3,
    playerName: "משה",
    playerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    missionName: "שתה בירה צ׳כית בדקה",
    points: 200,
    timeAgo: "לפני 2 שעות",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    likes: 15,
    fires: 7,
  },
]

export const CompletedMissions = () => {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-right mb-4">משימות שהושלמו</h2>
        {completedMissions.map((mission) => (
          <Card key={mission.id} className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-row-reverse">
                  <Avatar className="h-10 w-10">
                    <img src={mission.playerAvatar} alt={mission.playerName} />
                  </Avatar>
                  <div className="text-right">
                    <h3 className="font-semibold">{mission.playerName}</h3>
                    <p className="text-sm text-gray-500">{mission.timeAgo}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {mission.points} נק׳
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">{mission.missionName}</p>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={mission.image}
                  alt={mission.missionName}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex justify-end space-x-4 flex-row-reverse">
                <button className="flex items-center space-x-2 flex-row-reverse">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{mission.likes}</span>
                </button>
                <button className="flex items-center space-x-2 flex-row-reverse">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>{mission.fires}</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}