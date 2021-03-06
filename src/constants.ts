export default {
  avatarImages: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7Brep2m5PWamOxy4ODws19J4scC8Rumf4g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfWZxHUVah8aN-5DKCNcq5kuc4NKEy2ZvUaw&usqp=CAU",
    "https://cdn.shopify.com/s/files/1/0101/8386/8497/files/2fSmRsgQ.jpg?v=1624904883",
  ],
  latlonToMetersConversion: 111139,
  distanceLimitToFindEventsInMeters: 20000,
  tips: [
    {
      title: "Make sure your location is turned on",
      description:
        "Location needs to be turned on for the app to give accurate results",
    },
    {
      title: "Use AR to pay!",
      description:
        "AR payment lets you pay anyone with just one tap, no IDs required",
    },
    {
      title: "Do checkout your Tokens",
      description:
        "Tokens can be used to claim gifts and event passes for free :')",
    },
  ],
  momentDateFormat: "DD MMM YYYY HH:mm",
} as const;
