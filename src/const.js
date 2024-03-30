const TYPE_POINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const PRICE = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const CITY = new Map([
  [0, 'Baghdad'],
  [1, 'Cairo'],
  [2, 'Sanaa'],
  [3, 'Doha'],
  [4, 'Rabat'],
  [5, 'Amman']
]);

const DESCRIPTION = new Map([
  [0, 'Baghdad, the capital of Iraq, is a city steeped in rich history and culture, with architectural marvels like the iconic Al-Mustansiriya University. The Tigris River flows through the heart of Baghdad, adding to its charm and providing scenic views for visitors and locals alike.'],
  [1, 'Cairo, the vibrant capital of Egypt, is known for its ancient wonders such as the Great Pyramids of Giza and the Sphinx. Bustling markets, majestic mosques like Al-Azhar Mosque, and the historic Cairo Citadel showcase the city\'s mix of tradition and modernity, making it a fascinating destination for travelers.'],
  [2, 'Sanaa, the picturesque capital of Yemen, boasts unique architecture with its ancient multistory buildings adorned with beautiful geometric patterns. The Old City of Sanaa, a UNESCO World Heritage Site, offers a glimpse into Yemen\'s rich heritage and cultural legacy, attracting visitors with its distinct charm and character.'],
  [3, 'Doha, the capital of Qatar, is a modern metropolis set against the backdrop of the Arabian Gulf, known for its futuristic skyscrapers and luxurious shopping malls. The Museum of Islamic Art, the stunning Corniche promenade, and the bustling Souq Waqif highlight Doha\'s blend of tradition and innovation, captivating visitors from around the world.'],
  [4, 'Rabat, the capital of Morocco, combines historic landmarks like the Kasbah of the Udayas with modern developments, creating a unique blend of past and present. The Royal Palace, picturesque Andalusian Gardens, and the vibrant medina showcase Rabat\'s diverse cultural heritage and provide a glimpse into the kingdom\'s rich history.'],
  [5, 'Amman, the capital of Jordan, is a bustling city known for its ancient ruins, including the iconic Citadel and Roman Theatre. Nestled between the desert and the fertile Jordan Valley, Amman offers a mix of traditional markets, contemporary art galleries, and culinary delights, making it a captivating destination for history enthusiasts and modern explorers alike.']
]);

const DATE_AND_TIME = [
  {
    startTime: '2024-03-03T03:03',
    endTime: '2024-03-03T07:47'
  },
  {
    startTime: '2024-03-03T06:18',
    endTime: '2024-03-03T12:34'
  },
  {
    startTime: '2024-03-03T11:35',
    endTime: '2024-03-03T15:10'
  },
  {
    startTime: '2024-03-04T00:51',
    endTime: '2024-03-04T04:32'
  },
  {
    startTime: '2024-03-04T09:11',
    endTime: '2024-03-04T19:22'
  },
  {
    startTime: '2024-03-04T17:15',
    endTime: '2024-03-04T23:32'
  }
];

const OFFER = [
  ['Order Uber', 10],
  ['Add luggage', 20],
  ['Switch to comfort', 30],
  ['Rent a car', 40],
  ['Add breakfast', 50],
  ['Book tickets', 60],
  ['Lunch in city', 70]
];

export {TYPE_POINT, PRICE, CITY, DESCRIPTION, DATE_AND_TIME, OFFER};
