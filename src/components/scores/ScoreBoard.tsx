import { Trophy, Flame, Medal, Beer } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ScoreBoard = () => {
  // This will be replaced with real data from the server
  const mockPlayers = [
    {
      id: 1,
      name: "Yossi",
      points: 450,
      completedMissions: 8,
      achievements: ["First Blood", "Party Animal"],
      drunkLevel: 4,
      streak: 3,
    },
    {
      id: 2,
      name: "David",
      points: 380,
      completedMissions: 6,
      achievements: ["Risk Taker"],
      drunkLevel: 3,
      streak: 1,
    },
    {
      id: 3,
      name: "Moshe",
      points: 320,
      completedMissions: 5,
      achievements: ["Social Butterfly"],
      drunkLevel: 2,
      streak: 2,
    },
    {
      id: 4,
      name: "Groom",
      points: 290,
      completedMissions: 4,
      achievements: ["Bachelor"],
      drunkLevel: 5,
      streak: 0,
    },
  ].sort((a, b) => b.points - a.points);

  const totalGroupPoints = mockPlayers.reduce((sum, player) => sum + player.points, 0);
  const totalMissions = mockPlayers.reduce((sum, player) => sum + player.completedMissions, 0);

  return (
    <div className="py-4">
      {/* Group Stats */}
      <Card className="mb-6 bg-primary/5">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Group Score</h3>
              <div className="text-2xl font-bold flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                {totalGroupPoints}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Missions Done</h3>
              <div className="text-2xl font-bold flex items-center justify-center gap-2">
                <Medal className="w-5 h-5 text-blue-500" />
                {totalMissions}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Leaderboard
        </h2>
        
        {mockPlayers.map((player, index) => (
          <Card key={player.id} className={index === 0 ? "border-2 border-yellow-500" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="text-2xl font-bold text-muted-foreground min-w-[2rem]">
                  #{index + 1}
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{player.name}</h3>
                    {player.streak > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Flame className="w-3 h-3" /> {player.streak}
                      </Badge>
                    )}
                  </div>

                  {/* Progress to next level */}
                  <div className="mt-2">
                    <Progress value={65} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> {player.points}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Medal className="w-3 h-3" /> {player.completedMissions}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Beer className="w-3 h-3" /> {Array(player.drunkLevel).fill("🍺").join("")}
                    </Badge>
                  </div>

                  {/* Achievements */}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {player.achievements.map((achievement) => (
                      <Badge key={achievement} variant="secondary" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;