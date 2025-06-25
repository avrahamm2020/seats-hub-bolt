import React from 'react';
import { Calendar } from 'lucide-react';

type Reservation = {
  id: string;
  resourceType: 'seat' | 'hospitality' | 'ride';
  date: string;
  service?: string;
  quantity: number;
  section?: 'men' | 'women';
  status: 'active' | 'completed' | 'cancelled';
};

const mockReservations: Reservation[] = [
  {
    id: '1',
    resourceType: 'seat',
    date: '2025-03-21',
    service: 'Kabbalat Shabbat',
    quantity: 2,
    section: 'men',
    status: 'active'
  },
  {
    id: '2',
    resourceType: 'seat',
    date: '2025-03-22',
    service: 'Shacharit',
    quantity: 1,
    section: 'women',
    status: 'active'
  },
  {
    id: '3',
    resourceType: 'seat',
    date: '2024-02-15',
    service: 'Mincha',
    quantity: 2,
    section: 'men',
    status: 'completed'
  },
  {
    id: '4',
    resourceType: 'seat',
    date: '2024-02-14',
    service: 'Kabbalat Shabbat',
    quantity: 1,
    section: 'women',
    status: 'completed'
  }
];

export default function MyReservations() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const futureReservations = mockReservations
    .filter(res => {
      const resDate = new Date(res.date);
      resDate.setHours(0, 0, 0, 0);
      return resDate >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastReservations = mockReservations
    .filter(res => {
      const resDate = new Date(res.date);
      resDate.setHours(0, 0, 0, 0);
      return resDate < now;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <div className="flex items-start space-x-3 border-b pb-4">
      <Calendar className="h-5 w-5 text-blue-600 mt-1" />
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-medium text-gray-900">
            {reservation.service}
          </p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            reservation.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : reservation.status === 'completed'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(reservation.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {reservation.section && (
          <p className="text-sm text-blue-600">
            {reservation.section === 'men' ? "Men's Section" : "Women's Section"}
          </p>
        )}
        <p className="text-sm text-gray-600">
          {reservation.quantity} {reservation.quantity === 1 ? 'seat' : 'seats'} reserved
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-blue-900 mb-6">My Reservations</h2>
      
      {mockReservations.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          You haven't made any reservations yet.
        </p>
      ) : (
        <div className="space-y-6">
          {futureReservations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-4">
                Upcoming Reservations
              </h3>
              <div className="space-y-4">
                {futureReservations.map(reservation => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
              </div>
            </div>
          )}

          {pastReservations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Past Reservations
              </h3>
              <div className="space-y-4 opacity-75">
                {pastReservations.map(reservation => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}