import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SelfieCapture } from "@/components/camera/SelfieCapture";

const CrimeFeed = () => {
  // זה יוחלף בדאטה אמיתי מהשרת
  const mockCrimes = [
    {
      id: 1,
      title: "הצעת נישואים לפסל",
      user: "שמעון",
      points: 100,
      image: "https://picsum.photos/400/300",
      timestamp: "לפני 5 דקות",
    },
    {
      id: 2,
      title: 'שכנוע תייר שאני כוכב כדורגל',
      user: "יוסי",
      points: 150,
      image: "https://picsum.photos/400/301",
      timestamp: "לפני שעה",
    },
  ];

  const handleCapture = (imageData: string) => {
    console.log("Captured image:", imageData);
    // Here we'll later handle the image upload and crime creation
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">פשעי המסיבה</h1>
        <SelfieCapture onCapture={handleCapture} />
      </div>

      {/* Quick Stats */}
      <Card className="mb-6">
        <CardContent className="flex justify-between items-center p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">נקודות קבוצתיות</p>
            <p className="text-xl font-bold">1,250</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">משימות הושלמו</p>
            <p className="text-xl font-bold">8/20</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">דירוג שיכרות</p>
            <p className="text-xl font-bold">🍺🍺🍺</p>
          </div>
        </CardContent>
      </Card>

      {/* Crimes Feed */}
      <div className="space-y-4">
        {mockCrimes.map((crime) => (
          <Card key={crime.id}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{crime.user}</p>
                  <p className="text-sm text-muted-foreground">{crime.timestamp}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {crime.points} נק׳
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <img 
                src={crime.image} 
                alt={crime.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 pt-2">
                <p>{crime.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Crime Button */}
      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default CrimeFeed;