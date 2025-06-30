import { Heart, Users, Calendar, Car, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6 leading-tight">
          Experience Community, Kindness, and Convenience — All in One Place
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          A free, easy-to-use platform bringing synagogue members closer together with seat sharing, 
          event hospitality, and community rides — all powered by the spirit of giving.
        </p>
        <Button size="large" className="mr-4" onClick={() => navigate('/signup')}>
          Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-blue-600" />}
              title="Synagogue Seat Sharing"
              description="Reserve or offer available seats for Shabbat, holidays, and special events."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-gray-400" />}
              title="Hospitality Matching"
              description="Connect hosts and guests for Shabbat and simcha stays in the neighborhood, always for free."
              comingSoon={true}
            />
            <FeatureCard
              icon={<Car className="h-8 w-8 text-gray-400" />}
              title="Community Rides Pool"
              description="Find or offer rides for daily commutes and events within the community."
              comingSoon={true}
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-blue-600" />}
              title="No Money, All Kindness"
              description="Our platform runs entirely on volunteerism and chessed, never commercial transactions."
            />
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
    </div>
  );
}

function FeatureCard({ icon, title, description, comingSoon = false }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  comingSoon?: boolean;
}) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow relative ${comingSoon ? 'opacity-75' : ''}`}>
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Coming Soon
          </span>
        </div>
      )}
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;