import dbModels from "../../models";

class RatingsDAL {
  static ratingsModel = dbModels.ratings;

  static async _createRatings(payload) {
    return await this.ratingsModel.create(payload);
  }

  static async _getRatings() {
    return await this.ratingsModel.findAll();
  }
}

export default RatingsDAL;
