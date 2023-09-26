const RestaurantModel = (seqelize, Seqelize) => {
  const Restaurant = seqelize.define(
    "restaurant",
    {
      restaurant_id: {
        type: Seqelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Seqelize.STRING,
      },
      cuisine: {
        type: Seqelize.STRING,
      },
      location: {
        type: Seqelize.STRING,
      },
      latitude: {
        type: Seqelize.STRING,
      },
      longitude: {
        type: Seqelize.STRING,
      },
      city: {
        type: Seqelize.STRING,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  return Restaurant;
};

export default RestaurantModel;
