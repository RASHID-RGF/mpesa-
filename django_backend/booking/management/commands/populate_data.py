from django.core.management.base import BaseCommand
from booking.models import Destination


class Command(BaseCommand):
    help = 'Populate database with sample destination data'

    def handle(self, *args, **options):
        # Sample destination data
        destinations = [
            {
                'name': 'Maasai Mara Safari',
                'description': 'Experience the incredible wildlife of Maasai Mara, home to the Big Five and the Great Migration.',
                'price': 15000.00,
                'image': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
                'location': 'Maasai Mara, Kenya',
                'duration': '3 Days / 2 Nights',
                'rating': 4.8
            },
            {
                'name': 'Amboseli National Park',
                'description': 'Witness Mount Kilimanjaro and diverse wildlife in this stunning conservation area.',
                'price': 12000.00,
                'image': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                'location': 'Amboseli, Kenya',
                'duration': '2 Days / 1 Night',
                'rating': 4.6
            },
            {
                'name': 'Tsavo East National Park',
                'description': 'Explore the red elephant country and ancient archaeological sites in Tsavo East.',
                'price': 10000.00,
                'image': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                'location': 'Tsavo East, Kenya',
                'duration': '2 Days / 1 Night',
                'rating': 4.4
            },
            {
                'name': 'Lake Nakuru National Park',
                'description': 'Home to over 400 species of birds and the famous flamingos at Lake Nakuru.',
                'price': 8000.00,
                'image': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                'location': 'Nakuru, Kenya',
                'duration': '1 Day',
                'rating': 4.5
            },
            {
                'name': 'Aberdare National Park',
                'description': 'Mountain forest with bamboo zones and excellent wildlife viewing opportunities.',
                'price': 11000.00,
                'image': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                'location': 'Aberdare, Kenya',
                'duration': '2 Days / 1 Night',
                'rating': 4.3
            },
            {
                'name': 'Samburu National Reserve',
                'description': 'Northern Kenya safari destination known for its unique wildlife species.',
                'price': 13000.00,
                'image': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                'location': 'Samburu, Kenya',
                'duration': '3 Days / 2 Nights',
                'rating': 4.7
            }
        ]

        # Create destinations
        for dest_data in destinations:
            destination, created = Destination.objects.get_or_create(
                name=dest_data['name'],
                defaults=dest_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created destination "{destination.name}"')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Destination "{destination.name}" already exists')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample destinations')
        )