import axios from "axios";

export default {
  data: async () => {
    return await axios.get(
      "https://s3.amazonaws.com/orama-media/json/fund_detail_full.json?limit=1000&offset=0&serializer=fund_detail_full"
    );
  },
};
