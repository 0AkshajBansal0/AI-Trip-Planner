export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two Traveles in tandem',
        icon: '👫',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family adventure time',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5'
    },
    {
        id:4,
        title: 'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'🚁',
        people:'3-8'
    }
];

export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💵'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Balanced between cost and comfort',
      icon: '💳'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Experience the finest offerings',
      icon: '💰'
    }
  ];

  export const AI_PROMPT = `
  Generate a travel plan for the destination: {location} for {totalDays} days. 
  Traveler type: {traveler}, with a {budget} budget. 
  Provide a list of hotel options including the name, address, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions. 
  Suggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {totalDays} days, including the best time to visit. 
  Output in JSON format.
`;