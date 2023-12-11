import { useAuth } from "@/context/auth-context";

import { useNotifications } from "@/context/notification-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDateRange } from "@/lib/utils";
import { Calendar, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, clear, markAsSeen } = useNotifications();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome back, {user?.username}</h1>
      <div className=" border-b pb-2">
        <p className="text-muted-foreground text-lg">Recent Actions : </p>
      </div>
      <div className="flex flex-col gap-4">
        {notifications.length > 0 ? (
          notifications.map(({ id, booking, seen }) => {
            return (
              <Card
                key={id}
                onMouseEnter={() => markAsSeen(id)}
                className={cn(!seen && "border-red-300")}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>New Booking</CardTitle>
                      <CardDescription>
                        A new booking was created
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => clear(id)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="items-cetner flex gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground" size={20} />
                        {formatDateRange(booking.from, booking.to)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="text-muted-foreground" size={20} />
                        {booking.persons}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/bookings")}
                      >
                        Goto bookings
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/calendar")}
                      >
                        Goto Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">No recent actions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
