import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MissionsList = () => {
  // זה יוחלף בדאטה אמיתי מהשרת
  const mockMissions = [
    {
      id: 1,
      title: "הצעת נישואים לפסל",
      description: "בחר פסל במרכז העיר, כרע ברך, וצלם הוכחה",
      points: 100,
      difficulty: "קל",
      category: "מביך",
      location: "כיכר העיר העתיקה",
      isCompleted: false,
    },
    {
      id: 2,
      title: "שכנע תייר שאתה כוכב כדורגל",
      description: "מצא תייר והעמד פנים שאתה שחקן נבחרת ישראל",
      points: 150,
      difficulty: "בינוני",
      category: "חברתי",
      location: "כל מקום",
      isCompleted: true,
    },
    {
      id: 3,
      title: "הזמן בירה בצ'כית",
      description: "תזמין בירה בצ'כית מושלמת, כולל המבטא",
      points: 80,
      difficulty: "קשה",
      category: "שפה",
      location: "פאב",
      isCompleted: false,
    },
    {
      id: 4,
      title: "צילום קבוצתי עם שוטרים",
      description: "שכנע שני שוטרים להצטלם איתך לתמונה מצחיקה",
      points: 200,
      difficulty: "קשה",
      category: "אתגר",
      location: "רחובות העיר",
      isCompleted: false,
    },
  ];

  const categories = ["הכל", "מביך", "חברתי", "שפה", "אתגר"];

  return (
    <div className="py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">משימות</h1>
        <p className="text-muted-foreground">השלם משימות, צבור נקודות, תתבייש!</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="חפש משימה..." className="pr-10" />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-4">
        {mockMissions.map((mission) => (
          <Card key={mission.id} className={mission.isCompleted ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{mission.title}</h3>
                  <p className="text-sm text-muted-foreground">{mission.description}</p>
                </div>
                <Badge variant={mission.isCompleted ? "secondary" : "default"}>
                  {mission.points} נק׳
                </Badge>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">{mission.difficulty}</Badge>
                <Badge variant="outline">{mission.category}</Badge>
                {mission.isCompleted && (
                  <Badge variant="secondary">הושלם ✓</Badge>
                )}
              </div>

              {!mission.isCompleted && (
                <Button className="w-full mt-4" variant="secondary">
                  השלם משימה
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MissionsList;