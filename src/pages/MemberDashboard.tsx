import { Calendar, Users, Car } from 'lucide-react';
import Button from '../components/Button';
import SeatContribution from '../components/SeatContribution';
import SeatReservations from '../components/SeatReservations';
import MyReservations from '../components/MyReservations';
import { useUser } from '../context/UserContext';

function MemberDashboard() {
  const { user } = useUser();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome!</h1>
      <p className="text-gray-600 mb-8">{user?.email}</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ActionCard
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          title="Seat Reservations"
          description="Book or offer seats for upcoming events"
          action="Reserve Seat"
        />
        <ActionCard
          icon={<Users className="h-8 w-8 text-blue-600" />}
          title="Hospitality"
          description="Find or offer hospitality for Shabbat"
          action="View Options"
        />
        <ActionCard
          icon={<Car className="h-8 w-8 text-gray-400" />}
          title="Ride Sharing"
          description="Connect with others for rides"
          action="Coming Soon"
          comingSoon={true}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <MyReservations />
          <SeatContribution />
        </div>
        <SeatReservations />
      </div>
    </div>
  );
}

function ActionCard({ icon, title, description, action, comingSoon = false }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  action: string;
  comingSoon?: boolean;
}) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md relative ${comingSoon ? 'opacity-75' : ''}`}>
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Coming Soon
          </span>
        </div>
      )}
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button 
        variant="outline" 
        size="small"
        disabled={comingSoon}
        className={comingSoon ? 'cursor-not-allowed' : ''}
      >
        {action}
      </Button>
    </div>
  );
}

export default MemberDashboard;